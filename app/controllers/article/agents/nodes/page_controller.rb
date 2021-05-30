class Article::Agents::Nodes::PageController < ApplicationController
  include Cms::NodeFilter::View
  include Cms::ForMemberFilter::Node
  helper Cms::ListHelper

  before_action :accept_cors_request, only: [:rss]

  def pages
    Article::Page.public_list(site: @cur_site, node: @cur_node, date: @cur_date)
  end

  def index
    @items = pages.
      order_by(@cur_node.sort_hash).
      page(params[:page]).
      per(@cur_node.limit)

    # render_with_pagination @items
    raise "404" if params[:page].to_i > 1 && items.empty?

    template = SS::Template.compile(@cur_node, target: :page)
    renderer = template.renderer_for(view_context.liquid_registers, { "pages" => @items.to_a.map(&:becomes_with_route) })
    self.response_body = renderer.render_in(self.view_context)
    self.content_type = "text/html"
  end

  def rss
    @items = pages.
      order_by(released: -1).
      limit(@cur_node.limit)

    render_rss @cur_node, @items
  end
end
