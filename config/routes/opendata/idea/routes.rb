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
    resources :ideas, concerns: [:deletion, :command], module: :idea do
      resources :comments, concerns: :deletion do
        match :soft_delete, on: :member, via: [:get, :post]
        match :undo_delete, on: :member, via: [:get, :post]
      end
    end
    resources :idea_categories, concerns: :deletion, module: :idea
    resources :search_ideas, concerns: :deletion, module: :idea
  end
end

Cms.application.routes.tap do |routes|
  routes.page "opendata/idea" do
    get "/" => "opendata/agents/pages/idea/idea#index"
  end

  routes.part "opendata/idea" do
    get "/" => "opendata/agents/parts/idea/idea#index"
  end

  routes.node "opendata/idea_category" do
    get "/" => "opendata/agents/nodes/idea/idea_category#index"
    get "/rss.xml" => "opendata/agents/nodes/idea/idea_category#rss"
    get "/:name/" => "opendata/agents/nodes/idea/idea_category#index"
    get "/:name/rss.xml" => "opendata/agents/nodes/idea/idea_category#rss"
    # get "/:name/areas" => "opendata/agents/nodes/idea/idea_category#index_areas"
    # get "/:name/tags" => "opendata/agents/nodes/idea/idea_category#index_tags"
  end

  routes.node "opendata/idea" do
    get "/(index.:format)" => "opendata/agents/nodes/idea/idea#index"
    get "/rss.xml" => "opendata/agents/nodes/idea/idea#rss"
    get "/areas" => "opendata/agents/nodes/idea/idea#index_areas"
    get "/tags" => "opendata/agents/nodes/idea/idea#index_tags"
    get "/:idea/point.:format" => "opendata/agents/nodes/idea/idea#show_point", format: false
    post "/:idea/point.:format" => "opendata/agents/nodes/idea/idea#add_point", format: false
    get "/:idea/point/members.html" => "opendata/agents/nodes/idea/idea#point_members", format: false
    get "/:idea/dataset/show.:format" => "opendata/agents/nodes/idea/idea#show_dataset", format: false
    get "/:idea/app/show.:format" => "opendata/agents/nodes/idea/idea#show_app", format: false

    get "/:idea/comment/show.:format" => "opendata/agents/nodes/idea/comment#index", format: false
    post "/:idea/comment/add.:format" => "opendata/agents/nodes/idea/comment#add", format: false
    post "/:idea/comment/delete.:format" => "opendata/agents/nodes/idea/comment#delete", format: false
  end

  routes.node "opendata/search_idea" do
    match "search_idea/(index.:format)" => "opendata/agents/nodes/idea/search_idea#index", via: [:get, :post]
    get "search_idea/tags" => "opendata/agents/nodes/idea/search_idea#index_tags"
    get "search_idea/search" => "opendata/agents/nodes/idea/search_idea#search"
    get "search_idea/rss.xml" => "opendata/agents/nodes/idea/search_idea#rss"
  end
end
