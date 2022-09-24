class Cms::V2::NodesController < ApplicationController
  include Cms::BaseFilter
  include Cms::CrudFilter

  model Cms::Node

  navi_view "cms/main/navi"

  helper_method :editable?

  PERMITTED_FIELDS = begin
    permitted_fields = %i[_id]
    # basic_info
    permitted_fields += %i[name index_name]
    # node_setting
    permitted_fields += %i[order]
    # cms/meta
    permitted_fields += %i[keywords description summary_html]
    # cms/node_list
    permitted_fields += %i[
      conditions limit new_days loop_liquid upper_html loop_html lower_html no_items_display_state substitute_html
    ]

    permitted_fields
  end.freeze

  private

  def editable?(field_name)
    PERMITTED_FIELDS.include?(field_name.to_sym)
  end

  public

  def update_all
    safe_params = params.require(:item).map do |item_params|
      item_params.permit(*PERMITTED_FIELDS)
    end
    safe_params = safe_params.index_by { |item_params| item_params[:_id] }

    reports = []
    all_ids = safe_params.keys
    nodes = Cms::Node.site(@cur_site).allow(:read, @cur_user).in(id: all_ids).to_a
    nodes.each do |node|
      item_params = safe_params[node.id]
      updated = false
      item_params.except(:_id).each do |field_name, value|
        setter = "#{field_name}="
        if node.respond_to?(setter)
          node.send(setter, value)
          updated = true
        end
      end

      unless updated
        reports << { _id: node.id, status: :not_modified, message: "there are no updates" }
        next
      end

      unless node.save
        reports << { _id: node.id, status: :bad_request, errors: node.errors.full_messages }
        next
      end

      reports << { _id: node.id, status: :ok, message: "successfully updated" }
    end

    render json: reports, content_type: json_content_type
  end

  def redirect
    safe_params = params.permit(:to, :mode)
    node = Cms::Node.site(@cur_site).find(safe_params[:to])
    raise "403" unless node.allowed?(:read, @cur_user, site: @cur_site)

    case params[:mode].to_sym
    when :open
      redirect_to node.respond_to?(:view_route) ? view_context.contents_path(node) : cms_node_path(id: node)
    when :conf
      parent = node.parent
      if parent
        redirect_to view_context.contents_path(parent) + "/#{node.id}"
      else
        redirect_to cms_node_path(id: node)
      end
    when :view_public
      redirect_to node.full_url
    when :pc_preview
      redirect_to cms_preview_path(path: node.preview_path)
    when :sp_preview
      redirect_to cms_preview_path(path: node.preview_path)
    when :mobile_preview
      raise "404" unless @cur_site.mobile_enabled?
      redirect_to cms_preview_path(path: node.mobile_preview_path)
    end
  end
end
