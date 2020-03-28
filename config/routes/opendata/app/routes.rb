Rails.application.routes.draw do

  Opendata::Initializer

  concern :deletion do
    get :delete, on: :member
    delete :destroy_all, on: :collection, path: ''
  end

  concern :command do
    get :command, on: :member
    post :command, on: :member
  end

  content "opendata" do
    resources :app_categories, concerns: :deletion, module: :app
    resources :search_apps, concerns: :deletion, module: :app
    resources :apps, concerns: [:deletion, :command], module: :app do
      resources :appfiles, concerns: :deletion do
        get "file" => "appfiles#download"
      end
    end
  end
end

Cms.application.routes.tap do |routes|
  routes.node "opendata/app_category" do
    get "/" => "opendata/agents/nodes/app/app_category#index"
    get "/rss.xml" => "opendata/agents/nodes/app/app_category#index"
    get "/:name/" => "opendata/agents/nodes/app/app_category#index"
    get "/:name/rss.xml" => "opendata/agents/nodes/app/app_category#rss"
    # get "/:name/areas" => "opendata/agents/nodes/app/app_category#index_areas"
    # get "/:name/tags" => "opendata/agents/nodes/app/app_category#index_tags"
    # get "/:name/licenses" => "opendata/agents/nodes/app/app_category#index_licenses"
  end

  routes.node "opendata/app" do
    get "/(index.:format)" => "opendata/agents/nodes/app/app#index"
    get "/rss.xml" => "opendata/agents/nodes/app/app#rss"
    get "/areas" => "opendata/agents/nodes/app/app#index_areas"
    get "/tags" => "opendata/agents/nodes/app/app#index_tags"
    get "/licenses" => "opendata/agents/nodes/app/app#index_licenses"
    get "/:app/point.:format" => "opendata/agents/nodes/app/app#show_point", format: false
    post "/:app/point.:format" => "opendata/agents/nodes/app/app#add_point", format: false
    get "/:app/point/members.html" => "opendata/agents/nodes/app/app#point_members", format: false
    get "/:app/ideas/show.:format" => "opendata/agents/nodes/app/app#show_ideas", format: false
    get "/:app/executed/show.:format" => "opendata/agents/nodes/app/app#show_executed", format: false
    post "/:app/executed/add.:format" => "opendata/agents/nodes/app/app#add_executed", format: false

    get "/:app/zip" => "opendata/agents/nodes/app/app#download", format: false
    get "/:app/full" => "opendata/agents/nodes/app/app#full", format: false
    get "/:app/file_index/(*filename)" => "opendata/agents/nodes/app/app#app_index", filename: /.*/, format: false
    get "/:app/file_text/(*filename)" => "opendata/agents/nodes/app/app#text", filename: /.*/, format: false

    get "/:app/appfile/:id/" => "opendata/agents/nodes/app/appfile#index"
    get "/:app/appfile/:id/content.html" => "opendata/agents/nodes/app/appfile#content", format: false
    get "/:app/appfile/:id/json.html" => "opendata/agents/nodes/app/appfile#json", format: false
    get "/:app/appfile/:id/*filename" => "opendata/agents/nodes/app/appfile#download", filename: /.*/, format: false
  end

  routes.node "opendata/search_app" do
    match "/(index.:format)" => "opendata/agents/nodes/app/search_app#index", via: [:get, :post]
    get "/tags" => "opendata/agents/nodes/app/search_app#index_tags"
    get "/search" => "opendata/agents/nodes/app/search_app#search"
    get "/rss.xml" => "opendata/agents/nodes/app/search_app#rss"
  end

  routes.page "opendata/app" do
    get "/" => "opendata/agents/pages/app/app#index"
  end

  routes.part "opendata/app" do
    get "/" => "opendata/agents/parts/app/app#index"
  end
end
