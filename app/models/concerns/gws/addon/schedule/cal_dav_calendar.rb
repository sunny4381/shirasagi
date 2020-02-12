module Gws::Addon::Schedule::CalDavCalendar
  extend ActiveSupport::Concern
  extend SS::Addon

  set_addon_type :gws_schedule_calendar

  included do
    field :cal_dav_url, type: String
    field :cal_dav_username, type: String
    field :cal_dav_password, type: String
    #
    field :cal_dav_cache_refreshed_at, type: DateTime
    field :cal_dav_cache_principal_url, type: String
    field :cal_dav_cache_resource_types, type: Array

    permit_params :cal_dav_url, :cal_dav_username, :cal_dav_password

    validates :cal_dav_url, url: { scheme: %w(http https) }
    validates :cal_dav_url, presence: true, if: -> { calendar_model == "cal_dav" }
    # username containing colon(:) is invalid
    validates :cal_dav_username, format: /\A[^:]*\z/

    before_validation :encrypt_cal_dav_password
  end

  private

  def encrypt_cal_dav_password
    return if SS::Crypt.decrypt(cal_dav_password)

    self.cal_dav_password = SS::Crypt.encrypt(cal_dav_password)
  end
end
