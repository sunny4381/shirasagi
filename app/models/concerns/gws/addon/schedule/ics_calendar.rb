module Gws::Addon::Schedule::IcsCalendar
  extend ActiveSupport::Concern
  extend SS::Addon

  set_addon_type :gws_schedule_calendar

  included do
    field :ics_url, type: String
    permit_params :ics_url
    validates :ics_url, url: { scheme: %w(http https) }
  end
end
