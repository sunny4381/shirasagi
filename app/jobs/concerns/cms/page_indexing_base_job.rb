module Cms::PageIndexingBaseJob
  extend ActiveSupport::Concern
  include Cms::IndexingBaseJob

  private

  def base_criteria
    criteria = Cms::Page.site(site)
    criteria = criteria.node(node) if node.present?
    criteria
  end

  def index_item_id(id)
    "page-#{id}"
  end

  def index_file_id(id)
    "file-#{id}"
  end
end
