module Cms::PublicFilter
  extend ActiveSupport::Concern
  include Cms::PublicFilter::Agent
  include Cms::PublicFilter::Site

  included do
    rescue_from StandardError, with: :rescue_action
    before_action :ensure_site_presence
    before_action :set_request_path
    #before_action :redirect_slash, if: ->{ request.env["REQUEST_PATH"] =~ /\/[^\.]+[^\/]$/ }
    before_action :deny_path
    before_action :parse_path
    before_action :set_preview_params
    before_action :compile_scss
    before_action :x_sendfile, unless: ->{ filter_include?(:mobile) || filter_include?(:kana) || filter_include?(:translate) || @preview }
  end

  def index
    if @cur_context.path.match?(/\.p[1-9]\d*\.html$/)
      # page = @cur_context.path.sub(/.*\.p(\d+)\.html$/, '\\1')
      # params[:page] = page.to_i
      @cur_context.path.sub!(/\.p\d+\.html$/, ".html")
      @cur_context.main_path.sub!(/\.p\d+\.html$/, ".html")
    end

    sends = false
    enum_contents.each do |renderer|
      if instance_exec(&renderer)
        sends = true
        break
      end
    end

    page_not_found if !sends
  end

  private

  def ensure_site_presence
    return if @cur_site

    host = request_host
    path = request_path
    if path =='/' && group = SS::Group.where(domains: host).first
      return redirect_to "//#{host}" + gws_login_path(site: group)
    end

    raise "404"
  end

  def set_request_path
    @cur_context.path ||= request_path
    set_main_path
    cur_main_path = @cur_context.main_path.dup

    filter_methods = self.class.private_instance_methods.select { |m| m =~ /^set_request_path_with_/ }
    filter_methods.each do |name|
      send(name)
      break if cur_main_path != @cur_context.main_path
    end
  end

  def set_main_path
    if @cur_site.subdir.present?
      @cur_context.main_path = @cur_context.path.sub(/^\/#{@cur_site.subdir}/, "")
    else
      @cur_context.main_path = @cur_context.path.dup
    end
  end

  def redirect_slash
    return unless request.get?
    redirect_to "#{request.path}/"
  end

  def deny_path
    raise "404" if @cur_context.path.match?(/^\/sites\/.\//)
  end

  def parse_path
    @cur_context.path.sub!(/\/$/, "/index.html")
    @cur_context.main_path.sub!(/\/$/, "/index.html")
    @html = @cur_context.main_path.sub(/\.\w+$/, ".html")
    @file = File.join(@cur_site.path, @cur_context.main_path)
  end

  def set_preview_params
    options = filter_options(:preview)
    if options
      @preview = true
      @cur_user = options[:user]
      @cur_date = options[:date]
      @preview_page = options[:page]
    end
  end

  def compile_scss
    return unless @cur_context.path.match?(/\.css$/)
    return if @cur_context.path.match?(/\/_[^\/]*$/)
    return unless Fs.exists? @scss = @file.sub(/\.css$/, ".scss")

    css_mtime = Fs.exists?(@file) ? Fs.stat(@file).mtime : 0
    return if Fs.stat(@scss).mtime.to_i <= css_mtime.to_i

    data = Fs.read(@scss)
    begin
      opts = Rails.application.config.sass
      load_paths = opts.load_paths[1..-1] || []
      load_paths << "#{Rails.root}/vendor/assets/stylesheets"
      load_paths << ::Fs::GridFs::CompassImporter.new(::File.dirname(@file)) if Fs.mode == :grid_fs

      sass = Sass::Engine.new(
        data,
        cache: false,
        debug_info: false,
        filename: @scss,
        inline_source_maps: false,
        load_paths: load_paths,
        style: :compressed,
        syntax: :scss
      )
      Fs.write(@file, sass.render)
    rescue Sass::SyntaxError => e
      Rails.logger.error(e)
      Fs.write(@file, data)
    end
  end

  def x_sendfile(file = @file)
    return unless Fs.file?(file)
    response.headers["Expires"] = 1.day.from_now.httpdate if file.to_s.downcase.end_with?(*%w(.css .js .gif .jpg .jpeg .png))
    response.headers["Last-Modified"] = CGI::rfc1123_date(Fs.stat(file).mtime)

    ss_send_file(file, type: Fs.content_type(file), disposition: :inline)
  end

  def enum_contents
    Enumerator.new do |y|
      if @preview_page
        y << proc { render_and_send_page(@preview_page) }
      else
        if @html.ends_with?(".part.html") && part = find_part(@html)
          y << proc { Cms::Agent.dispatch_to_part(self, part) }
          next
        end

        if page = find_page(@cur_context.main_path)
          y << proc { Cms::Agent.dispatch_to_page(self, page) }
        end

        if !@cur_context.main_path.include?('.') && !@cur_context.main_path.end_with?('/') && page = find_page("#{@cur_context.main_path}/index.html")
          y << proc { Cms::Agent.dispatch_to_page(self, page) }
        end

        if node = find_node(@cur_context.main_path)
          y << proc { Cms::Agent.dispatch_to_node(self, node) }
        end
      end
    end
  end

  def find_node(path)
    node = Cms::Node.site(@cur_site).in_path(path).order_by(depth: -1).to_a.first
    return unless node
    @preview || node.public? ? node.becomes_with_route : nil
  end

  def find_page(path)
    page = Cms::Page.site(@cur_site).filename(path).first
    return unless page
    @preview || (page.public? && page.public_node?) ? page.becomes_with_route : nil
  end

  def find_part(path)
    part = Cms::Part.site(@cur_site).filename(path).first
    return unless part
    @preview || part.public? ? part.becomes_with_route : nil
  end

  def page_not_found
    request.env["action_dispatch.show_exceptions"] = false if @preview
    raise "404"
  end

  def rescue_action(exception = nil)
    if !@preview
      return render_error(exception, status: exception.to_s.to_i) if exception.to_s.numeric?
      return render_error(exception, status: 404) if exception.is_a? Mongoid::Errors::DocumentNotFound
      return render_error(exception, status: 404) if exception.is_a? ActionController::RoutingError
    end

    raise exception
  end

  def render_error(exception, opts = {})
    # for development
    if Rails.application.config.consider_all_requests_local
      logger.error "404 #{@cur_path}"
      raise exception
    end

    self.response = ActionDispatch::Response.new

    status = opts[:status].presence || 500
    file = error_html_file(status)
    ss_send_file(file, status: status, type: Fs.content_type(file), disposition: :inline)
  end

  def error_html_file(status)
    if @cur_site
      file = "#{@cur_site.path}/#{status}.html"
      return file if Fs.exists?(file)
    end

    file = "#{Rails.public_path}/.error_pages/#{status}.html"
    Fs.exists?(file) ? file : "#{Rails.public_path}/.error_pages/500.html"
  end
end
