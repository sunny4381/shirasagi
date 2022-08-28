class SS::Archiver
  class << self
    private_class_method :new

    def create(path:, recursive: nil)
      instance = new(path: path, recursive: recursive)
      begin
        yield instance
      ensure
        instance.close
      end
    end
  end

  def initialize(path:, recursive:)
    @path = path
    @recursive = recursive
    @zip = ::Zip::File.open(@path, Zip::File::CREATE)
    @added = Set.new
  end

  def add(object)
    return unless object.is_a?(SS::Document)

    object_key = object.to_key
    return if object_key.blank?

    return if @added.include?("#{object.collection_name}:#{object_key.join(":")}")
    @added << "#{object.collection_name}:#{object_key.join(":")}"

    attributes = Hash[object.attributes]
    annotation = annotate(object, attributes)

    @zip.get_output_stream("collections/#{object.collection_name}/#{object_key.join(":")}.json") do |f|
      f.write attributes.to_json
    end
    @zip.get_output_stream("collections/#{object.collection_name}/#{object_key.join(":")}.meta.json") do |f|
      f.write annotation.to_json
    end
    if object.is_a?(SS::Model::File)
      @zip.get_output_stream("files/#{object.collection_name}/#{object_key.join(":")}") do |f|
        IO.copy_stream(object.path, f)
      end
    end

    resolve_reference(object, attributes)
  end

  def close
    process_queue

    if @zip
      @zip.close rescue nil
    end
  end

  private

  def annotate(object, attributes)
    {}
  end

  def resolve_reference(object, attributes)
    attributes.each do |key, value|
      field = object.fields[key]
      case field
      when Mongoid::Fields::ForeignKey
        association = field.association
        case association
        when Mongoid::Association::Referenced::BelongsTo
          if association.polymorphic?
            add_lazy(model: attributes["#{field.association.name}_type"], id: value)
          else
            if !association.embedded?
              add_lazy(model: association.klass.name, id: value)
            end
          end
        else
          puts field.class.name
        end
      when Mongoid::Fields::Standard
        field.options[:metadata].try do |metadata|
          elem_class = metadata[:elem_class]
          if elem_class.present?
            add_lazy(model: elem_class, id: value)
          end
        end
      else
        # unknown field
        if field.present?
          puts field.class.name
        end
      end

      relation = object.relations[key]
      case relation
      when Mongoid::Association::Embedded::EmbedsMany
        embedded_values = object.send(key)
        if embedded_values.present?
          embedded_values.each do |embedded_value|
            resolve_reference(embedded_value, Hash[embedded_value.attributes])
          end
        end
      else
        # unknown relation
        if relation.present?
          puts relation.class.name
        end
      end
    end
  end

  def queue
    @queue ||= []
  end

  def add_lazy(model:, id:)
    return if model.blank? || id.blank?

    id = Array(id).flatten.uniq.compact
    return if id.blank?

    queue << [ model, id ]
  end

  def process_queue
    return if @queue.blank?

    while ((model, ids) = @queue.shift)
      model = model.constantize
      next unless model.ancestors.include?(SS::Document)
      next unless recursive?(model)

      model.all.unscoped.in(id: ids).to_a.each do |item|
        add(item)
      end
    end
  end

  def recursive?(model)
    return true if @recursive.blank?

    if @recursive.key?(:only)
      return false unless @recursive[:only].include?(model.collection_name)
    end

    if @recursive.key?(:exclude)
      return false if @recursive[:exclude].include?(model.collection_name)
    end

    true
  end
end
