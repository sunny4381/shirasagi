class Ads::Agents::Pages::BannerController < ApplicationController
  include Cms::PageFilter::View

  def index
    @cur_page.layout_id = nil
  end

  def count
    if !preview_path?
      log = Ads::AccessLog.find_or_create_by(
          site_id: @cur_page.site_id,
          node_id: @cur_page.parent.id,
          link_url: @cur_page.link_url,
          date: Time.zone.today
      )
      log.inc count: 1
    end

    response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"

    head :ok
  end
end
