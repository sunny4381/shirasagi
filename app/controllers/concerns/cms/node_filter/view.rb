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

  def render_with_pagination(items)
    raise "404" if params[:page].to_i > 1 && items.empty?

    save_items = @items
    @items = items
    body = render_to_string(file: "index")
    @items = save_items

    if @cur_node.view_layout == "cms/redirect" && !mobile_path?
      @redirect_link = trusted_url!(@cur_node.redirect_link)
      body = render_to_string(html: "", layout: "cms/redirect")
    elsif @cur_node.layout
      body = render_layout(@cur_node.layout, content: body)
      body = render_to_string(html: body.html_safe, layout: "cms/page")
    end

    _set_rendered_content_type rendered_format
    self.response_body = body
  end
end
