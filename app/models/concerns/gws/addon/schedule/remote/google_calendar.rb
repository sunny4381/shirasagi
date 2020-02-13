module Gws::Addon::Schedule::Remote::GoogleCalendar
  extend ActiveSupport::Concern
  extend SS::Addon

  set_addon_type :gws_schedule_calendar

  included do
    field :google_access_token, type: String
    field :google_refresh_token, type: String
    field :google_principal_url, type: String
    field :google_calendar_home_set, type: String

    permit_params :google_access_token, :google_refresh_token, :google_principal_url, :google_calendar_home_set
  end
end
