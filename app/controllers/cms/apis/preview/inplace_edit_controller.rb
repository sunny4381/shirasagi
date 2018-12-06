class Cms::Apis::Preview::InplaceEditController < ApplicationController
  include Cms::BaseFilter
  include SS::CrudFilter

  before_action :set_type
  before_action :set_item

  layout false

  private

  def set_type
    @cur_type ||= begin
      type = params[:type].to_s
      raise "404" if !%w(page node).include?(type)

      type.to_sym
    end
  end

  def set_item
    if @cur_type == :page
      @item = Cms::Page.site(@cur_site).find(params[:id])
    elsif @cur_type == :node
      @item = Cms::Node.site(@cur_site).find(params[:id])
    end

    raise "404" if @item.blank?

    @item = @item.becomes_with_route rescue @item
    @model = @item.class
  end

  public

  def edit
    raise "403" if !@item.allowed?(:edit, @cur_user, site: @cur_site)

    if @cur_type == :node || !@item.respond_to?(:form) || !@item.form.sub_type_entry?
      head :no_content
      return
    end

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
