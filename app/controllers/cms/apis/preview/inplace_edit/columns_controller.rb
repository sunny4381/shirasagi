class Cms::Apis::Preview::InplaceEdit::ColumnsController < ApplicationController
  include Cms::ApiFilter

  model Cms::Column::Value::Base

  layout "ss/ajax_in_iframe"

  before_action :set_inplace_mode
  before_action :set_item

  private

  def set_inplace_mode
    @inplace_mode = true
  end

  def set_item
    @item = @cur_page = Cms::Page.site(@cur_site).find(params[:page_id]).becomes_with_route
    raise "404" if !@item.respond_to?(:form) || !@item.respond_to?(:column_values)

    @model = @item.class

    @cur_column_value = @item.column_values.find(params[:id])

    @cur_column = @cur_column_value.column
    raise "404" if @cur_column.blank?
  end

  public

  def edit
    raise "403" if !@item.allowed?(:edit, @cur_user, site: @cur_site)
    if @item.state == "public"
      raise "403" if !@item.allowed?(:release, @cur_user, site: @cur_site)
    end

    @preview = true
    render action: :edit
  end

  def update
    column_value_param = params.require(:item).require(:column_values).first
    @cur_column_value.attributes = column_value_param.require(:in_wrap).permit(@cur_column_value.class.permit_values)
    @item.attributes = fix_params
    @item.in_updated = params[:_updated] if @item.respond_to?(:in_updated)
    raise "403" unless @item.allowed?(:edit, @cur_user, site: @cur_site)
    if @item.state == "public"
      raise "403" unless @item.allowed?(:release, @cur_user, site: @cur_site, node: @cur_node)
      @item.state = "ready" if @item.try(:release_date).present?
    end

    if params.key?(:save_if_no_alerts)
      result = @item.valid?(%i[update accessibility link])
      if result
        result = @item.save
      end
    else
      result = @item.save
    end

    location = { action: :edit }
    if result
      flash["ss.inplace_edit.notice"] = t("ss.notice.saved")
      if @item.try(:branch?) && @item.state == "public"
        location = { action: :index }
        @item.delete
      end
    end
    render_update result, location: location, render: { file: :edit, status: :unprocessable_entity }
  end
end
