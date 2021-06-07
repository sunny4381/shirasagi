module Cms::PageFilter::View
  extend ActiveSupport::Concern
  include Cms::AgentFilter
  include Cms::PublicFilter::Layout

  included do
    helper Gravatar::GravatarHelper
    helper Map::MapHelper
  end

  def index
    body = render_to_string
    mime = rendered_format

    if @cur_page.view_layout == "cms/redirect" && !mobile_path?
      @redirect_link = trusted_url!(@cur_page.redirect_link)
      body = render_to_string(html: "", layout: "cms/redirect")
    elsif mime.html? && @cur_page.layout
      body = render_layout(@cur_page.layout, content: body)
      body = render_to_string(html: body.html_safe, layout: request.xhr? ? false : "cms/page")
    end

    _set_rendered_content_type rendered_format
    self.response_body = body
  end
end
