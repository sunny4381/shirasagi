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

  def inherit_variables
    super

    return if @cur_node.blank?

    @cur_path ||= @cur_node.url.sub(/\/?$/, "/index.html")
    @cur_main_path ||= begin
      if @cur_site.subdir.present?
        @cur_path.sub(/^\/#{@cur_site.subdir}/, "")
      else
        @cur_path.dup
      end
    end
  end

  def set_model
    @model = self.class.model_class
  end

  def render_layout_with_pagination_cache(layout, cache_key, content: nil)
    @layout_cache ||= {}

    # no cache
    if cache_key.nil?
      html = render_layout(layout, content: content)
      html = render_to_string(html: html.html_safe, layout: request.xhr? ? false : "cms/page")
      return html
    end

    # use cache
    if @layout_cache[cache_key].blank?
      # set cache
      html = render_layout(layout, content: "<!-- layout_yield --><!-- /layout_yield -->")
      html = render_to_string(html: html.html_safe, layout: request.xhr? ? false : "cms/page")
      @layout_cache[cache_key] = html
    end

    html = @layout_cache[cache_key]
    html = html.sub("<!-- layout_yield --><!-- /layout_yield -->", content || response.body)
    html
  end

  def _render_with_pagination(items)
    @items = items
    body = render_to_string(file: "index")
    @items = nil

    if @cur_node.view_layout == "cms/redirect" && !mobile_path?
      @redirect_link = trusted_url!(@cur_node.redirect_link)
      body = render_to_string(html: "", layout: "cms/redirect")
    elsif @cur_node.layout
      body = render_layout_with_pagination_cache(@cur_node.layout, @cur_node.filename, content: body)
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
