class Gws::Schedule::Remote::Calendar
  include SS::Document
  include Gws::Reference::User
  include Gws::Reference::Site
  include Gws::Schedule::Colorize
  include Gws::Addon::Member
  include Gws::SitePermission

  member_ids_optional
  set_permission_name "gws_schedule_calendars", :edit

  belongs_to :account, class_name: "Gws::Schedule::Remote::Account"
  has_many :plans, class_name: "Gws::Schedule::Plan", dependent: :destroy, inverse_of: :calendar

  field :name, type: String
  field :description, type: String
  field :order, type: Integer
  field :color, type: String
  field :privileges, type: SS::Extensions::Words

  # google
  field :google_calender_url, type: String

  permit_params :name, :description, :color, :order, :color, :privileges

  class << self
    def and_writable
      all.in(privileges: "write")
    end
  end
end
