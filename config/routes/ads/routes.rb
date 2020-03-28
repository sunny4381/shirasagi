Rails.application.routes.draw do

  Ads::Initializer

  concern :deletion do
    get :delete, on: :member
    delete :destroy_all, on: :collection, path: ''
  end

  concern :command do
    get :command, on: :member
    post :command, on: :member
  end

  content "ads" do
    get "/" => redirect { |p, req| "#{req.path}/banners" }, as: :main
    resources :banners, concerns: [:deletion, :command]
    get "access_logs" => "access_logs#index", as: :access_logs
    get "access_logs/download" => "access_logs#download", as: :access_logs_download
  end

end

Cms.application.routes.tap do |routes|
  routes.node "ads/banner" do
    get "/" => "ads/agents/nodes/banner#index"
  end

  routes.part "ads/banner" do
    get "/" => "ads/agents/parts/banner#index"
  end

  routes.page "ads/banner" do
    get "/" => "ads/agents/pages/banner#index"
    get "/count(.:format)" => "ads/agents/pages/banner#count"
  end
end
