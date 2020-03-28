module Cms::PublicFilter::Page
  extend ActiveSupport::Concern
  include Cms::PublicFilter::Layout

  private

  def find_page(path)
    page = Cms::Page.site(@cur_site).in_path(path).order_by(depth: -1).first
    return unless page
    @preview || (page.public? && page.public_node?) ? page.becomes_with_route : nil
  end

  def render_page(page, env = {})
    @cur_page = page

    resp = render_page2(page, env)
    return resp if resp

    path = "/.s#{@cur_site.id}/pages/#{page.route}/#{page.basename}"
    spec = recognize_agent path, env
    return unless spec

    controller = page.route.sub(/\/.*/, "/agents/#{spec[:cell]}")

    agent = new_agent controller
    agent.controller.params.merge! spec
    agent.render spec[:action]
  end

  def render_page2(page, default_env = {})
    route = Cms.application.find_page_route(page)
    return unless route

    env = request.env.dup

    path = @cur_main_path
    path = path.sub(/^\/#{::Regexp.escape(::File.dirname(page.filename))}/, "")
    path = path.sub(/^\/#{::Regexp.escape(::File.basename(page.filename, ".*"))}/, "")
    path = path.sub(/^#{::Regexp.escape(::File.extname(page.filename))}/, "")

    env[::Rack::PATH_INFO] = path
    env["ss.controller"] ||= self
    env["ss.site"] ||= @cur_site
    env["ss.page"] ||= page
    env.merge(default_env)

    status, headers, body = route.call(env)
    return if headers["X-Cascade"] == "pass"

    ::ActionDispatch::Response.new(status, headers, body)
  end

  public

  def generate_page(page)
    @cur_site      = page.site
    @cur_path      = page.url
    @cur_main_path = @cur_path.sub(@cur_site.url, "/")
    @csrf_token    = false

    # self.params   = ActionController::Parameters.new format: "html"
    # self.request  = ActionDispatch::Request.new method: "GET"
    # self.response = ActionDispatch::Response.new

    agent = SS::Agent.new self.class
    self.params   = agent.controller.params
    self.request  = agent.controller.request
    self.response = agent.controller.response

    begin
      response.body = render_page page
      response.content_type ||= "text/html"
    rescue StandardError => e
      return if e.to_s == "404"
      return if e.is_a? Mongoid::Errors::DocumentNotFound
      raise e
    end

    if response.content_type == "text/html" && page.layout
      html = render_to_string html: render_layout(page.layout).html_safe, layout: "cms/page"
    else
      html = response.body
    end

    write_file page, html
  end
end
