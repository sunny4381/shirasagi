module Cms::PublicHelper
  def paginate(*args)
    super.gsub(/href=".*?"/) do |m|
      url  = convert_static_url m.sub(/href="(.*?)"/, '\\1')
      href = %(href="#{url}")
      m.sub(/href=".*?"/, href)
    end.html_safe
  end

  def body_id(path)
    "body-" + path.to_s.sub(/\/$/, "/index").sub(/\.html$/, "").gsub(/[^\w-]+/, "-")
  end

  def body_class(path)
    prefix = "body-"
    nodes  = path.to_s.sub(/\/[^\/]+\.html$/, "").sub(/^\//, "").split("/")
    nodes  = nodes.map { |node| prefix = "#{prefix}-" + node.gsub(/[^\w-]+/, "-") }
    nodes.join(" ")
  end

  def render_layout(layout: @cur_layout, path: @cur_main_path, item: @cur_item)
    return if layout.blank?

    body = layout.body.to_s
    body = body.sub(/<body.*?>/) do |m|
      m = m.sub(/ class="/, %( class="#{body_class(path)} )     ) if m =~ / class="/
      m = m.sub(/<body/,    %(<body class="#{body_class(path)}")) unless m =~ / class="/
      m = m.sub(/<body/,    %(<body id="#{body_id(path)}")      ) unless m =~ / id="/
      m
    end

    html = render_layout_parts(body)

    if notice
      notice_html   = %(<div id="ss-notice"><div class="wrap">#{notice}</div></div>)
      response.body = %(#{notice_html}#{response.body})
    end

    html.gsub!('#{page_name}', ERB::Util.html_escape(item.name))
    html.gsub!('#{parent_name}', ERB::Util.html_escape(item.parent ? item.parent.name : ""))
    html.sub!(/(\{\{ yield \}\}|<\/ yield \/>)/) do
      yield if block_given?
    end

    html.html_safe
  end

  private
    def convert_static_url(url)
      path, query = url.split("?")

      params = Rack::Utils.parse_nested_query(query)
      params.delete("amp")
      params.delete("public_path")
      page = params.delete("page")

      path = @cur_path

      if page
        path = path.sub(/\/$/, "/index.html").sub(".html", ".p#{page}.html")
        params[:page] = page if path !~ /\.html/
      end

      if params.present?
        path = "#{path}?" + params.to_query
      end

      path
    end
end
