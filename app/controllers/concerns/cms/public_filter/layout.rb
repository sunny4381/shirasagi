module Cms::PublicFilter::Layout
  extend ActiveSupport::Concern
  include Cms::PublicFilter::Agent
  include Cms::PublicHelper
  include Cms::PublicFilter::OpenGraph
  include Cms::PublicFilter::TwitterCard
  include Cms::PublicFilter::ConditionalTag
  include Cms::PublicFilter::PerfLog
  include Cms::PublicFilter::PartCache

  included do
    helper_method :render_layout_parts
    helper_method :render_template_variables
  end

  private

  def filters
    @filters ||= begin
      request.env["ss.filters"] ||= []
    end
  end

  def filter_include?(key)
    filters.any? { |f| f == key || f.is_a?(Hash) && f.key?(key) }
  end

  def filter_include_any?(*keys)
    keys.any? { |key| filter_include?(key) }
  end

  def filter_options(key)
    found = filters.find { |f| f == key || f.is_a?(Hash) && f.key?(key) }
    return if found.nil?
    return found[key] if found.is_a?(Hash)
    true
  end

  def find_part(path)
    part = Cms::Part.site(@cur_site).filename(path).first
    return unless part
    @preview || part.public? ? part : nil
  end

  def render_part(part, opts = {})
    part_perf_log(part) do
      return [ {}, part.html ] if part.route == "cms/free"

      path = "/.s#{@cur_site.id}/parts/#{part.route}"
      spec = recognize_agent path, method: "GET"
      return unless spec

      fetch_part_cache(part) do
        @cur_part = part
        controller = part.route.sub(/\/.*/, "/agents/#{spec[:cell]}")

        agent = new_agent controller
        agent.controller.params.merge! spec
        agent.controller.request = ActionDispatch::Request.new(request.env.merge("REQUEST_METHOD" => "GET"))
        resp = agent.render spec[:action]
        body = resp.body

        body.gsub!('#{part_name}', ERB::Util.html_escape(part.name))

        if /\#{part_parent[^}]*?_name}/.match?(body)
          part_parent = part.parent || part
          body.gsub!('#{part_parent_name}', ERB::Util.html_escape(part_parent.name))
          part_parent = part_parent.parent || part_parent
          body.gsub!('#{part_parent.parent_name}', ERB::Util.html_escape(part_parent.name))
        end

        if /\#{[^}]*?parent_name}/.match?(body)
          parent = Cms::Node.site(@cur_site).filename(@cur_main_path.to_s.sub(/^\//, "").sub(/\/[\w\-.]*?$/, "")).first
          if parent
            body.gsub!('#{parent_name}', ERB::Util.html_escape(parent.name))
            body.gsub!('#{parent.parent_name}', ERB::Util.html_escape(parent.parent ? parent.parent.name : parent.name))
          end
        end

        @cur_part = nil
        [ resp.headers, body ]
      end
    end
  end

  def render_layout(layout, content: nil)
    content ||= response.body

    layout_perf_log(layout) do
      init_render_layout_context(layout)

      html = @cur_layout.body.to_s
      html = render_body_class(html)
      html = render_conditional_tag(html)
      html = render_layout_parts(html)
      html = render_kana_tool(html)
      html = render_theme_tool(html)
      html = render_template_variables(html)
      html = render_yield(html, content)

      html = html.sub(/<title>(.*?)<\/title>(\r|\n)*/) do
        @window_name = ::Regexp.last_match(1)
        ''
      end

      html = html.sub(/<meta[^>]*charset=[^>]*>/) { '' }

      previewable = @preview && @cur_layout.allowed?(:read, @cur_user, site: @cur_site)
      if previewable
        layout_info = {
          id: @cur_layout.id, name: @cur_layout.name, filename: @cur_layout.filename,
          path: @cur_layout.private_show_path
        }
        data_attrs = layout_info.map { |k, v| "data-layout-#{k}=\"#{CGI.escapeHTML(v.to_s)}\"" }
        html = html.sub(/<body/, %(<body #{data_attrs.join(" ")}))
      end

      html
    end
  end

  def init_render_layout_context(layout)
    @cur_layout = layout
    @cur_item   = @cur_page || @cur_node
    @cur_item.window_name ||= @cur_item.name

    @count_pages = params[:page] if params[:page].numeric?
    @current_page = "#{@count_pages}#{t("cms.count_pages")} - " if @count_pages

    @window_name = @cur_site.name
    @window_name = "#{@cur_item.window_name} - #{@current_page} #{@cur_site.name}" if @cur_item.filename != 'index.html'

    @cur_layout.keywords    = @cur_item.keywords if @cur_item.respond_to?(:keywords)
    @cur_layout.description = @cur_item.description if @cur_item.respond_to?(:description)

    @parts = {}
  end

  def render_body_class(html)
    body_cls = body_class(@cur_main_path)
    body_id = body_id(@cur_main_path)

    html.sub(/<body.*?>/) do |m|
      if m.include?(' class="')
        m = m.sub(' class="', %( class="#{body_cls} ))
      else
        m = m.sub('<body', %(<body class="#{body_cls}"))
      end
      m = m.sub('<body', %(<body id="#{body_id}")) unless m.include?(' id="')
      m
    end
  end

  def render_template_variables(html)
    return html if html.blank?
    html.gsub!('#{page_name}') do
      ERB::Util.html_escape(@cur_item.name)
    end

    html.gsub!('#{parent_name}') do
      ERB::Util.html_escape(@cur_item.parent ? @cur_item.parent.name : "")
    end

    html.gsub!('#{description}') do
      if @cur_item.respond_to?(:template_variable_handler_description)
        @cur_item.template_variable_handler_description("description", self)
      else
        @cur_item.description if @cur_item.respond_to?(:description)
      end
    end

    template = %w(
      #\{
      (?<time>|time\.)
      page_
      (?<item>released|updated)
      (?<format>|\.default|\.iso|\.long|\.short)
      (?<datetime>|_datetime)
      \}
    ).join
    html.gsub!(::Regexp.compile(template)) do
      matchdata = ::Regexp.last_match
      if matchdata[:item] == 'released'
        released ||= ERB::Util.html_escape(@cur_item.date)
        date = released
      else
        updated ||= ERB::Util.html_escape(@cur_item.updated)
        date = updated
      end
      datetime = matchdata[:datetime]
      convert_date = date_convert(date, matchdata[:format].to_sym, datetime)
      if matchdata[:time].present?
        next "<time datetime=\"#{date_convert(date, :iso, datetime)}\">#{convert_date}</time>"
      end
      convert_date
    end

    html.gsub!('#{page_thumb.src}') do
      thumb_src = ERB::Util.html_escape(Cms::Addon::Body::DEFAULT_IMG_SRC)
      thumb_src = @cur_item.thumb.url if @cur_item.is_a?(Cms::Addon::Thumb) && @cur_item.thumb
      thumb_src
    end

    render_conditional_tag(html)
  end

  def render_layout_parts(html, opts = {})
    return html if html.blank?

    # TODO: deprecated </ />
    html = html.gsub(/(<\/|\{\{) part "(.*?)" (\/>|\}\})/) do
      path = "#{$2}.part.html"
      path = path[0] == "/" ? path.sub(/^\//, "") : @cur_layout.dirname(path)
      @parts[path] = nil
      "{{ part \"#{path}\" }}"
    end

    criteria = Cms::Part.site(@cur_site).and_public.any_in(filename: @parts.keys)
    criteria = criteria.where(mobile_view: "show") if filters.include?(:mobile)
    criteria.each { |part| @parts[part.filename] = part }

    html.gsub(/\{\{ part "(.*?)" \}\}/) do
      path = $1
      part = @parts[path]
      part ? render_layout_part(part, opts) : ''
    end
  end

  def render_layout_part(part, opts = {})
    if opts[:previewable].nil?
      previewable = @preview && part.allowed?(:read, @cur_user, site: @cur_site, node: @cur_node)
    else
      previewable = opts[:previewable] && part.allowed?(:read, @cur_user, site: @cur_site, node: @cur_node)
    end
    html = []
    if previewable
      if part.parent
        part_path = node_part_path(site: @cur_site, cid: part.parent.id, id: part.id)
      else
        part_path = cms_part_path(site: @cur_site, id: part.id)
      end

      part_info = {
        id: part.id, name: part.name, filename: part.filename,
        path: part_path
      }
      data_attrs = part_info.map { |k, v| "data-part-#{k}=\"#{CGI.escapeHTML(v.to_s)}\"" }
      html << "<div class=\"ss-preview-part\" #{data_attrs.join(" ")}>"
    end
    if part.ajax_view == "enabled" && !filters.include?(:mobile) && !@preview
      html << part.ajax_html
    else
      _header, body = render_part(part)
      html << body
    end
    if previewable
      html << "</div>"
    end
    html.join
  end

  def render_yield(html, content)
    html.sub!(/(\{\{ yield \}\}|<\/ yield \/>)/) do
      body = []
      if @preview && !html.include?("ss-preview-content-begin")
        body << "<div id=\"ss-preview-content-begin\" class=\"ss-preview-hide\"></div>"
      end

      body << "<!-- layout_yield -->"
      if notice
        body << %(<div id="ss-notice"><div class="wrap">#{notice}</div></div>)
      end
      body << content
      body << "<!-- /layout_yield -->"

      if @preview && !html.include?("ss-preview-content-begin")
        body << "<div id=\"ss-preview-content-end\" class=\"ss-preview-hide\"></div>"
      end

      body.join
    end

    html
  end

  def render_kana_tool(html)
    replaced = html.gsub(/<div[^>]*data-tool="ss-kana"[^>]*data-tool-type="button"[^>]*>.*?<\/div>/m) do |match|
      match
    end
    label = try(:kana_path?) ? I18n.t("cms.links.ruby_off") : I18n.t("cms.links.ruby_on")
    replaced = replaced.gsub(/(<div[^>]+id="ss-kana"(?![^>]*data-tool-type="button")[^>]*>)(.*?)(<\/div>)/m) do
      "#{$1}#{label}#{$3}"
    end
    replaced.gsub(/(<div[^>]+data-tool="ss-kana"(?![^>]*data-tool-type="button")[^>]*>)(.*?)(<\/div>)/m) do
      "#{$1}#{label}#{$3}"
    end
  end

  def render_theme_tool(html)
    template = Cms::ThemeTemplate.template(@cur_site)
    html = html.gsub(/(<.+? id="ss-theme".*?>)(.*?)(<\/.+?>)/) do
      "#{$1}#{template}#{$3}"
    end
    html.gsub(/(<.+? data-tool="ss-theme".*?>)(.*?)(<\/.+?>)/) do
      "#{$1}#{template}#{$3}"
    end
  end

  def date_convert(date, format = nil, datetime = nil)
    return "" unless date

    if format.present?
      if datetime.present?
        I18n.l date.to_datetime, format: format.to_sym
      else
        I18n.l date.to_date, format: format.to_sym
      end
    elsif datetime.present?
      I18n.l date.to_datetime
    else
      I18n.l date.to_date
    end
  rescue
    ""
  end

  public

  def mobile_path?
    filter_include?(:mobile)
  end

  def preview_path?
    filter_include?(:preview)
  end

  def stylesheets
    @stylesheets || []
  end

  def stylesheet(path, **options)
    @stylesheets ||= []
    return if @stylesheets.any? { |maybe_array| maybe_array.is_a?(Array) ? maybe_array[0] == path : maybe_array == path }

    if options.blank?
      @stylesheets << path
    else
      @stylesheets << [ path, options ]
    end
  end

  def javascripts
    @javascripts || []
  end

  def javascript(path, **options)
    @javascripts ||= []
    return if @javascripts.any? { |maybe_array| maybe_array.is_a?(Array) ? maybe_array[0] == path : maybe_array == path }

    if options.blank?
      @javascripts << path
    else
      @javascripts << [ path, options ]
    end
  end

  def javascript_configs
    if @javascript_config.nil?
      @javascript_config = {}

      @javascript_config["site_url"] = @cur_site.url
      @javascript_config["kana_url"] = @cur_site.kana_url
      @javascript_config["translate_url"] = @cur_site.translate_url

      conf = Cms::ThemeTemplate.to_config(site: @cur_site, preview_path: preview_path?)
      @javascript_config.merge!(conf)

      conf = Recommend::History::Log.to_config(
        site: @cur_site, item: (@cur_page || @cur_node || @cur_part), path: @cur_path,
        preview_path: preview_path?
      )
      @javascript_config.merge!(conf)
    end
    @javascript_config
  end

  def javascript_config(conf)
    javascript_configs
    @javascript_config.merge!(conf)
  end
end
