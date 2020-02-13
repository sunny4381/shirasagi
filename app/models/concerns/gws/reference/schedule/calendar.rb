module Gws::Reference::Schedule::Calendar
  extend ActiveSupport::Concern
  extend SS::Translation

  included do
    belongs_to :calendar, class_name: 'Gws::Schedule::Remote::Calendar'
    field :cal_dav_schedule_tag, type: String

    scope :default_calendar, -> { exists(calendar_id: false) }
    scope :calendar, ->(calendar) { where(calendar_id: calendar.id) }
  end
end
