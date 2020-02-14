module Gws::Reference::Schedule::Remote::CalDav
  extend ActiveSupport::Concern
  extend SS::Translation

  included do
    field :cal_dav_status_code, type: Integer
    field :cal_dav_etag, type: String
    field :cal_dav_schedule_tag, type: String
    field :cal_dav_error, type: String
  end
end
