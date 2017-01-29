class Cms::Agents::Parts::LiquidController < ApplicationController
  include Cms::PartFilter::View
  helper Cms::Rendering

  def index
    if @cur_part.liquid?
      @cur_item = @cur_part
      render inline: '', layout: 'cms/liquid', locals: { layout: @cur_part }
    else
      render html: @cur_part.html.html_safe
    end
  end
end
