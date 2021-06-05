module Cms::NodeFilter::View2
  extend ActiveSupport::Concern
  include SS::AgentFilter2
  include Cms::FeedFilter

  included do
    helper Cms::PublicHelper
    helper Map::MapHelper
    cattr_accessor :model_class
    before_action :set_model
  end

  module ClassMethods
    def model(cls)
      self.model_class = cls if cls
    end
  end

  private

  def set_model
    @model = self.class.model_class
  end

  def render_with_pagination(items)
    raise "404" if params[:page].to_i > 1 && items.empty?

    body = render_to_string

    if @cur_node.view_layout == "cms/redirect" && !mobile_path?
      @redirect_link = trusted_url!(@cur_node.redirect_link)
      body = render_to_string(html: "", layout: "cms/redirect")
    elsif @cur_node.layout
      html = render_layout(@cur_node.layout, content: body)
      layout = request.xhr? ? false : "cms/page"
      # render html: html.html_safe, layout: layout
      body = render_to_string(html: html.html_safe, layout: layout)
    end

    _set_rendered_content_type rendered_format
    self.response_body = body
  end
end
