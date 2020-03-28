Rails.application.routes.draw do

  Member::Initializer

  concern :deletion do
    get :delete, :on => :member
    delete :destroy_all, on: :collection, path: ''
  end

  concern :download do
    get :download, :on => :collection
  end

  concern :command do
    get :command, on: :member
    post :command, on: :member
  end

  # Google Person Finder
  concern :gpf do
    get :gpf, action: :edit_gpf, on: :member
    post :gpf, action: :update_gpf, on: :member
  end

  content "member" do
    get "/" => redirect { |p, req| "#{req.path}/logins" }, as: :main
    resources :logins, only: [:index]
    resources :mypages, concerns: :deletion
    resources :my_profiles, concerns: :deletion
    resources :my_blogs, concerns: :deletion
    resources :my_photos, concerns: :deletion
    resources :my_anpi_posts, concerns: [:deletion, :download, :gpf]
    resources :my_groups, concerns: :deletion
    resources :blog_layouts, concerns: :deletion
    resources :blogs, concerns: :deletion
    resources :blog_pages, concerns: :deletion
    resources :blog_page_locations, concerns: :deletion

    resources :photos, concerns: [:deletion, :command] do
      get :index_listable, on: :collection
      get :index_slideable, on: :collection
      delete "index_:state", action: :destroy_all, on: :collection, state: /listable|slideable/
    end
    resources :photo_searches, concerns: :deletion
    resources :photo_categories, concerns: :deletion
    resources :photo_locations, concerns: :deletion
    resources :photo_spots, concerns: [:deletion, :command]
    resources :registrations, concerns: :deletion

    # resources :groups, concerns: :deletion do
    #   resources :members, controller: :group_members, concerns: :deletion
    # end
  end

  namespace "member", path: ".m:member", member: /\d+/ do
    namespace "apis" do
      resources :temp_files, concerns: :deletion do
        get :select, on: :member
        get :view, on: :member
        get :thumb, on: :member
        get :download, on: :member
      end
    end
  end

  namespace "member", path: ".s:site/member", module: "member" do
    namespace "apis" do
      resources :photos, concerns: :deletion do
        get :select, on: :member
      end
    end

    resources :groups, concerns: :deletion do
      resources :members, controller: :group_members, concerns: :deletion
    end
  end
end

