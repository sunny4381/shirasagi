module Cms::PublicFilter::Node
  extend ActiveSupport::Concern
  include Cms::PublicFilter::Layout

  private

  def init_context
    self.params   = ActionController::Parameters.new
    self.request  = ActionDispatch::Request.new("rack.input" => "", "REQUEST_METHOD" => "GET")
    self.response = ActionDispatch::Response.new.tap do |res|
      res.request = self.request
    end

    @site.reload if @site.changed?
    @node.reload if @node.changed?
  end

  def render_node(node)
    spec = recognize_node(node, @cur_main_path)
    return unless spec

    @cur_node = node
    controller = node.route.sub(/\/.*/, "/agents/#{spec[:cell]}")

    agent = new_agent controller
    agent.controller.request.path_parameters.merge! spec
    agent.controller.params.merge! spec
    agent.render spec[:action]
  end

  def render_layout_with_pagination_cache(layout, cache_key, content: nil)
    @layout_cache ||= {}

    # no cache
    if cache_key.nil?
      return render_to_string html: render_layout(layout, content: content).html_safe, layout: "cms/page"
    end

    # use cache
    if @layout_cache[cache_key]
      return @layout_cache[cache_key].sub(/<!-- layout_yield -->/, response.body)
    end

    # set cache
    html = render_to_string html: render_layout(layout, content: content).html_safe, layout: "cms/page"
    @layout_cache[cache_key] = html.sub(/(<!-- layout_yield -->).*?<!-- \/layout_yield -->/m, '\\1')

    html
  end

  def delete_layout_cache(cache_key)
    @layout_cache.delete(cache_key) if @layout_cache
  end

  public

  def recognize_node(node, path)
    action = path.sub(/^\/#{::Regexp.escape(node.filename)}/, "")

    rest = action.delete_suffix("index.html")
    rest = action if ::File.extname(rest).present?

    path = "/.s#{@cur_site.id}/nodes/#{node.route}#{rest}"
    recognize_agent path
  end

  def find_node(path)
    node = Cms::Node.site(@cur_site).in_path(path).order_by(depth: -1).to_a.first
    return unless node
    @preview || node.public? ? node : nil
  end

  def generate_node(node, opts = {})
    path = opts[:url] || "#{node.filename}/index.html"
    return if Cms::Page.site(node.site).and_public.filename(path).first
    return unless node.serve_static_file?

    @cur_site      = node.site
    @cur_path      = opts[:url] || node.url
    @cur_main_path = @cur_path.sub(@cur_site.url, "/")
    @csrf_token    = false

    params.merge! opts[:params] if opts[:params]

    begin
      @exists = true
      response.body = render_node node
      response.content_type ||= "text/html"
    rescue StandardError => e
      @exists = false
      return if SS.not_found_error?(e)
      raise e
    end

    if node.view_layout == "cms/redirect"
      @redirect_link = Sys::TrustedUrlValidator.url_restricted? ? trusted_url!(node.redirect_link) : node.redirect_link
      html = render_to_string html: "", layout: "cms/redirect"
    elsif response.media_type == "text/html" && node.layout
      html = render_layout_with_pagination_cache(node.layout, opts[:cache])
    else
      html = response.body
    end

    file = opts[:file] || "#{node.path}/index.html"
    Fs.write_data_if_modified file, html
  end

  def generate_node_with_pagination(node, opts = {})
    node_perf_log(node, page: 1) do
      if generate_node(node, cache: node.filename)
        @task.log "#{node.url}index.html" if @task
      end
    end

    max = opts[:max] || 1000
    num = max

    2.upto(max) do |i|
      file = "#{node.path}/index.p#{i}.html"
      node_perf_log(node, page: i) do
        if generate_node(node, file: file, params: { page: i }, cache: node.filename)
          @task.log "#{node.url}index.p#{i}.html" if @task
        end
      end

      if !@exists
        num = i
        break
      end
    end

    delete_layout_cache(node.filename)

    num.upto(max) do |i|
      file = "#{node.path}/index.p#{i}.html"
      break unless Fs.exist?(file)
      Fs.rm_rf file
    end
  end
end
