class Cms::Liquid::BaseDrop < SS::Liquid::BaseDrop
  def csrf_token?
    @csrf_token ||= (controller.instance_variable_get(:@csrf_token) != false)
  end

  def csrf_meta_tags
    view_context.csrf_meta_tags
  end

  def stylesheet_link_tags
    ret = []
    ret << view_context.stylesheet_link_tag('cms/public')
    controller.stylesheets.each do |path|
      ret << view_context.stylesheet_link_tag(path, media: :all)
    end
    ret.join("\n")
  end

  def javascript_src_tags
    ret = []
    ret << view_context.javascript_include_tag('cms/public')
    controller.javascripts.each do |path|
      ret << view_context.javascript_include_tag(path)
    end
    ret << view_context.javascript_tag do
      "SS.config = #{view_context.raw controller.javascript_configs.to_json};".html_safe
    end

    ret.join("\n")
  end

  def window_name
    @window_name ||= begin
      if cur_item.filename != "index.html"
        "#{cur_item.name} - #{cur_site.name}"
      else
        cur_site.name
      end
    end
  end

  def cur_main_path
    @cur_main_path ||= controller.instance_variable_get(:@cur_main_path)
  end

  def opengraph
    # TODO: implement
    ''
  end

  def twitter_card
    # TODO: implement
    ''
  end

  def body_id
    "body-" + cur_main_path.to_s.sub(/\/$/, "/index").sub(/\.html$/, "").gsub(/[^\w-]+/, "-")
  end

  def body_classes
    prefix = "body-"
    nodes = cur_main_path.to_s.sub(/\/[^\/]+\.html$/, "").sub(/^\//, "").split("/")
    nodes.map { |node| prefix = "#{prefix}-" + node.gsub(/[^\w-]+/, "-") }.to_a
  end

  def std_css_classes
    body_classes.join(' ')
  end

  def parts
    @parts ||= Cms::Liquid::PartsDrop.new
  end

  def cur_site
    @_cur_site ||= @context.registers['cur_site']
  end
  alias site cur_site

  def cur_node
    @_cur_node ||= @context.registers['cur_node']
  end
  alias node cur_node

  def cur_page
    @_cur_page ||= @context.registers['cur_page']
  end
  alias page cur_page

  def cur_part
    @_cur_part ||= @context.registers['cur_part']
  end
  alias part cur_part

  def cur_item
    @_cur_item ||= @context.registers['cur_item']
  end
  alias item cur_item

  private
    def normalize_path(path)
      path = path[1..-1] if path.start_with?('/')
      path
    end
end
