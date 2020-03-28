Rails.application.routes.draw do

  Category::Initializer

  concern :deletion do
    get :delete, on: :member
    delete :destroy_all, on: :collection, path: ''
  end

  concern :integration do
    get :split, on: :member
    post :split, on: :member
    get :integrate, on: :member
    post :integrate, on: :member
  end

  content "category" do
    get "/" => redirect { |p, req| "#{req.path}/nodes" }, as: :main
    resources :nodes, concerns: [:deletion, :integration]
    resources :pages

    get "conf/split" => "node/confs#split"
    post "conf/split" => "node/confs#split"
    get "conf/integrate" => "node/confs#integrate"
    post "conf/integrate" => "node/confs#integrate"
  end

end

Cms.application.routes.tap do |routes|
  routes.node "category/node" do
    get "/(index.:format)" => "category/agents/nodes/node#index"
    get "/rss(.:format)" => "category/agents/nodes/node#rss", format: "xml"
  end

  routes.node "category/page" do
    get "/(index.:format)" => "category/agents/nodes/page#index"
    get "/rss(.:format)" => "category/agents/nodes/page#rss", format: "xml"
  end

  routes.part "category/node" do
    get "/" => "category/agents/parts/node#index"
  end
end
