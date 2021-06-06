module Cms::Agent
  module_function

  def clone_env(env)
    ret = {}

    env.each do |key, value|
      if key.starts_with?("rack.")
        ret[key] = value
      elsif key == "ss" || key.starts_with?("ss.")
        ret[key] = value
      elsif key.include?(".")
        next
      else
        ret[key] = value
      end
    end

    ret
  end

  def dispatch_to_node(controller, node)
    request = controller.request
    context = request.env["ss"]
    main_path = context.main_path
    rest = main_path.sub(/^\/#{::Regexp.escape(node.filename)}/, "").sub(/\/index\.html$/, "")
    path = ".agent/nodes/#{node.route}#{rest}"

    env = clone_env(request.env)
    env[Rack::PATH_INFO] = path
    env[Rack::SCRIPT_NAME] = ''

    save_domain = env["ss"].domain
    save_node = env["ss"].node
    env["ss"].domain = 'agent'
    env["ss"].node = node
    env["action_dispatch.show_exceptions"] = false

    _dispatch(controller, env)
  ensure
    env["ss"].domain = save_domain
    env["ss"].node = save_node
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
    env["action_dispatch.show_exceptions"] = false

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
    env["action_dispatch.show_exceptions"] = false

    save_domain = env["ss"].domain
    save_part = env["ss"].part
    env["ss"].domain = 'agent'
    env["ss"].part = part

    _dispatch(controller, env)
  ensure
    env["ss"].domain = save_domain
    env["ss"].part = save_part
  end

  def render_part(controller, part)
    return part.html if part.route == "cms/free"

    path = ".agent/parts/#{part.route}"

    env = clone_env(controller.request.env)
    env[Rack::PATH_INFO] = path
    env[Rack::SCRIPT_NAME] = ''
    env["action_dispatch.show_exceptions"] = false

    save_domain = env["ss"].domain
    save_part = env["ss"].part
    env["ss"].domain = 'agent'
    env["ss"].part = part

    status, headers, body = Rails.application.call(env)
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

  def _dispatch(controller, env)
    status, headers, body = Rails.application.call(env)

    return false if "pass" == headers["X-Cascade"]

    new_response = ActionDispatch::Response.create(status, headers, body)
    new_response.commit!
    controller.set_response! new_response
    true
  rescue ActionController::RoutingError => e
    false
  end
end
