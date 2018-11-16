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

  namespace "entry", path: ".s:site/entry" do
    namespace "apis" do
      get ":form_id/:column_id/form" => "entry#entry_form", as: "form"
      # get ":form_id/:column_id/show" => "entry#entry_show", as: "show"
    end
  end

  page "entry" do
    get "page/:filename.:format" => "public#index", cell: "pages/page"
  end
end
