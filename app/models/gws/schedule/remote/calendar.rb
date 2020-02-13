class Gws::Schedule::Remote::Calendar
  include SS::Document
  include Gws::Reference::User
  include Gws::Reference::Site
  include Gws::Schedule::Colorize
  include Gws::SitePermission

  set_permission_name "gws_schedule_calendars", :edit

  belongs_to :account, class_name: "Gws::Schedule::Remote::Account"
  field :color, type: String

  permit_params :color
end
