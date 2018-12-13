class Cms::Apis::Preview::InplaceEdit::ColumnsController < ApplicationController
  include Cms::ApiFilter

  model Cms::Column::Value::Base

  layout "ss/ajax_in_iframe"

  before_action :set_inplace_mode
  before_action :set_page
  before_action :set_item

  private

  def set_inplace_mode
    @inplace_mode = true
  end

  def set_page
    @cur_page = Cms::Page.site(@cur_site).find(params[:page_id]).becomes_with_route
    raise "404" if !@cur_page.respond_to?(:form) || !@cur_page.respond_to?(:column_values)
  end

  def set_item
    @item = @cur_page.column_values.find(params[:id])
    @model = @item.class

    @cur_column = @item.column
    raise "404" if @cur_column.blank?
  end

  public

  def edit
    raise "403" if !@cur_page.allowed?(:edit, @cur_user, site: @cur_site)

    @preview = true
    render action: :edit
  end

  def update
    @item.attributes = get_params
    @item.in_updated = params[:_updated] if @item.respond_to?(:in_updated)
    raise "403" unless @item.allowed?(:edit, @cur_user, site: @cur_site)

    if @item.state == "public"
      raise "403" unless @item.allowed?(:release, @cur_user, site: @cur_site, node: @cur_node)
      @item.state = "ready" if @item.try(:release_date).present?
    end

    result = @item.update
    location = { action: :edit }
    if result
      flash["ss.inplace_edit.notice"] = t("ss.notice.saved")
      if @item.try(:branch?) && @item.state == "public"
        location = { action: :index }
        @item.delete
      end
    end
    render_update result, location: location
  end
end
