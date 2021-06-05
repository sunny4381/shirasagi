module Cms::PageFilter::View2
  extend ActiveSupport::Concern
  include SS::AgentFilter2

  included do
    helper Gravatar::GravatarHelper
    helper Map::MapHelper
  end

  def index
    body = render_to_string

    if @cur_page.view_layout == "cms/redirect" && !mobile_path?
      @redirect_link = trusted_url!(@cur_page.redirect_link)
      body = render_to_string(html: "", layout: "cms/redirect")
    elsif @cur_page.layout
      html = render_layout(@cur_page.layout, content: body)
      layout = request.xhr? ? false : "cms/page"
      # render html: html.html_safe, layout: layout
      body = render_to_string(html: html.html_safe, layout: layout)
    end

    _set_rendered_content_type rendered_format
    self.response_body = body
  end
end
