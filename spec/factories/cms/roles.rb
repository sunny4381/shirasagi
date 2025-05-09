FactoryBot.define do
  trait :cms_role do
    cur_site { cms_site }
    cur_user { cms_user }
    name { "cms_role" }
    permissions { [] }
  end

  factory :cms_role, class: Cms::Role, traits: [:cms_role] do
    permissions { %w(release_private_cms_pages) }
  end

  factory :cms_role_admin, class: Cms::Role do
    name { "cms_role_admin" }
    permissions { Cms::Role.permission_names }
    site_id { 1 }
  end
end
