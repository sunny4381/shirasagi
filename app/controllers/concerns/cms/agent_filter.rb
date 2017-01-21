module Cms::AgentFilter
  extend ActiveSupport::Concern
  include SS::AgentFilter

  included do
    helper Cms::PublicHelper
    helper_method :render_layout_parts
    alias_method_chain :render, :cms_layout
  end

  # override a render method to render cms layout
  def render_with_cms_layout(*args, &block)
    @cur_item = @cur_page || @cur_node

    @window_name = @cur_site.name
    @window_name = "#{@cur_item.name} - #{@cur_site.name}" if @cur_item.filename != "index.html"

    init_cur_layout

    options = args.extract_options!
    erb_layout = options.delete(:layout)
    erb_layout ||= 'cms/nil' if @cur_layout.blank?
    erb_layout ||= 'cms/nil' if request.xhr?
    erb_layout ||= 'cms/page'
    options[:layout] = erb_layout

    render_without_cms_layout(*args, options, &block)
  end

  private
    # must be overrided by subclass
    def init_cur_layout
      raise NotImplementedError
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
      criteria = criteria.where(mobile_view: "show") if filters.include?(:mobile)
      criteria.each { |part| parts[part.filename] = part }

      return body.gsub(/\{\{ part ".+?" \}\}/) do |m|
        path = m.sub(/(?:\{\{) part "(.+)?" (?:\}\})/, '\\1')
        part = parts[path]
        part ? render_layout_part(part) : ''
      end
    end

    def render_layout_part(part)
      if part.ajax_view == "enabled" && !filters.include?(:mobile) && !@preview
        part.ajax_html
      else
        render_part(part.becomes_with_route)
      end
    end

    def render_part(part, opts = {})
      return part.html if part.route == "cms/free"

      path = "/.s#{@cur_site.id}/parts/#{part.route}"
      spec = recognize_agent path, method: "GET"
      return unless spec

      @cur_part = part
      controller = part.route.sub(/\/.*/, "/agents/#{spec[:cell]}")

      agent = new_agent controller
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

      @cur_part = nil
      body
    end

    def recognize_path(path, env = {})
      env[:method] ||= request.request_method rescue "GET"
      Rails.application.routes.recognize_path(path, env) rescue {}
    end

    def recognize_agent(path, env = {})
      spec = recognize_path path, env
      spec[:cell] ? spec : nil
    end
end
