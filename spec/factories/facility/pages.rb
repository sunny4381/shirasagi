FactoryGirl.define do
  factory :facility_image, class: Facility::Image, traits: [:cms_page] do
    route "facility/image"
  end

  factory :facility_map, class: Facility::Map, traits: [:cms_page] do
    route "facility/map"
    map_points { [{ name: unique_id, loc: [ rand * 100, rand * 100 ], text: '' }] }
  end
end
