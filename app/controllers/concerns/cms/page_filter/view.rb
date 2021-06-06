module Cms::PageFilter::View
  extend ActiveSupport::Concern
  include Cms::AgentFilter

  included do
    helper Gravatar::GravatarHelper
    helper Map::MapHelper
  end

  def index
    render
  end
end
