class Sys::Test::Shot::PagesController < ApplicationController
  include Sys::BaseFilter
  include Sys::CrudFilter

  # menu_view "sys/test/menu"
  model Sys::Test::Shot::Page

  private

  def set_crumbs
    set_config
    @crumbs << ["Screenshot", sys_test_shots_path]
    @crumbs << [@config.config_name, sys_test_shot_path(id: @config)]
  end

  def set_config
    @config ||= Sys::Test::Shot::Config.find(params[:shot_id])
  end

  def set_items
    set_config
    @items ||= @config.pages
  end

  public

  def index
    raise "403" if !@config.allowed?(:read, @cur_user)
    set_items
    @items = @items.search(params[:s]).
      order_by(_id: -1).
      page(params[:page]).per(100)
  end

  def image
    set_item

    file = @item.image_path(width: params[:width].to_s.presence)
    if !::File.exists?(file)
      raise "404"
    end

    ss_send_file(file, status: :ok, type: Fs.content_type(file), disposition: :inline)
  end

  def slide_show
    raise "403" if !@config.allowed?(:read, @cur_user)
    set_items
    @items = @items.order_by(_id: -1)
    render layout: "ss/print"
  end
end
