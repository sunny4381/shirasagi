Rails.application.routes.draw do

  Article::Initializer

  concern :deletion do
    get :delete, on: :member
    delete :destroy_all, on: :collection, path: ''
  end

  concern :copy do
    get :copy, on: :member
    put :copy, on: :member
  end

  concern :move do
    get :move, on: :member
    put :move, on: :member
  end

  concern :lock do
    get :lock, on: :member
    delete :lock, action: :unlock, on: :member
  end

  concern :download_all do
    match :download_all, on: :collection, via: %i[get post]
  end

  concern :import do
    match :import, on: :collection, via: %i[get post]
  end

  concern :command do
    get :command, on: :member
    post :command, on: :member
  end

  concern :opendata_ref do
    post :update_opendata_resources, on: :member
  end

  concern :contains_urls do
    get :contains_urls, on: :member
  end

  concern :tag do
    post :tag, action: :set_tag_all, on: :collection
    delete :tag, action: :reset_tag_all, on: :collection
  end

  concern :michecker do
    get :michecker, on: :member
    post :michecker_start, on: :member
    get :michecker_result, on: :member
  end

  content "article" do
    get "/" => redirect { |p, req| "#{req.path}/pages" }, as: :main
    get "generate" => "generate#index"
    post "generate" => "generate#run"
    resources :pages, concerns: [
      :deletion, :copy, :move, :lock, :download_all, :import, :command, :opendata_ref, :contains_urls, :tag, :michecker
    ]
  end

  content "article" do
    get "index_approve" => "pages#index_approve"
    get "index_request" => "pages#index_request"
    get "index_ready" => "pages#index_ready"
    get "index_closed" => "pages#index_closed"
    get 'index_wait_close' => 'pages#index_wait_close'
    delete "index_:state" => "pages#destroy_all", state: /approve|request|ready|closed|wait_close/
  end

end

Cms::Agent.routes.draw do
  constraints(Cms::AgentConstraint.new) do
    scope "nodes/article", module: "article/agents/nodes" do
      get "page/(index.:format)" => "page#index"
      get "page/rss.xml" => "page#rss", format: "xml"
    end

    scope "pages/article", module: "article/agents/pages" do
      get "page/:filename.:format" => "page#index"
    end

    scope "parts/article", module: "article/agents/parts" do
      get "page" => "page#index"
      get "page_navi" => "page_navi#index"
    end
  end
end
