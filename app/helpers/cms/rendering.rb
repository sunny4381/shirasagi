module Cms::Rendering
  extend ActiveSupport::Concern

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

  def render_layout_part(part, opts = {})
    if part.ajax_view == "enabled" && !controller.filters.include?(:mobile) && !@preview
      part.ajax_html
    else
      render_part(part.becomes_with_route, opts)
    end
  end

  def render_part(part, opts = {})
    return part.html if part.route == "cms/free"

    path = "/.s#{@cur_site.id}/parts/#{part.route}"
    spec = recognize_agent path, method: "GET"
    return unless spec

    controller.instance_variable_set(:@cur_part, part)
    begin
      controller_name = part.route.sub(/\/.*/, "/agents/#{spec[:cell]}")

      agent = controller.new_agent controller_name
      agent.controller.params.merge! spec
      agent.controller.request = ActionDispatch::Request.new(request.env.merge("REQUEST_METHOD" => "GET"))
      resp = agent.render spec[:action]
      body = resp.body

      if body =~ /\#\{.*?parent_name\}/
        parent = Cms::Node.site(@cur_site).filename(@cur_main_path.to_s.sub(/^\//, "").sub(/\/[\w\-\.]*?$/, "")).first
        if parent
          body.gsub!('#{parent_name}', ERB::Util.html_escape(parent.name))
          body.gsub!('#{parent.parent_name}', ERB::Util.html_escape(parent.parent ? parent.parent.name : parent.name))
        end
      end

      body
    ensure
      controller.remove_instance_variable(:@cur_part)
    end
  end

  private
    def recognize_path(path, env = {})
      env[:method] ||= request.request_method rescue "GET"
      Rails.application.routes.recognize_path(path, env) rescue {}
    end

    def recognize_agent(path, env = {})
      spec = recognize_path path, env
      spec[:cell] ? spec : nil
    end

    def render_layout_parts(body)
      # TODO: deprecated </ />
      parts = {}
      body = body.gsub(/(<\/|\{\{) part ".+?" (\/>|\}\})/) do |m|
        path = m.sub(/(?:<\/|\{\{) part "(.+)?" (?:\/>|\}\})/, '\\1') + ".part.html"
        path = path[0] == "/" ? path.sub(/^\//, "") : @cur_layout.dirname(path)
        parts[path] = nil
        "{{ part \"#{path}\" }}"
      end

      criteria = Cms::Part.site(@cur_site).and_public.any_in(filename: parts.keys)
      criteria = criteria.where(mobile_view: "show") if controller.filters.include?(:mobile)
      criteria.each { |part| parts[part.filename] = part }

      return body.gsub(/\{\{ part ".+?" \}\}/) do |m|
        path = m.sub(/(?:\{\{) part "(.+)?" (?:\}\})/, '\\1')
        part = parts[path]
        part ? render_layout_part(part) : ''
      end
    end
end
