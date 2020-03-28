Rails.application.routes.draw do

  Opendata::Initializer

  concern :deletion do
    get :delete, on: :member
    delete :destroy_all, on: :collection, path: ''
  end

  concern :copy do
    get :copy, on: :member
    put :copy, on: :member
  end

  concern :command do
    get :command, on: :member
    post :command, on: :member
  end

  content "opendata" do
    get "dataset_public_entity" => "dataset/public_entity#index", as: :dataset_public_entity
    get "dataset_public_entity_download" => "dataset/public_entity#download", as: :dataset_public_entity_download
    resources :crawls, concerns: :deletion, module: :dataset
    resources :dataset_categories, concerns: :deletion, module: :dataset
    resources :dataset_estat_categories, concerns: :deletion, module: :dataset
    resources :dataset_areas, concerns: :deletion, module: :dataset
    resources :dataset_groups, concerns: :deletion, module: :dataset do
      get "search" => "dataset_groups/search#index", on: :collection
    end
    get 'export_datasets' => 'dataset/export_datasets#index'
    put 'export_datasets' => 'dataset/export_datasets#export'
    get 'start_export_datasets' => 'dataset/export_datasets#start_export'
    get 'import_datasets' => 'dataset/import_datasets#index'
    put 'import_datasets' => 'dataset/import_datasets#import'
    resources :datasets, concerns: [:deletion, :copy, :command], module: :dataset do

      get "search" => "datasets/search#index", on: :collection
      get :check_for_update, on: :member
      resources :resources, concerns: :deletion do
        get "file" => "resources#download"
        get "tsv" => "resources#download_tsv"
        get "content" => "resources#content"
        get "guidance" => "csv2rdf_settings#guidance"
        get "header_size" => "csv2rdf_settings#header_size"
        post "header_size" => "csv2rdf_settings#header_size"
        get "rdf_class" => "csv2rdf_settings#rdf_class"
        post "rdf_class" => "csv2rdf_settings#rdf_class"
        get "column_types" => "csv2rdf_settings#column_types"
        post "column_types" => "csv2rdf_settings#column_types"
        get "confirmation" => "csv2rdf_settings#confirmation"
        post "confirmation" => "csv2rdf_settings#confirmation"
        get "rdf_class_preview" => "csv2rdf_settings#rdf_class_preview"
        get "rdf_prop_select/:column_index" => "csv2rdf_settings#rdf_prop_select"
        post "rdf_prop_select/:column_index" => "csv2rdf_settings#rdf_prop_select"
        get :check_for_update, on: :member
        match :sync, on: :member, via: [ :get, :post ]
      end

      resources :url_resources, concerns: :deletion do
        get "file" => "url_resources#download"
        get "content" => "url_resources#content"
      end
      get :public_entity_download, on: :collection
    end
    resources :search_datasets, concerns: :deletion, module: :dataset
    resources :search_dataset_groups, concerns: :deletion, module: :dataset
    resources :dataset_maps, concerns: :deletion, module: :dataset

    scope "report", as: "dataset_report" do
      get "/" => redirect { |p, req| "#{req.path}/downloads" }, as: :main
      resources :downloads, only: %i[index], controller: "dataset/resource_download_reports" do
        get :download, on: :collection
      end
      resources :accesses, only: %i[index], controller: "dataset/access_reports" do
        get :download, on: :collection
      end
      resources :previews, only: %i[index], controller: "dataset/resource_preview_reports" do
        get :download, on: :collection
      end
    end
    scope "history", as: "dataset_history" do
      get "/" => redirect { |p, req| "#{req.path}/downloads/#{Time.zone.now.strftime('%Y%m%d')}" }, as: :main
      get "/downloads" => redirect { |p, req| "#{req.path}/#{Time.zone.now.strftime('%Y%m%d')}" }, as: :downloads_main
      resources :downloads, only: %i[index], controller: "dataset/resource_download_histories", path: 'downloads/:ymd' do
        get :download, on: :collection
      end
      resources :download_archives, only: %i[index show destroy], concerns: :deletion,
                controller: "dataset/resource_download_history_archives"
      get "/previews" => redirect { |p, req| "#{req.path}/#{Time.zone.now.strftime('%Y%m%d')}" }, as: :previews_main
      resources :previews, only: %i[index], controller: "dataset/resource_preview_histories", path: 'previews/:ymd' do
        get :download, on: :collection
      end
      resources :preview_archives, only: %i[index show destroy], concerns: :deletion,
                controller: "dataset/resource_preview_history_archives"
    end

    scope module: :dataset do
      namespace :harvest do
        resources :importers, concerns: :deletion do
          get :import, on: :member
          put :import, on: :member
          get :destroy_datasets, on: :member
          put :destroy_datasets, on: :member
          scope module: :importer do
            resources :category_settings, concerns: :deletion, path: 'c:category_id', defaults: { category_id: '-' } do
              get :download, on: :collection
              get :import, on: :collection
              put :import, on: :collection
            end
            resources :estat_category_settings, concerns: :deletion, path: 'estat:category_id', defaults: { category_id: '-' } do
              get :download, on: :collection
              get :import, on: :collection
              put :import, on: :collection
            end
            resources :reports, only: [:show, :destroy], concerns: :deletion do
              get :dataset, on: :member
              get :download, on: :member
            end
          end
        end
        resources :exporters, concerns: :deletion do
          get :export, on: :member
          put :export, on: :member
          scope module: :exporter do
            resources :group_settings, concerns: :deletion
            resources :owner_org_settings, concerns: :deletion
          end
        end
      end
    end
  end
end

