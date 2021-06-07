module Cms::Agent
  module_function

  IGNORE_PARAM_KEYS = %w(
    action_dispatch.request.parameters
    action_dispatch.request.path_parameters
    action_dispatch.request.query_parameters
    action_dispatch.request.request_parameters
  ).freeze

  def clone_env(env)
    ret = {}

    # rack middleware をすっ飛ばせるように action_dispatch. パラメータのほとんどを保存する。
    env.each do |key, value|
      next if key.starts_with?("action_controller.")
      next if IGNORE_PARAM_KEYS.include?(key)

      ret[key] = value
    end

    ret
  end

  def dispatch_to_node(issuer, node)
    main_path = issuer.request.env["ss"].main_path
    if main_path.start_with?("/" + node.filename)
      rest = main_path[(node.filename.length + 1)..-1]
    end
    path = ".agent/nodes/#{node.route}#{rest}"

    _dispatch_to(issuer, path, node: node)
  end

  def dispatch_to_page(issuer, page)
    path = ".agent/pages/#{page.route}/#{page.basename}"
    _dispatch_to(issuer, path, page: page)
  end

  def dispatch_to_part(issuer, part)
    if part.route == "cms/free"
      issuer.render(html: part.html, layout: false)
      return
    end

    path = ".agent/parts/#{part.route}"
    _dispatch_to(issuer, path, part: part)
  end

  def render_node(issuer, node, opts)
    context = issuer.request.env["ss"]
    page_no = opts.dig(:params, :page)
    path = opts[:url] || page_no && page_no > 1 ? "#{node.url}index.p#{page_no}.html" : "#{node.url}index.html"

    main_path = path.sub(context.site.url, "/")

    save_path = context.path
    save_main_path = context.main_path
    context.path = path
    context.main_path = main_path

    begin
      if main_path.start_with?("/" + node.filename)
        rest = main_path[(node.filename.length + 1)..-1]
      end
      _render_content(issuer, ".agent/nodes/#{node.route}#{rest}", node: node)
    ensure
      context.path = save_path
      context.main_path = save_main_path
    end
  end

  def render_part(issuer, part)
    return part.html if part.route == "cms/free"

    path = ".agent/parts/#{part.route}"
    _render_content(issuer, path, part: part)
  end

  def generate_node(source_controller, node)
    controller_class_name = node.route.sub("/", "/agents/nodes/")
    _invoke_agent_controller(source_controller, controller_class_name, :generate, node: node)
  end

  def _dispatch_to(issuer, path, node: nil, part: nil, page: nil)
    response = _call_agent(issuer, path, node: node, part: part, page: page)
    return false if response.blank?

    issuer.set_response! response
    true
  end

  def _render_content(issuer, path, node: nil, part: nil, page: nil)
    response = _call_agent(issuer, path, node: node, part: part, page: page)
    return if response.blank?
    return if response.status != 200

    response.body
  end

  def _call_agent(issuer, path, node: nil, part: nil, page: nil)
    env = clone_env(issuer.request.env)
    env[Rack::PATH_INFO] = path
    env[Rack::SCRIPT_NAME] = ''

    save_domain = env["ss"].domain
    save_node = env["ss"].node
    save_page = env["ss"].page
    save_part = env["ss"].part
    env["ss"].domain = 'agent'
    env["ss"].node = node
    env["ss"].page = page
    env["ss"].part = part

    # rack middleware をすっ飛ばしたいので Rails.application.routes.call を呼び出す
    status, headers, body = Rails.application.routes.call(env)
    return if "pass" == headers["X-Cascade"]

    response = ActionDispatch::Response.create(status, headers, body)
    response.commit!
    response
  rescue ActionController::RoutingError => e
    nil
  ensure
    if env
      env["ss"].domain = save_domain
      env["ss"].node = save_node
      env["ss"].page = save_page
      env["ss"].part = save_part
    end
  end

  def _invoke_agent_controller(issuer, controller_name, method_name, node: nil)
    controller_class_name = controller_name + "_controller"
    controller_class_name = controller_class_name.camelize
    controller_class = controller_class_name.constantize rescue nil
    return if controller_class.blank?

    controller = controller_class.new
    return unless controller.respond_to?(method_name)

    env = clone_env(issuer.request.env)
    save_domain = env["ss"].domain
    save_site = env["ss"].site
    save_node = env["ss"].node
    save_page = env["ss"].page
    save_part = env["ss"].part
    save_task = env["ss"].task
    save_path = env["ss"].path
    save_main_path = env["ss"].main_path

    env["ss"].domain = 'agent'
    env["ss"].site = issuer.instance_variable_get(:@site)
    env["ss"].node = node
    env["ss"].task = issuer.instance_variable_get(:@task)
    env["ss"].path = node.url.sub(/\/?$/, "/index.html")
    env["ss"].main_path = begin
      if env["ss"].site.subdir.present?
        env["ss"].path.sub(/^\/#{env["ss"].site.subdir}/, "")
      else
        env["ss"].path.dup
      end
    end

    request = ActionDispatch::Request.new(env)
    response = ActionDispatch::Response.new

    controller.set_request! request
    controller.set_response! response
    controller.params[:controller] = controller_name
    controller.params[:action] = method_name.to_s
    controller.process method_name
  ensure
    if env
      env["ss"].domain = save_domain
      env["ss"].site = save_site
      env["ss"].node = save_node
      env["ss"].page = save_page
      env["ss"].part = save_part
      env["ss"].task = save_task
      env["ss"].path = save_path
      env["ss"].main_path = save_main_path
    end
  end
end
