Rails.application.routes.draw do
  Gws::Share::Initializer

  concern :deletion do
    get :delete, on: :member
    delete :destroy_all, on: :collection, path: ''
  end

  gws "job" do
    resources :logs, only: [:index, :show] do
      get :batch_destroy, on: :collection
      post :batch_destroy, on: :collection
      match :download_all, on: :collection, via: %i[get post]
      get :download, on: :member
    end

    resources :reservations, only: [:index, :show, :destroy], concerns: [:deletion]

    namespace 'apis' do
      resources :tasks, only: [] do
        get :status, on: :member
      end
    end
  end
end
