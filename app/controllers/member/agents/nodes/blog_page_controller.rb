class Member::Agents::Nodes::BlogPageController < ApplicationController
  include Cms::NodeFilter::View

  model Member::BlogPage
  helper Cms::ListHelper
  helper Member::BlogPageHelper
  after_action :render_blog_layout

  private
    def pages
      @model.site(@cur_site).node(@cur_node).and_public
    end

    def render_blog_layout
      return if response.content_type != "text/html"

      node = @cur_node.becomes_with_route
      response.body = response.body.gsub(/\#\{(.+?)\}/) do |m|
        name = $1
        view_context.render_blog_template(name, node: node) || m
      end
    end

  public
    def index
      @items = pages.
        search(params).
        order_by(released: -1).
        page(params[:page]).per(@cur_node.parent.becomes_with_route.page_limit || 3)
    end

    def rss
      @pages = pages.
        order_by(released: -1).
        limit(100)

      render_rss @cur_node, @pages
    end
end
