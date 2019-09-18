class Sys::Test::Shot::ImagesController < ApplicationController
  include Sys::BaseFilter
  include Sys::CrudFilter

  # menu_view "sys/test/menu"
  model Sys::Test::Shot::Image

  private

  def set_crumbs
    @crumbs << ["Screenshot", sys_test_shots_path]
  end

  def set_config
    @config ||= Sys::Screenshot::Config.find(params[:screenshot_id])
  end

  def set_items
    set_config
    @items ||= @config.images
  end
end
