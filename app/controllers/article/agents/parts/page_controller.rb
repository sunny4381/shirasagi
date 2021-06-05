class Article::Agents::Parts::PageController < ApplicationController
  include Cms::PartFilter::View2
  helper Cms::ListHelper

  def index
    @items = Article::Page.public_list(site: @cur_site, part: @cur_part, date: @cur_date, request_dir: @cur_main_path).
      order_by(@cur_part.sort_hash).
      limit(@cur_part.limit)
  end
end
