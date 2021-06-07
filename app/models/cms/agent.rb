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

  def dispatch_to_node(controller, node)
    request = controller.request
    context = request.env["ss"]
    main_path = context.main_path
    if main_path.start_with?("/" + node.filename)
      rest = main_path[(node.filename.length + 1)..-1]
    end
    path = ".agent/nodes/#{node.route}#{rest}"

    env = clone_env(request.env)
    env[Rack::PATH_INFO] = path
    env[Rack::SCRIPT_NAME] = ''

    save_domain = env["ss"].domain
    save_node = env["ss"].node
    env["ss"].domain = 'agent'
    env["ss"].node = node

    _dispatch(controller, env)
  ensure
    if env
      env["ss"].domain = save_domain
      env["ss"].node = save_node
    end
  end

  def dispatch_to_page(controller, page)
    path = ".agent/pages/#{page.route}/#{page.basename}"

    env = clone_env(controller.request.env)
    env[Rack::PATH_INFO] = path
    env[Rack::SCRIPT_NAME] = ''

    save_domain = env["ss"].domain
    save_page = env["ss"].page
    env["ss"].domain = 'agent'
    env["ss"].page = page

    _dispatch(controller, env)
  ensure
    env["ss"].domain = save_domain
    env["ss"].page = save_page
  end

  def dispatch_to_part(controller, part)
    if part.route == "cms/free"
      controller.render(html: part.html, layout: false)
      return
    end

    path = ".agent/parts/#{part.route}"

    env = clone_env(controller.request.env)
    env[Rack::PATH_INFO] = path
    env[Rack::SCRIPT_NAME] = ''

    save_domain = env["ss"].domain
    save_part = env["ss"].part
    env["ss"].domain = 'agent'
    env["ss"].part = part

    _dispatch(controller, env)
  ensure
    env["ss"].domain = save_domain
    env["ss"].part = save_part
  end

  def render_node(controller, node, opts)
    site = controller.instance_variable_get(:@cur_site) || controller.instance_variable_get(:@site) || node.site
    page_no = opts.dig(:params, :page)
    path = opts[:url] || page_no && page_no > 1 ? "#{node.url}index.p#{page_no}.html" : "#{node.url}index.html"
    main_path = path.sub(site.url, "/")

    if main_path.start_with?("/" + node.filename)
      rest = main_path[(node.filename.length + 1)..-1]
    end
    path = ".agent/nodes/#{node.route}#{rest}"

    env = clone_env(controller.request.env)
    env[Rack::PATH_INFO] = path
    env[Rack::SCRIPT_NAME] = ''

    save_domain = env["ss"].domain
    save_node = env["ss"].node
    env["ss"].domain = 'agent'
    env["ss"].site = site
    env["ss"].node = node
    env["ss"].path = path
    env["ss"].main_path = main_path

    # rack middleware をすっ飛ばしたいので Rails.application.routes.call を呼び出す
    status, headers, body = Rails.application.routes.call(env)
    return if "pass" == headers["X-Cascade"]
    return if status != 200

    new_response = ActionDispatch::Response.create(status, headers, body)
    new_response.commit!
    new_response.body
  rescue ActionController::RoutingError => e
    nil
  ensure
    if env
      env["ss"].domain = save_domain
      env["ss"].node = save_node
    end
  end

  def render_part(controller, part)
    return part.html if part.route == "cms/free"

    path = ".agent/parts/#{part.route}"

    env = clone_env(controller.request.env)
    env[Rack::PATH_INFO] = path
    env[Rack::SCRIPT_NAME] = ''

    save_domain = env["ss"].domain
    save_part = env["ss"].part
    env["ss"].domain = 'agent'
    env["ss"].part = part

    # rack middleware をすっ飛ばしたいので Rails.application.routes.call を呼び出す
    status, headers, body = Rails.application.routes.call(env)
    return if "pass" == headers["X-Cascade"]
    return if status != 200

    new_response = ActionDispatch::Response.create(status, headers, body)
    new_response.commit!
    new_response.body
  rescue ActionController::RoutingError => e
    nil
  ensure
    env["ss"].domain = save_domain
    env["ss"].part = save_part
  end

  def generate_node(source_controller, node)
    controller_class_name = node.route.sub("/", "/agents/nodes/") + "_controller"
    controller_class_name = controller_class_name.camelize
    controller_class = controller_class_name.constantize rescue nil
    return if controller_class.blank?

    controller = controller_class.new
    return unless controller.respond_to?(:generate)

    env = clone_env(source_controller.request.env)
    save_domain = env["ss"].domain
    save_node = env["ss"].node
    env["ss"] = Cms::Agent::Context.new
    env["ss"].domain = 'agent'
    env["ss"].site = source_controller.instance_variable_get(:@site)
    env["ss"].node = node
    env["ss"].task = source_controller.instance_variable_get(:@task)
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
    controller.params[:controller] = "article/agents/nodes/page"
    controller.params[:action] = "generate"
    controller.process :generate
  ensure
    if env
      env["ss"].domain = save_domain
      env["ss"].node = save_node
    end
  end

  def _dispatch(controller, env)
    # rack middleware をすっ飛ばしたいので Rails.application.routes.call を呼び出す
    status, headers, body = Rails.application.routes.call(env)

    return false if "pass" == headers["X-Cascade"]

    new_response = ActionDispatch::Response.create(status, headers, body)
    new_response.commit!
    controller.set_response! new_response
    true
  rescue ActionController::RoutingError => e
    false
  end
end
