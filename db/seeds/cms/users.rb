# --------------------------------------
# Require
# inherit params: @site

require "#{Rails.root}/db/seeds/ss/users"

@user = SS::User.where(name: "システム管理者").first
@group = Cms::Group.find_by name: 'シラサギ市'
@site.add_to_set group_ids: @group.id
@site.reload

# --------------------------------------
# Seed

def save_role(data)
  if item = Cms::Role.where(site_id: @site.id, name: data[:name]).first
    puts "exists #{data[:name]}"
    item.update data
    return item
  end

  puts "create #{data[:name]}"
  item = Cms::Role.new(data)
  item.save
  item
end

puts "# roles"
exclusions = %w(
  read_cms_body_layouts edit_cms_body_layouts delete_cms_body_layouts
  edit_other_opendata_harvested edit_other_opendata_public_entity_datasets
)
admin_permissions = Cms::Role.permission_names - exclusions
user_permissions = Cms::Role.permission_names.select { |n| n =~ /_(private|other)_/ } - exclusions

r01 = save_role name: I18n.t('cms.roles.admin'), site_id: @site.id, permissions: admin_permissions
r02 = save_role name: I18n.t('cms.roles.user'), site_id: @site.id, permissions: user_permissions

Cms::User.unscoped.find_by(uid: "sys").add_to_set(cms_role_ids: r01.id)
Cms::User.unscoped.find_by(uid: "admin").add_to_set(cms_role_ids: r01.id)
Cms::User.unscoped.find_by(uid: "user1").add_to_set(cms_role_ids: r02.id)
Cms::User.unscoped.find_by(uid: "user2").add_to_set(cms_role_ids: r02.id)
Cms::User.unscoped.find_by(uid: "user3").add_to_set(cms_role_ids: r02.id)
Cms::User.unscoped.find_by(uid: "user4").add_to_set(cms_role_ids: r01.id)
Cms::User.unscoped.find_by(uid: "user5").add_to_set(cms_role_ids: r02.id)
