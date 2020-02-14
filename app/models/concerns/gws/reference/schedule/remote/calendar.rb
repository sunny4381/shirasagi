module Gws::Reference::Schedule::Remote::Calendar
  extend ActiveSupport::Concern
  extend SS::Translation

  included do
    belongs_to :calendar, class_name: 'Gws::Schedule::Remote::Calendar'

    scope :default_calendar, -> { exists(calendar_id: false) }
    scope :calendar, ->(calendar) { where(calendar_id: calendar.id) }

    permit_params :calendar_id
  end
end
