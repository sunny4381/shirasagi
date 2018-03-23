FactoryGirl.define do
  factory :facility_image, class: Facility::Image, traits: [:cms_page] do
    route "facility/image"
  end

  factory :facility_map, class: Facility::Map, traits: [:cms_page] do
    route "facility/map"
  end
end
