class SS::Template
  cattr_accessor :cache, instance_accessor: false do
    Hash.new
  end

  def initialize (timestamp, document)
    @timestamp = timestamp
    @document = document
  end

  attr_reader :timestamp, :document

  class << self
    private_class_method :new

    def compile(content, options)
      key = "#{content.route}:#{content.id}"
      cached_template = SS::Template.cache[key] if SS::Template.cache.key?(key)

      return cached_template unless content_have_changed?(cached_template, content)

      document = Compiler.compile(content, options)

      template = SS::Template.new(content.updated, document)
      SS::Template.cache[key] = template

      template
    end

    private

    def content_have_changed?(cached_template, content)
      return true if cached_template.blank?

      cached_template.timestamp < content.updated
    end
  end

  def renderer_for(registers, assigns)
    Renderer.new(document, registers, assigns)
  end

  module Compiler
    module_function

    def compile(content, options)
      template = create_liquid_template(content, options)
      Liquid::Template.register_tag('paginate', Paginate)
      Liquid::Template.parse(template, error_mode: :strict)
    end

    def create_liquid_template(content, options)
      template = ''

      if content.no_items_display_state == "show" || content.substitute_html.present?
        template << '{% if items.count == 0 %}'
        template << "\n"

        if content.no_items_display_state == "show"
          template << content.upper_html
          template << "\n"
        end

        if content.substitute_html.present?
          template << content.substitute_html
          template << "\n"
        end

        if content.no_items_display_state == "show"
          template << content.lower_html
          template << "\n"
        end

        template << '{% else %}'
        template << "\n"
      end

      if content.loop_html
        if options[:target] == :page
          template << '{% for page in pages %}'
          template << "\n"

          template << translate_template_variables(content.loop_html, options)
          template << "\n"

          template << '{% endfor %}'
          template << "\n"
        else
          template << '{% for node in nodes %}'
          template << "\n"

          template << translate_template_variables(content.loop_html, options)
          template << "\n"

          template << '{% endfor %}'
          template << "\n"
        end
      else
        if options[:target] == :page
          template << Cms::ListHelper::DEFAULT_PAGE_LOOP_LIQUID
        else
          template << Cms::ListHelper::DEFAULT_NODE_LOOP_LIQUID
        end
        template << "\n"
      end

      if content.no_items_display_state == "show" || content.substitute_html.present?
        template << '{% endif %}'
        template << "\n"
      end

      template << "\n"
      if options[:target] == :page
        template << '{% paginate pages %}'
      else
        template << '{% paginate nodes %}'
      end
      template << "\n"

      template
    end

    def translate_template_variables(loop_html, options)
      return if loop_html.blank?

      if options[:target] == :page
        prefix = "page"
      else
        prefix = "node"
      end

      loop_html.gsub(/\#\{(.*?)\}/) do |m|
        if m.include?(".")
          terms = m.split(".", 2)
          m = terms[0]
          filter_option = terms[1]

          "{{ #{prefix}.#{m} | ss_date: \"#{filter_option}\" }}"
        else
          "{{ #{prefix}.#{m} }}"
        end
      end
    end
  end

  class Renderer
    def initialize(liquid_template, registers, assigns)
      @liquid_template = liquid_template.dup
      @registers = registers
      @assigns = assigns
    end

    def render_in(view_context)
      # if @registers.present?
      #   @registers.each do |key, value|
      #     @liquid_template.registers[key] = value
      #   end
      # end
      #
      result = @liquid_template.render(@assigns, registers: @registers).html_safe
      if @liquid_template.errors.present?
        Rails.logger.warn(@liquid_template.errors.join("\n"))
      end

      result
    end
  end

  class Paginate < Liquid::Tag
    def initialize(tag_name, collection_name, context)
      super
      @collection_name = collection_name
    end

    def render(context)
      ""
    end
  end
end
