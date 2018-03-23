class Facility::Agents::Nodes::PageIndexingJob < Cms::ApplicationJob
  include Cms::NodeIndexingBaseJob

  private

  def convert_item_to_es_doc
    doc = {}
    doc[:url] = @cur_item.url
    doc[:name] = @cur_item.name
    doc[:html] = item_html

    doc[:cate_categories] = @cur_item.categories.pluck(:name) if @cur_item.respond_to?(:categories)
    doc[:cate_services] = @cur_item.services.pluck(:name) if @cur_item.respond_to?(:services)
    doc[:cate_locations] = @cur_item.locations.pluck(:name) if @cur_item.respond_to?(:locations)

    doc[:member_permissions] = item_member_permissions

    doc[:released] = @cur_item.released.try(:iso8601)
    doc[:updated] = @cur_item.updated.try(:iso8601)
    doc[:created] = @cur_item.created.try(:iso8601)

    [ index_item_id(@cur_item.id), doc ]
  end
end
