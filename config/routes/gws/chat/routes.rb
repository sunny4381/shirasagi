SS::Application.routes.draw do
  Gws::Chat::Initializer

  concern :deletion do
    get :delete, on: :member
    delete action: :destroy_all, on: :collection
  end

  gws 'chat' do
    get '/' => redirect { |p, req| "#{req.path}/rooms" }, as: :main

    resources :rooms, concerns: [:deletion] do
      resources :posts, concerns: [:deletion]
    end
  end
end
