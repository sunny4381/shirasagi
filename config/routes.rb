class ActionDispatch::Routing::Mapper
  def sys(ns, opts = {}, &block)
    name = opts[:name] || ns.tr("/", "_")
    mod  = opts[:module] || ns
    namespace(name, as: "#{name}_sys", path: ".sys/#{ns}", module: "#{mod}/sys") { yield }
  end

  def gws(ns, &block)
    namespace(ns, as: "gws_#{ns}", path: ".g:site/#{ns}", module: "gws/#{ns}", site: /\d+/) { yield }
  end

  def cms(ns, opts = {}, &block)
    name = opts[:name] || ns.tr("/", "_")
    mod  = opts[:module] || ns
    namespace(name, as: "#{name}_cms", path: ".s:site/#{ns}", module: "#{mod}/cms") { yield }
  end

  def sns(ns, opts = {}, &block)
    name = opts[:name] || ns.tr("/", "_")
    mod  = opts[:module] || ns
    namespace(name, as: "#{name}_sns", path: ".u/#{ns}", module: "#{mod}/sns") { yield }
  end

  def content(ns, opts = {}, &block)
    name = opts[:name] || ns.tr("/", "_")
    mod  = opts[:module] || ns
    namespace(name, path: ".s:site/#{ns}:cid", module: mod, cid: /\w+/) { yield }
  end

  def agent(content_type, route, &block)
    content_type = content_type.pluralize
    name = route.tr("/", "_")
    module_part, type_part = route.split("/", 2)

    as = "agent_#{content_type}_#{name}"
    path = ".agent/#{content_type}/#{route}"
    module_path = "#{module_part}/agents/#{content_type}/#{type_part}"
    constraints(Cms::Agent::Constraint) do
      namespace(name, as: as, path: path, module: module_path, &block)
    end
  end

  def node(route, options = nil, &block)
    if block_given?
      agent("node", route, &block)
    else
      agent("node", route) do
        get "index(.:format)", action: "index"
        if options && options[:page]
          get "index.p:page(.:format)", action: "index"
        end
        if options && options[:rss]
          get "rss.xml", action: "rss", format: "xml"
        end
      end
    end
  end

  def page(route, &block)
    if block_given?
      agent("page", route, &block)
    else
      agent("page", route) { get ":filename.:format", action: "index" }
    end
  end

  def part(route, &block)
    if block_given?
      agent("part", route, &block)
    else
      agent("part", route) { get "", action: "index" }
    end
  end
end

Rails.application.routes.draw do
  SS::Initializer

  namespace "sns", path: ".mypage" do
    get   "/"      => "mypage#index", as: :mypage
    get   "logout" => "login#logout", as: :logout
    match "login"  => "login#login", as: :login, via: [:get, :post]
    match "remote_login" => "login#remote_login", as: :remote_login, via: [:get, :post]
    get   "redirect" => "login#redirect", as: :redirect
    resources :public_notices, only: [:index, :show]
    resources :sys_notices, only: [:index, :show]
    get   "status" => "login#status", as: :login_status
    get   "auth_token" => "auth_token#index", as: :auth_token
    get   "cms" => "mypage#cms"
    get   "gws" => "mypage#gws"

    namespace "login" do
      # SAML SSO
      get  "saml/:id/init" => "saml#init", as: :saml
      post "saml/:id/consume" => "saml#consume"
      get  "saml/:id/metadata" => "saml#metadata", as: :saml_metadata

      # OpenID Connect SSO
      get  "oid/:id/init" => "open_id_connect#init", as: :open_id_connect
      match "oid/:id/callback" => "open_id_connect#callback", as: :open_id_connect_callback, via: [:get, :post]
      if Rails.env.test?
        get "oid/:id/implicit" => "open_id_connect#implicit", as: :open_id_connect_implicit
        get "oid/:id/authorization_code" => "open_id_connect#authorization_code", as: :open_id_connect_authorization_code
        post "oid/:id/authorization_token" => "open_id_connect#authorization_token", as: :open_id_connect_authorization_token
      end

      # Environment
      get "env/:id/login" => "environment#login", as: :env
    end
  end
end
