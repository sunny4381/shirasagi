module Cms::NodeFilter::View
  extend ActiveSupport::Concern
  include Cms::AgentFilter
  include Cms::PublicFilter::Layout
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

  def _render_with_pagination(items)
    save_items = @items
    @items = items
    body = render_to_string(file: "index")
    mime = rendered_format
    @items = save_items

    if @cur_node.view_layout == "cms/redirect" && !mobile_path?
      @redirect_link = trusted_url!(@cur_node.redirect_link)
      body = render_to_string(html: "", layout: "cms/redirect")
    elsif mime.html? && @cur_node.layout
      @last_rendered_layout = nil if @last_rendered_node_filename != @cur_node.filename
      @last_rendered_layout ||= begin
        rendered_layout = render_layout(@cur_node.layout, content: "<!-- layout_yield --><!-- /layout_yield -->")
        rendered_layout = render_to_string(html: rendered_layout.html_safe, layout: request.xhr? ? false : "cms/page")
        @last_rendered_node_filename = @cur_node.filename
        rendered_layout
      end

      body = @last_rendered_layout.sub("<!-- layout_yield --><!-- /layout_yield -->", body)
    end

    body
  end

  def render_with_pagination(items)
    raise "404" if params[:page].to_i > 1 && items.empty?

    body = _render_with_pagination(items)

    _set_rendered_content_type rendered_format
    self.response_body = body
  end
end
