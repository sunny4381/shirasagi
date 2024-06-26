class Cms::Ldap::ImportJob < Cms::ApplicationJob

  attr_accessor :exclude_groups

  def perform
    @group_count = 0
    @user_count = 0
    @exclude_groups ||= site.ldap_exclude_groups

    if site.ldap_use_state_system?
      ldap_setting = Sys::Auth::Setting.instance
    else
      ldap_setting = site
    end

    connection = Ldap::Connection.connect(
      url: ldap_setting.ldap_url, openssl_verify_mode: ldap_setting.ldap_openssl_verify_mode,
      base_dn: site.ldap_base_dn, auth_method: site.ldap_auth_method,
      username: site.ldap_user_dn, password: site.ldap_user_password ? SS::Crypto.decrypt(site.ldap_user_password) : nil)
    if connection.blank?
      raise I18n.t("ldap.errors.connection_setting_not_found")
    end

    import_groups(nil, connection.groups)
  end

  private

  def import_groups(parent_dn, groups)
    ldap_array = convert_groups(parent_dn, groups)
    Cms::Ldap::Import.create!(
      {
        site_id: site.id,
        group_count: @group_count,
        user_count: @user_count,
        ldap: ldap_array
      })
  end

  def convert_groups(parent_dn, groups)
    groups.map do |group|
      convert_group(parent_dn, group)
    end.flatten
  end

  def convert_group(parent_dn, group)
    return [] if @exclude_groups.try(:include?, group.name)

    entity = Cms::Ldap::Extensions::LdapEntity.convert_group(group, parent_dn: parent_dn)
    @group_count += 1
    ret = [ entity ]
    ret << convert_groups(entity[:dn], group.groups)
    ret << convert_users(entity[:dn], group.users)
    ret
  end

  def convert_users(parent_dn, users)
    @user_count += users.length
    users.map do |user|
      Cms::Ldap::Extensions::LdapEntity.convert_user(user, parent_dn: parent_dn)
    end
  end
end
