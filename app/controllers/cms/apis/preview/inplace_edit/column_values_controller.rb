class Cms::Apis::Preview::InplaceEdit::ColumnValuesController < ApplicationController
  include Cms::ApiFilter

  model Cms::Column::Value::Base

  layout "ss/ajax_in_iframe"

  before_action :set_inplace_mode
  before_action :set_item
  before_action :set_column, only: %i[new]
  before_action :set_column_and_value, only: %i[edit update]

  private

  def set_inplace_mode
    @inplace_mode = true
  end

  def set_item
    @item = @cur_page = Cms::Page.site(@cur_site).find(params[:page_id]).becomes_with_route
    raise "404" if !@item.respond_to?(:form) || !@item.respond_to?(:column_values)

    @model = @item.class
  end

  def set_column
    @cur_column = @item.form.columns.find(params[:column_id].to_s)
  end

  def set_column_and_value
    @cur_column_value = @item.column_values.find(params[:id])

    @cur_column = @cur_column_value.column
    raise "404" if @cur_column.blank?
  end

  public

  def new
    raise "403" if !@item.allowed?(:edit, @cur_user, site: @cur_site)
    if @item.state == "public"
      raise "403" if !@item.allowed?(:release, @cur_user, site: @cur_site)
    end

    @preview = true
    render action: :new
  end

  def create
    @item.attributes = fix_params
    @item.in_updated = params[:_updated] if @item.respond_to?(:in_updated)
    raise "403" if !@item.allowed?(:edit, @cur_user, site: @cur_site)
    if @item.state == "public"
      raise "403" if !@item.allowed?(:release, @cur_user, site: @cur_site)
    end

    @preview = true

    safe_params = params.require(:item).permit(@model.permit_params)
    column_value_param = safe_params[:column_values].first
    column_value_param[:order] = @item.column_values.present? ? @item.column_values.max(:order) + 1 : 0
    @cur_column_value = @item.column_values.build(column_value_param)
    @cur_column = @cur_column_value.column

    if params.key?(:save_if_no_alerts)
      result = @item.valid?(%i[update accessibility link])
      if result
        result = @item.save
      end
    else
      result = @item.save
    end

    location = { action: :edit, id: @cur_column_value }
    if result
      flash["ss.inplace_edit.notice"] = t("ss.notice.saved")
      if @item.try(:branch?) && @item.state == "public"
        location = { action: :index }
        @item.delete
      end
    end
    render_create result, location: location, render: { file: :new, status: :unprocessable_entity }
  end

  def edit
    raise "403" if !@item.allowed?(:edit, @cur_user, site: @cur_site)
    if @item.state == "public"
      raise "403" if !@item.allowed?(:release, @cur_user, site: @cur_site)
    end

    @preview = true
    render action: :edit
  end

  def update
    safe_params = params.require(:item).permit(@model.permit_params)
    column_value_param = safe_params[:column_values].first
    @cur_column_value.attributes = column_value_param[:in_wrap]
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
