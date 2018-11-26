SS::Application.routes.draw do

  Entry::Initializer

  concern :deletion do
    get :delete, on: :member
    delete :destroy_all, on: :collection, path: ''
  end

  content "entry" do
    get "/" => redirect { |p, req| "#{req.path}/pages" }, as: :main
    resources :pages, concerns: %i[deletion]
  end

  page "entry" do
    get "page/:filename.:format" => "public#index", cell: "pages/page"
  end
end
