Rails.application.routes.draw do

  Cms::Initializer

end

Cms.application.routes.tap do |routes|

  routes.node "cms/node" do
    get "/(index.:format)" => "cms/agents/nodes/node#index"
  end

  routes.node "cms/page" do
    get "/(index.:format)" => "cms/agents/nodes/page#index"
    get "/rss(.:format)" => "cms/agents/nodes/page#rss", format: "xml"
  end

  routes.node "cms/group_page" do
    get "/(index.:format)" => "cms/agents/nodes/group_page#index"
    get "/rss(.:format)" => "cms/agents/nodes/group_page#rss", format: "xml"
  end

  routes.node "cms/import_node" do
    get "/(index.:format)" => "cms/agents/nodes/import_node#index"
    get "/rss(.:format)" => "cms/agents/nodes/import_node#rss", format: "xml"
  end

  routes.node "cms/archive" do
    get "/:ymd/(index.:format)" => "cms/agents/nodes/archive#index", ymd: /\d+/
    get "/(index.:format)" => "cms/agents/nodes/archive#redirect_to_archive_index"
  end

  routes.node "cms/photo_album" do
    get "/(index.:format)" => "cms/agents/nodes/photo_album#index"
  end

  routes.node "cms/site_search" do
    get "/(index.:format)" => "cms/agents/nodes/site_search#index"
  end

  routes.part "cms/free" do
    get "/" => "cms/agents/parts/free#index"
  end

  routes.part "cms/node" do
    get "/" => "cms/agents/parts/node#index"
  end

  routes.part "cms/page" do
    get "/" => "cms/agents/parts/page#index"
  end

  routes.part "cms/tabs" do
    get "/" => "cms/agents/parts/tabs#index"
  end

  routes.part "cms/crumb" do
    get "/" => "cms/agents/parts/crumb#index"
  end

  routes.part "cms/sns_share" do
    get "/" => "cms/agents/parts/sns_share#index"
  end

  routes.part "cms/calendar_nav" do
    get "/" => "cms/agents/parts/calendar_nav#index"
  end

  routes.part "cms/monthly_nav" do
    get "/" => "cms/agents/parts/monthly_nav#index"
  end

  routes.page "cms/page" do
    get "/" => "cms/agents/pages/page#index"
  end

  routes.page "cms/import_page" do
    get "/" => "cms/agents/pages/import_page#index"
  end

end
