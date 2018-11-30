class Cms::Apis::FormsController < ApplicationController
  include Cms::ApiFilter

  model Cms::Form

  def index
    @single = params[:single].present?
    @multi = !@single

    @items = @model.site(@cur_site).
      allow(:read, @cur_user, site: @cur_site).
      search(params[:s]).
      order_by(order: 1, name: 1).
      page(params[:page]).per(50)
  end

  def form
    @item = @model.site(@cur_site).find(params[:id])
    @target = Cms::Page.site(@cur_site).find(params[:item_id]).becomes_with_route if params[:item_id].present?
    render layout: false
  end

  def new_column
    @item = Cms::Form.site(@cur_site).find(params[:id])
    @cur_column = @item.columns.find(params[:column_id])
    render layout: false
  end

  def select_temp_file
    @item = Cms::TempFile.site(@cur_site).find(params[:id])
    render layout: false
  end
end
