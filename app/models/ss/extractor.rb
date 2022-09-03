class SS::Extractor
  include ActiveModel::Model

  attr_accessor :site, :user, :mode, :archive

  def extract(model, object_key)
    @reducing = Set.new
    @reduced = Hash.new
    @queue ||= []

    raw_json = archive["collections/#{model.collection_name}/#{object_key.join(":")}.json"]
    return if raw_json.blank?

    attributes = JSON.parse(raw_json)
    item = reduce(model, nil, attributes)
    # @reduced["#{model.collection_name}:#{object_key.join(":")}"] = item

    item.save(validate: false) if item._id.blank?

    if dereference_all
      item.save(validate: false)
    end

    item
  end

  private

  def reduce(model, item, attributes)
    item ||= Mongoid::Factory.build(model, attributes)
    item_key = item.to_key || [ item._id ]
    if item_key && @reduced["#{item.collection_name}:#{item_key.join(":")}"]
      return @reduced["#{item.collection_name}:#{item_key.join(":")}"]
    end
    @reducing << "#{item.collection_name}:#{item_key.join(":")}"

    item.cur_site = site if item.respond_to?(:cur_site=)
    item.cur_user = user if item.respond_to?(:cur_user=)
    item.record_timestamps = false if item.respond_to?("record_timestamps=")
    attributes.each do |key, value|
      setter = "#{key}="
      if key == Mongoid::Association::Relatable::PRIMARY_KEY_DEFAULT
        item.send(setter, nil)
      end

      field = item.fields[key]
      case field
      when Mongoid::Fields::ForeignKey
        association = field.association
        case association
        when Mongoid::Association::Referenced::BelongsTo
          model = association.polymorphic? ? attributes["#{field.association.name}_type"] : association.klass.name
          reference = resolve_reference(type: :belongs_to, model: model, item: item, key: association.name.to_s, id: value)
          item.send("#{association.name}=", reference)
        else
          puts field.class.name
        end
      when Mongoid::Fields::Standard
        processed = false
        field.options[:metadata].try do |metadata|
          on_copy_method = metadata[:on_copy]
          if on_copy_method == :clear
            item.send(setter, nil)
            processed = true
            next
          elsif on_copy_method == :cms_content_filename
            item.send(setter, nil)

            node_filename = ::File.dirname(value)
            node = Cms::Node.site(site).where(filename: node_filename).first if node_filename && node_filename != "."
            item.cur_node = node if node && item.respond_to?(:cur_node=)
            processed = true
            next
          elsif on_copy_method.is_a?(Hash) && on_copy_method.key?(:value)
            item.send(setter, on_copy_method[:value])
            processed = true
            next
          end

          elem_class = metadata[:elem_class]
          if elem_class.present?
            item.send(setter, nil)
            add_lazy(type: :embeds_ids, model: elem_class, item: item, key: key, id: value)
            processed = true
          end
        end
        next if processed

        if field.type == Time || field.type == Date || field.type == DateTime
          item.send(setter, value.in_time_zone)
        end
      else
        # unknown field
        if field.present?
          puts field.class.name
        end
      end

      relation = item.relations[key]
      case relation
      when Mongoid::Association::Embedded::EmbedsMany
        klass = relation.class_name.constantize
        Array(value).each do |embedded_value|
          reduce(klass, nil, embedded_value)
        end
      else
        # unknown relation
        if relation.present?
          puts relation.class.name
        end
      end
    end

    @reduced["#{model.collection_name}:#{item_key.join(":")}"] = item
    @reducing.delete("#{item.collection_name}:#{item_key.join(":")}")
    item
  end

  def add_lazy(**options)
    @queue << options
  end

  def dereference_all
    touched = false
    while (option = @queue.shift)
      next if option[:id].blank?

      resolved_references = resolve_reference(**option)

      case option[:type]
      when :belongs_id
        option[:item].send("#{option[:key]}=", resolved_references)
        touched = true
      when :embeds_ids
        option[:item].send("#{option[:key]}=", resolved_references)
        touched = true
      end
    end

    touched
  end

  def resolve_reference(type:, model:, item:, key:, id:)
    return if id.blank?

    model = model.constantize
    resolved_references = Array(id).map do |id|
      raw_json = archive["collections/#{model.collection_name}/#{id}.json"]
      if raw_json.blank?
        next model.unscoped.where("_id" => id).first
      end

      attributes = JSON.parse(raw_json)
      item = Mongoid::Factory.from_db(model, attributes)
      if (same_item_selector = item.try(:same_item_selector)).present?
        same_item = item.class.unscoped.where(same_item_selector).first
        next same_item if same_item.present?
      end

      if @reducing.include?("#{item.collection_name}:#{id}")
        # must be resolved later
        break :later
      end

      item = reduce(model, nil, attributes)
      item.save(validate: false)
      if item.is_a?(SS::Model::File)
        Fs.safe_create(item.path, binary: true) do |f|
          f.write archive["files/#{model.collection_name}/#{id}"]
        end
        item.sync_stats
      end

      item
    end
    resolved_references.compact!
    if resolved_references.include?(:later)
      add_lazy(type: type, model: model.name, item: item, key: key, id: id)
      return
    end

    case type
    when :belongs_to
      resolved_references.first
    when :embeds_ids
      resolved_references.map(&:id)
    end
  end
end
