Rails.application.routes.draw do

  Recommend::Initializer

  concern :deletion do
    get :delete, on: :member
    delete :destroy_all, on: :collection, path: ''
  end

  content "recommend" do
    get "/" => redirect { |p, req| "#{req.path}/receivers" }, as: :main
    resources :receivers, concerns: :deletion
  end

  namespace "recommend", path: ".s:site/recommend" do
    namespace "history" do
      get "receiver" => "receiver#index", as: "receiver"
      get "logs/tokens" => "logs#tokens"
      get "logs/paths" => "logs#paths"
    end

    get "similarity_scores" => "similarity_scores#index"
  end

  part "recommend/history"
  part "recommend/similarity"

  node "recommend/receiver" do
    get "index.json", action: "index"
  end

end