Cms.application.routes.tap do |routes|
  routes.page "opendata/dataset" do
    get "/" => "opendata/agents/pages/dataset/dataset#index"
  end

  routes.part "opendata/dataset" do
    get "/" => "opendata/agents/parts/dataset/dataset#index"
  end

  routes.part "opendata/dataset_group" do
    get "/" => "opendata/agents/parts/dataset/dataset_group#index"
  end

  routes.part "opendata/dataset_counter" do
    get "/" => "opendata/agents/parts/dataset/dataset_counter#index"
  end

  routes.node "opendata/dataset" do
    get "/(index.:format)" => "opendata/agents/nodes/dataset/dataset#index"
    get "/rss(.:format)" => "opendata/agents/nodes/dataset/dataset#rss"
    get "/categories" => "opendata/agents/nodes/dataset/dataset#index_categories"
    get "/estat_categories" => "opendata/agents/nodes/dataset/dataset#index_estat_categories"
    get "/areas" => "opendata/agents/nodes/dataset/dataset#index_areas"
    get "/tags" => "opendata/agents/nodes/dataset/dataset#index_tags"
    get "/formats" => "opendata/agents/nodes/dataset/dataset#index_formats"
    get "/licenses" => "opendata/agents/nodes/dataset/dataset#index_licenses"

    get "/:dataset/point(.:format)" => "opendata/agents/nodes/dataset/dataset#show_point"
    post "/:dataset/point(.:format)" => "opendata/agents/nodes/dataset/dataset#add_point"
    get "/:dataset/point/members(.html)" => "opendata/agents/nodes/dataset/dataset#point_members"
    get "/:dataset/apps/show(.:format)" => "opendata/agents/nodes/dataset/dataset#show_apps"
    get "/:dataset/ideas/show(.:format)" => "opendata/agents/nodes/dataset/dataset#show_ideas"

    get "/datasets/search(.:format)" => "opendata/agents/nodes/dataset/dataset#datasets_search"

    get "/:dataset/resource/:id/" => "opendata/agents/nodes/dataset/resource#index"
    get "/:dataset/resource/:id/content(.:format)" => "opendata/agents/nodes/dataset/resource#content"
    get "/:dataset/resource/:id/*filename" => "opendata/agents/nodes/dataset/resource#download", filename: /.*/, format: false

    get "/:dataset/url_resource/:id/" => "opendata/agents/nodes/dataset/url_resource#index"
    get "/:dataset/url_resource/:id/content.html" => "opendata/agents/nodes/dataset/url_resource#content", format: false
    get "/:dataset/url_resource/:id/download" => "opendata/agents/nodes/dataset/url_resource#download", format: false
    get "/:dataset/url_resource/:id/*filename" => "opendata/agents/nodes/dataset/url_resource#download", filename: /.*/,
        format: false
  end

  routes.node "opendata/dataset_category" do
    get "/" => "opendata/agents/nodes/dataset/dataset_category#index"
    get "/rss(.:format)" => "opendata/agents/nodes/dataset/dataset_category#rss"
    get "/:name" => "opendata/agents/nodes/dataset/dataset_category#index"
    get "/:name/rss(.:format)" => "opendata/agents/nodes/dataset/dataset_category#rss"
    # get "/:name/areas" => "opendata/agents/nodes/dataset/dataset_category#index_areas"
    # get "/:name/tags" => "opendata/agents/nodes/dataset/dataset_category#index_tags"
    # get "/:name/formats" => "opendata/agents/nodes/dataset/dataset_category#index_formats"
    # get "/:name/licenses" => "opendata/agents/nodes/dataset/dataset_category#index_licenses"
  end

  routes.node "opendata/dataset_estat_category" do
    get "/" => "opendata/agents/nodes/dataset/dataset_estat_category#index"
    get "/rss(.:format)" => "opendata/agents/nodes/dataset/dataset_estat_category#rss"
    get "/:name/" => "opendata/agents/nodes/dataset/dataset_estat_category#index"
    get "/:name/rss(.:format)" => "opendata/agents/nodes/dataset/dataset_estat_category#rss"
  end

  routes.node "opendata/dataset_area" do
    get "/" => "opendata/agents/nodes/dataset/dataset_area#index"
    get "/rss(.:format)" => "opendata/agents/nodes/dataset/dataset_area#rss"
    get "/*name/" => "opendata/agents/nodes/dataset/dataset_area#index", name: /[^\.]+/
    get "/*name/rss(.:format)" => "opendata/agents/nodes/dataset/dataset_area#rss", name: /[^\.]+/
  end

  routes.node "opendata/dataset_map" do
    get "/" => "opendata/agents/nodes/dataset/dataset_map#index"
    get "/search(.:format)" => "opendata/agents/nodes/dataset/dataset_map#search"
  end

  routes.node "opendata/search_dataset_group" do
    match "/(index.:format)" => "opendata/agents/nodes/dataset/search_dataset_group#index", via: [:get, :post]
  end

  routes.node "opendata/search_dataset" do
    match "/(index.:format)" => "opendata/agents/nodes/dataset/search_dataset#index", via: [:get, :post]
    get "/tags" => "opendata/agents/nodes/dataset/search_dataset#index_tags"
    get "/search" => "opendata/agents/nodes/dataset/search_dataset#search"
    get "/rss(.:format)" => "opendata/agents/nodes/dataset/search_dataset#rss"
    match "/bulk_download" => "opendata/agents/nodes/dataset/search_dataset#bulk_download", via: [:get, :post]
    match "/dataset_download/:id" => "opendata/agents/nodes/dataset/search_dataset#dataset_download", via: [:get, :post]
  end
end
