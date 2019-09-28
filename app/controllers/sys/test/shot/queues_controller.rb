class Sys::Test::Shot::QueuesController < ApplicationController
  include Sys::BaseFilter
  include Sys::CrudFilter

  # menu_view "sys/test/menu"
  model Sys::Test::Shot::Queue

  private

  def set_crumbs
    set_config
    @crumbs << ["Screenshot", sys_test_shots_path]
  end

  def set_config
    @config ||= Sys::Test::Shot::Config.find(params[:shot_id])
  end

  def set_items
    set_config
    @items ||= @config.queues
  end

  public

  def index
    raise "403" if !@config.allowed?(:read, @cur_user)
    set_items
    @items = @items.search(params[:s]).
      order_by(_id: -1).
      page(params[:page]).per(100)
  end

  def delete
    raise "403" unless @config.allowed?(:delete, @cur_user)
    render
  end

  def destroy
    raise "403" unless @config.allowed?(:delete, @cur_user)
    render_destroy @item.destroy
  end

  def destroy_all
    raise "400" if @selected_items.blank?

    entries = @selected_items.entries
    @items = []

    entries.each do |item|
      if @config.allowed?(:delete, @cur_user, site: @cur_site)
        next if item.destroy
      else
        item.errors.add :base, :auth_error
      end
      @items << item
    end
    render_destroy_all(entries.size != @items.size)
  end
end
