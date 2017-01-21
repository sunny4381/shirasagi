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

  private
    def init_cur_layout
      @cur_layout = @cur_page.layout
      if @cur_layout.present?
        @cur_layout.keywords    = @cur_page.keywords if @cur_page.respond_to?(:keywords)
        @cur_layout.description = @cur_page.description if @cur_page.respond_to?(:description)
      end
    end
end
