module Chorg::MongoidSupport
  extend ActiveSupport::Concern
  include Chorg::Context
  include Chorg::Loggable

  def update(entity, hash)
    if entity.try(:callback_executable?, :chorg)
      Chorg.current_context.updating_attributes = hash
      begin
        entity.run_callbacks(:chorg) do
          _update(entity, Chorg.current_context.updating_attributes)
        end
      ensure
        Chorg.current_context.updating_attributes = nil
      end
    else
      _update(entity, hash)
    end
  end

  def _update(entity, hash)
    presented = hash.select { |k, v| v.present? }
    presented.each do |k, v|
      if v.respond_to?(:update_entity)
        v.update_entity(entity)
      else
        setter = "#{k}="
        entity.send(setter, v) if entity.respond_to?(setter)
      end
    end
    entity
  end

  def replace_attributes(entity, hash)
    entity.attributes = hash
    entity
  end

  def copy_attributes_deeply(entity)
    Hash.from_bson(entity.attributes.to_bson).with_indifferent_access
  end

  def with_entity_updates(models, substitutor, scope = {})
    with_entities(models, scope) do |entity|
      with_updates(entity, substitutor) do |updates|
        yield entity, updates
      end
    end
  end

  # rubocop:disable Layout::EmptyLineBetweenDefs
  def with_entities(models, scope = {})
    models.each do |model|
      task.performance.collect_model_update(model) do
        criteria = model.where(scope)
        all_ids = criteria.pluck(:id)
        all_ids.each_slice(20) do |ids|
          entities = criteria.in(id: ids).to_a
          entities.each do |entity|
            task.performance.collect_entity_update(entity) do
              entity = entity.try(:becomes_with_topic) || entity
              next unless set_site(entity)

              decorate_entity(model, entity)

              logger_tags = [ "#{entity.class}(#{entity.id})" ]
              if entity.respond_to?(:site_id)
                logger_tags << "site:#{entity.try(:site_id)}"
              end
              Rails.logger.tagged(*logger_tags) do
                entity.move_changes
                yield entity
                Rails.logger.info { "done" }
              end
            end
          end
        end
      end
    end
  end
  # rubocop:enable Layout::EmptyLineBetweenDefs

  def decorate_entity(model, entity)
    entity.try(:allow_other_user_files)

    entity_user = (entity.try(:user) || @cur_user)
    entity_user.try(:cur_site=, @cur_site)
    entity.try(:cur_user=, entity_user)

    entity.try(:skip_twitter_post=, true)
    entity.try(:skip_line_post=, true)
    def entity.post_to_line(execute: :inline); end
    def entity.post_to_twitter(execute: :inline); end

    entity.try(:skip_assoc_opendata=, true)
    def entity.invoke_opendata_job(action); end

    entity.instance_variable_set(:@base_model, model)
    def entity.base_model
      return @base_model
    end

    # 以下のコメントを解除すると、非常に細かい性能指標を取得することができるが、
    # 細かすぎて実行時間への影響が大きいので、普段は利用しないようにコメントアウトしておく
    # def entity.run_callbacks(kind, *args, **options, &block)
    #   overall_started = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    #   kind_started = kind_finished = overall_started
    #
    #   ret =
    #     super(kind, *args, **options) do
    #       kind_started = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    #       ret = block.call if block
    #       kind_finished = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    #       ret
    #     end
    #
    #   overall_finished = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    #
    #   if SS::Task::PerformanceCollector.current
    #     SS::Task::PerformanceCollector.current.collect_callback(
    #       kind, self, overall_started..overall_finished, kind_started..kind_finished
    #     )
    #   end
    #
    #   ret
    # end
  end

  def all_cms_sites
    @all_cms_sites ||= Cms::Site.all.to_a
  end

  def cms_site_id_map
    @cms_site_id_map ||= all_cms_sites.index_by(&:id)
  end

  def all_gws_sites
    @all_gws_sites ||= Gws::Group.all.to_a.select { |group| group.gws_use? }
  end

  def gws_site_id_map
    @gws_site_id_map ||= all_gws_sites.index_by(&:id)
  end

  def set_site(entity)
    if entity.is_a?(SS::Reference::Site) || entity.is_a?(Cms::Reference::Site)
      site = cms_site_id_map[entity.site_id]
      return false if site.blank?

      entity.try(:cur_site=, site)
      entity.try(:site=, site)
      return true
    end

    if entity.is_a?(Gws::Reference::Site)
      site = gws_site_id_map[entity.site_id]
      return false if site.blank?

      entity.try(:cur_site=, site)
      entity.try(:site=, site)
      return true
    end

    true
  end

  def find_or_create_group(attributes, alternative_names: nil)
    group = self.class.group_class.where(name: attributes["name"].strip).first
    if group.blank? && alternative_names.present?
      alternative_names.each do |alternative_name|
        group = self.class.group_class.where(name: alternative_name.strip).first
        break if group
      end
    end
    group ||= self.class.group_class.create
    update(group, attributes)
  end

  def group_field?(_key, val)
    type = val.options[:type]
    if self.class.group_classes.include?(type)
      return true
    end

    if val.instance_of?(Mongoid::Fields::ForeignKey)
      options = val.association ? val.association.options : {}
    else
      options = val.options[:metadata] || {}
    end
    return false if options.blank?

    classes = %i[class_name elem_class].map do |k|
      v = options[k]
      v = v.constantize if v.present?
      v
    end.compact
    classes.select { |v| self.class.group_classes.include?(v) }.present?
  end

  def build_exclude_fields(defs)
    @exclude_fields = defs.map { |e| e.start_with?("/") && e.end_with?("/") ? /#{::Regexp.escape(e[1..-2])}/ : e }.freeze
  end

  SUPPORTED_FIELD_TYPES = [ String, Array, SS::Extensions::Lines, SS::Extensions::Words ].freeze

  def updatable_field?(key, val)
    field_type = val.options[:type]
    return false if !SUPPORTED_FIELD_TYPES.include?(field_type)

    @exclude_fields.each do |filter|
      case filter
      when ::Regexp
        return false if filter.match?(key)
      when key
        return false
      end
    end
    true
  end

  def target_fields_cache
    @target_fields_cache ||= []
  end

  def target_fields(entity)
    return target_fields_cache[1] if target_fields_cache[0] == entity.class

    target_fields_cache[0] = entity.class
    target_fields_cache[1] = entity.class.fields.select { |k, v| group_field?(k, v) || updatable_field?(k, v) }.to_a
    target_fields_cache[1]
  end

  # exclude html field when cms form present
  def skip_target_field?(entity, field_name)
    return false if field_name != "html"

    form = entity.try(:form)
    form.instance_of?(Cms::Form)
  end

  def with_updates(entity, substitutor)
    updates = {}
    target_fields(entity).each do |k, _|
      next if skip_target_field?(entity, k)

      v = entity[k]
      new_value = substitutor.call(k, v, entity.try(:contact_group_id))
      updates[k] = new_value if v != new_value
    end
    updates = updates.merge(collect_embedded_array_updates(entity))

    yield updates
  end

  def collect_embedded_array_updates(entity)
    hash = {}
    @embedded_array_fields.each do |field_name|
      next if !entity.respond_to?(field_name)

      embedded_values = entity.send(field_name)
      next if embedded_values.blank?

      array =
        embedded_values.map do |embedded_entity|
          updates = {}
          target_fields(embedded_entity).each do |k, _|
            v = embedded_entity[k]
            new_value = substitutor.call(k, v, entity.try(:contact_group_id))
            updates[k] = new_value if v != new_value
          end
          updates
        end
      next if !array.select(&:present?).first

      hash[field_name] = Chorg::EmbeddedArray.new(field_name, array)
    end
    hash
  end

  def delete_groups(group_ids)
    task.performance.collect_delete_groups do
      group_ids.each do |id|
        group = self.class.group_class.where(id: id).first
        if group.present?
          if delete_entity(group)
            # put_log("deleted group: #{group.name}")
            task.log("  \"#{group.name}\"")
          else
            # put_log("failed to delete group: #{group.name}")
            task.log("  \"#{group.name}\": 削除失敗")
          end
          remove_group_from_site(group)
        end
      end
    end
  end

  def add_group_to_site(group)
    return if self.class.ss_mode != :cms
    return unless adds_group_to_site
    return if group.id == 0
    return if cur_site.group_ids.include?(group.id)

    copy = Array.new(cur_site.group_ids)
    copy << group.id
    cur_site.group_ids = copy.uniq.sort
    if save_or_collect_errors(cur_site)
      put_log("added group \"#{group.name}\" to site \"#{cur_site.host}\"")
    else
      put_log("failed to add group \"#{group.name}\" to site \"#{cur_site.host}\"")
    end
  end

  def remove_group_from_site(group)
    return if self.class.ss_mode != :cms
    return unless cur_site.group_ids.include?(group.id)

    copy = Array.new(cur_site.group_ids)
    copy.delete(group.id)
    cur_site.group_ids = copy.uniq.sort
    if save_or_collect_errors(cur_site)
      put_log("removed group \"#{group.name}\" from site \"#{cur_site.host}\"")
    else
      put_log("failed to remove group \"#{group.name}\" from site \"#{cur_site.host}\"")
    end
  end

  def convert_to_group_names(group_ids)
    group_ids.map do |group_id|
      if group_id == 0
        I18n.t("chorg.messages.test_run")
      else
        group = self.class.group_class.where(id: group_id).first
        group.present? ? group.name : nil
      end
    end.compact
  end
end