Cms.application.routes.tap do |routes|
  ## login
  routes.node "member/login" do
    match "/(index.:format)" => "member/agents/nodes/login#login", via: [:get, :post]
    match "/login.html" => "member/agents/nodes/login#login", via: [:get, :post]
    get "/logout.html" => "member/agents/nodes/login#logout"
    get "/:provider/callback" => "member/agents/nodes/login#callback"
    get "/failure" => "member/agents/nodes/login#failure"
  end

  ## mypage
  routes.node "member/mypage" do
    get "/(index.:format)" => "member/agents/nodes/mypage#index"
  end

  ## blog, blog_page, blog_page_location
  routes.node "member/blog" do
    ## public contents
    get "/(index.:format)" => "member/agents/nodes/blog#index"
    get "/rss(.:format)" => "member/agents/nodes/blog#rss", format: "xml"
  end
  routes.node "member/blog_page" do
    get "/(index.:format)" => "member/agents/nodes/blog_page#index"
    get "/rss(.:format)" => "member/agents/nodes/blog_page#rss", format: "xml"
  end
  routes.node "member/blog_page_location" do
    get "/(index.:format)" => "member/agents/nodes/blog_page_location#index"
    get "/rss(.:format)" => "member/agents/nodes/blog_page_location#rss", format: "xml"
  end

  ## photo
  routes.node "member/photo" do
    get "/(index.:format)" => "member/agents/nodes/photo#index"
    get "/rss(.:format)" => "member/agents/nodes/photo#rss", format: "xml"
  end
  routes.node "member/photo_search" do
    get "/(index.:format)" => "member/agents/nodes/photo_search#index"
    get "/map.html" => "member/agents/nodes/photo_search#map"
  end
  routes.node "member/photo_category" do
    get "/(index.:format)" => "member/agents/nodes/photo_category#index"
  end
  routes.node "member/photo_location" do
    get "/(index.:format)" => "member/agents/nodes/photo_location#index"
  end
  routes.node "member/photo_spot" do
    get "/(index.:format)" => "member/agents/nodes/photo_spot#index"
    get "/rss(.:format)" => "member/agents/nodes/photo_spot#rss", format: "xml"
  end

  # routes.node "member/my_profile" do
  #   ## mypage contents
  #   get "my_profile(index.:format)" => "public#index", cell: "nodes/my_profile"
  #   resource :my_profile, controller: "public", cell: "nodes/my_profile", only: [:edit, :update]
  #   get "my_profile/leave(.:format)" => "public#leave", cell: "nodes/my_profile"
  #   post "my_profile/confirm_leave(.:format)" => "public#confirm_leave", cell: "nodes/my_profile"
  #   post "my_profile/complete_leave(.:format)" => "public#complete_leave", cell: "nodes/my_profile"
  #   get "my_profile/change_password(.:format)" => "public#change_password", cell: "nodes/my_profile"
  #   post "my_profile/confirm_password(.:format)" => "public#confirm_password", cell: "nodes/my_profile"
  #   get "my_profile/complete_password(.:format)" => "public#complete_password", cell: "nodes/my_profile"
  #   post "my_profile/postal_code(.:format)" => "public#postal_code", cell: "nodes/my_profile"
  #
  #   scope "my_blog" do
  #     resource :setting, controller: "public", cell: "nodes/my_blog/setting", except: [:index, :show, :destroy]
  #   end
  #   get "my_blog(index.:format)" => "public#index", cell: "nodes/my_blog"
  #   resources :my_blog, concerns: :deletion, controller: "public", cell: "nodes/my_blog", except: :index
  #
  #   get "my_photo(index.:format)" => "public#index", cell: "nodes/my_photo"
  #   resources :my_photo, concerns: :deletion, controller: "public", cell: "nodes/my_photo", except: :index
  #
  #   resources :my_anpi_post, concerns: :deletion, controller: "public", cell: "nodes/my_anpi_post" do
  #     get "others/new(.:format)", action: :others_new, on: :collection, as: :new_others
  #     post "others(.:format)", action: :others_create, on: :collection
  #     get "map", on: :collection
  #   end
  # end

  routes.node "member/my_group" do
    resources controller: "member/agents/nodes/my_group", cell: "nodes/my_group" do
      get :delete, on: :member
      delete :destroy_all, on: :collection, path: ''
      get "invite(.:format)", action: :invite, on: :member
      post "invite(.:format)", action: :invite, on: :member
      get "accept(.:format)", action: :accept, on: :member
      post "accept(.:format)", action: :accept, on: :member
      get "reject(.:format)", action: :reject, on: :member
      post "reject(.:format)", action: :reject, on: :member
    end
  end

  ## registration
  routes.node "member/registration" do
    get "/(index.:format)" => "member/agents/nodes/registration#new"
    match "/new(.:format)" => "member/agents/nodes/registration#new", via: [:get, :post]
    post "/confirm(.:format)" => "member/agents/nodes/registration#confirm"
    post "/interim(.:format)" => "member/agents/nodes/registration#interim"
    get "/verify(.:format)" => "member/agents/nodes/registration#verify"
    post "/registration(.:format)" => "member/agents/nodes/registration#registration"
    get "/send_again(.:format)" => "member/agents/nodes/registration#send_again"
    post "/resend_confirmation_mail(.:format)" => "member/agents/nodes/registration#resend_confirmation_mail"
    get "/reset_password(.:format)" => "member/agents/nodes/registration#reset_password"
    post "/reset_password(.:format)" => "member/agents/nodes/registration#reset_password"
    get "/confirm_reset_password(.:format)" => "member/agents/nodes/registration#confirm_reset_password"
    get "/change_password(.:format)" => "member/agents/nodes/registration#change_password"
    post "/change_password(.:format)" => "member/agents/nodes/registration#change_password"
    get "/confirm_password(.:format)" => "member/agents/nodes/registration#confirm_password"
    post "/postal_code(.:format)" => "member/agents/nodes/registration#postal_code"
  end

  routes.page "member/blog_page" do
    get "/" => "member/agents/pages/blog_page#index"
  end
  routes.page "member/photo" do
    get "/" => "member/agents/pages/photo#index"
  end
  routes.page "member/photo_spot" do
    get "/" => "member/agents/pages/photo_spot#index"
  end

  routes.part "member/login" do
    get "/" => "member/agents/parts/login#index"
  end
  routes.part "member/blog_page" do
    get "/" => "member/agents/parts/blog_page#index"
  end
  routes.part "member/photo" do
    get "/" => "member/agents/parts/photo#index"
  end
  routes.part "member/photo_slide" do
    get "/" => "member/agents/parts/photo_slide#index"
  end
  routes.part "member/photo_search" do
    get "/" => "member/agents/parts/photo_search#index"
  end
  routes.part "member/invited_group" do
    get "/" => "member/agents/parts/invited_group#index"
  end
end
