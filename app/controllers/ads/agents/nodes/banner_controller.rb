class Ads::Agents::Nodes::BannerController < ApplicationController
  include Cms::NodeFilter::View

  def index
    head :ok
  end
end
