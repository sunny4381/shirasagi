FactoryGirl.define do
  factory :facility_node_base, class: Facility::Node::Base, traits: [:cms_node] do
    route "facility/base"
  end

  factory :facility_node_node, class: Facility::Node::Node, traits: [:cms_node] do
    route "facility/node"
  end

  factory :facility_node_page, class: Facility::Node::Page, traits: [:cms_node] do
    route "facility/page"
    kana { unique_id }
    postcode { unique_id }
    address { unique_id }
    tel { unique_id }
    fax { unique_id }
    related_url { "http://#{unique_id}.example.jp/#{unique_id}/" }
  end

  factory :facility_node_search, class: Facility::Node::Search, traits: [:cms_node] do
    route "facility/search"
  end

  factory :facility_node_category, class: Facility::Node::Category, traits: [:cms_node] do
    route "facility/category"
  end

  factory :facility_node_service, class: Facility::Node::Service, traits: [:cms_node] do
    route "facility/service"
  end

  factory :facility_node_location, class: Facility::Node::Location, traits: [:cms_node] do
    route "facility/location"
  end
end
