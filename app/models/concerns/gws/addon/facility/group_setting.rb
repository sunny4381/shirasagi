module Gws::Addon::Facility::GroupSetting
  extend ActiveSupport::Concern
  extend SS::Addon

  set_addon_type :organization

  included do
    field :facility_min_hour, type: Integer, default: 8
    field :facility_max_hour, type: Integer, default: 22

    permit_params :facility_min_hour, :facility_max_hour

    validates :facility_min_hour, numericality:
      { only_integer: true, greater_than_or_equal_to: 0, less_than_than_or_equal_to: 24, allow_blank: true }
    validates :facility_max_hour, numericality:
      { only_integer: true, greater_than_or_equal_to: 0, less_than_than_or_equal_to: 24, allow_blank: true }
    validate :validate_facility_hours, if: ->{ facility_min_hour.present? && facility_max_hour.present? }
  end

  def facility_min_hour_options
    (0..24).map { |m| [m, m] }
  end

  def facility_max_hour_options
    facility_min_hour_options
  end

  def facility_min_time
    hour = self[:facility_min_hour].presence || 8
    "#{hour}:00"
  end

  def facility_max_time
    hour = self[:facility_max_hour].presence || 22
    "#{hour}:00"
  end

  private

  def validate_facility_hours
    if facility_min_hour >= facility_max_hour
      errors.add :facility_max_hour, :greater_than, count: t(:facility_min_hour)
    end
  end
end
