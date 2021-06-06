module Cms::PublicFilter::Site
  extend ActiveSupport::Concern
  include Cms::PublicFilter::Agent

  included do
    before_action :set_site
  end

  private

  def set_site
    @cur_site ||= @cur_context.site ||= SS::Site.find_by_domain(request_host, request_path)
  end
end
