module Cms::IndexingBaseJob
  extend ActiveSupport::Concern

  def perform(options)
    options = options.dup

    action = options.delete(:action)
    return if action.blank?

    @es_client = self.site.elasticsearch_client
    return if @es_client.blank?

    self.send(action, options)
  end

  private

  def index(options)
    criteria = base_criteria
    @cur_item = criteria.find(options[:id]).becomes_with_route

    enum_es_docs.each do |id, doc|
      index_params = {
        index: site.elasticsearch_index_name, type: index_type, id: id, body: doc
      }
      index_params[:pipeline] = 'attachment' if id.start_with?('file-')
      with_rescue(Elasticsearch::Transport::Transport::ServerError) do
        @es_client.index(index_params)
      end
    end

    # if remove_file_ids.present?
    #   remove_file_ids.each do |id|
    #     with_rescue(Elasticsearch::Transport::Transport::ServerError) do
    #       @es_client.delete(index: site.elasticsearch_index_name, type: index_type, id: "file-#{id}")
    #     end
    #   end
    # end
  end

  def delete(options)
    @id = options[:id]

    with_rescue(Elasticsearch::Transport::Transport::ServerError) do
      @es_client.delete(index: site.elasticsearch_index_name, type: index_type, id: index_item_id(@id))
    end

    if remove_file_ids.present?
      remove_file_ids.uniq.each do |id|
        with_rescue(Elasticsearch::Transport::Transport::ServerError) do
          @es_client.delete(index: site.elasticsearch_index_name, type: index_type, id: index_file_id(id))
        end
      end
    end
  end

  def index_type
    @index_type ||= 'contents'
  end

  def index_item_id(id)
    "page-#{id}"
  end

  def index_file_id(id)
    "file-#{id}"
  end

  def enum_es_docs
    Enumerator.new do |y|
      doc = convert_item_to_es_doc
      y << doc if doc

      if @cur_item.respond_to?(:files)
        @cur_item.files.each do |file|
          doc = convert_file_to_es_doc(file)
          y << doc if doc
        end
      end
    end
  end

  def convert_item_to_es_doc
    doc = {}
    doc[:url] = @cur_item.url
    doc[:name] = @cur_item.name
    doc[:html] = item_html

    doc[:cate_categories] = @cur_item.categories.pluck(:name) if @cur_item.respond_to?(:categories)
    doc[:cate_areas] = @cur_item.areas.pluck(:name) if @cur_item.respond_to?(:areas)

    doc[:member_permissions] = item_member_permissions

    doc[:released] = @cur_item.released.try(:iso8601)
    doc[:updated] = @cur_item.updated.try(:iso8601)
    doc[:created] = @cur_item.created.try(:iso8601)

    [ index_item_id(@cur_item.id), doc ]
  end

  def convert_file_to_es_doc(file)
    doc = {}
    doc[:url] = "#{@cur_item.url}#file-#{file.id}"
    doc[:name] = file.name
    doc[:data] = Base64.strict_encode64(::File.binread(file.path))
    doc[:file] = {}
    doc[:file][:extname] = file.extname.upcase
    doc[:file][:size] = file.size

    doc[:cate_categories] = @cur_item.categories.pluck(:name).presence if @cur_item.respond_to?(:categories)
    doc[:cate_areas] = @cur_item.areas.pluck(:name).presence if @cur_item.respond_to?(:areas)
    doc[:member_permissions] = item_member_permissions.presence

    doc[:released] = @cur_item.released.try(:iso8601)
    doc[:updated] = @cur_item.updated.try(:iso8601)
    doc[:created] = @cur_item.created.try(:iso8601)

    [ index_file_id(file.id), doc ]
  end

  def item_html
    @cur_item.html
  end

  def item_member_permissions
    return if !@cur_item.respond_to?(:for_member_enabled?)
    @cur_item.for_member_enabled? ? %w(member) : nil
  end

  def with_rescue(klass)
    yield
  rescue klass => e
    Rails.logger.warn("#{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")}")
    puts_history(:warn, "#{e.class} (#{e.message})")
  end
end
