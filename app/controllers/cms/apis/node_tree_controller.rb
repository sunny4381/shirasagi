class Cms::Apis::NodeTreeController < ApplicationController
  include Cms::BaseFilter
  include Cms::NodeHelper

  model Cms::Node

  def index
    @limit = 100
    @type = params[:type].presence || 'cms_nodes'
    @item = @model.find(params[:id]) if params[:id] != '0'

    set_child_count

    if params[:only_children]
      items = child_items if @item
    else
      items = root_items
      items += @item.parents.entries + [@item] if @item
      items += tree_items + child_items if @item
    end

    render json: { items: items_hash(items) }.to_json
  end

  private

  def root_items
    if params[:root_items]
      ids = params[:root_items].to_a.map(&:to_i) rescue []
      @model.in(id: ids).site(@cur_site).
        allow(:read, @cur_user, site: @cur_site).limit(@limit)
    else
      @model.site(@cur_site).where(depth: 1).
        allow(:read, @cur_user, site: @cur_site).limit(@limit)
    end
  end

  def tree_items
    @item.parents.map do |item|
      next unless item.allowed?(:read, @cur_user, site: @cur_site)
      item.children.allow(:read, @cur_user, site: @cur_site).limit(@limit)
    end.flatten.compact
  end

  def child_items
    @item.children.allow(:read, @cur_user, site: @cur_site).limit(@limit)
  end

  def set_child_count
    @child_count = Hash.new(0)
    items = @model.site(@cur_site).allow(:read, @cur_user, site: @cur_site)
    items.pluck(:filename, :depth).each do |filename, depth|
      next if depth == 1
      parts = filename.split("/")
      child = parts.pop
      parent = parts.join("/")
      @child_count[parent] ||= 0
      @child_count[parent] += 1
    end
  end

  def items_hash(items)
    items = items.map do |item|
      {
        id: item.id,
        name: item.name,
        filename: item.filename,
        depth: item.depth,
        url: item_url(item),
        tree_url: cms_apis_node_tree_path(id: item.id, type: @type),
        is_current: (@item.present? && item.id == @item.id),
        is_parent: (@item.present? && @item.filename.start_with?("#{item.filename}\/")),
        child_count: @child_count[item.filename]
      }
    end
    items.compact.uniq.sort{ |a, b| a[:filename].tr('/', "\0") <=> b[:filename].tr('/', "\0") }
  end

  def item_url(item)
    return node_pages_path(cid: item.id) if @type == 'cms/page'
    return node_parts_path(cid: item.id) if @type == 'cms/part'
    return node_layouts_path(cid: item.id) if @type == 'cms/layout'
    item.respond_to?(:view_route) ? contents_path(item) : cms_node_nodes_path(cid: item.id)
  end
end
