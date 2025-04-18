module Sys::Reference
  module Role
    extend ActiveSupport::Concern

    included do
      embeds_ids :sys_roles, class_name: "Sys::Role"
      permit_params sys_role_ids: []
    end

    def sys_role_permissions
      return @sys_role_permissions if @sys_role_permissions

      @sys_role_permissions ||= {}
      sys_roles.each do |role|
        permissions = role.permissions
        permissions &= SS.current_token.scopes if SS.current_token
        permissions.each do |name|
          @sys_role_permissions[name] = 1
        end
      end
      @sys_role_permissions
    end

    def sys_role_permit_any?(*permissions)
      Array(permissions).flatten.any? do |permission|
        sys_role_permissions[permission.to_s]
      end
    end
  end
end
