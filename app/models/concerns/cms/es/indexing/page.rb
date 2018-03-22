module Cms::Es::Indexing::Page
  extend ActiveSupport::Concern

  def elasticsearch_indexing_class
    class_name = "#{route.sub('/', '/agents/pages/')}_indexing_job"
    class_name.classify.constantize
  rescue
    nil
  end

  def add_page_to_elasticsearch
    # fila was created or updated after generating page
    adds = @generate_page_result

    # dynamic page. this type of pages is indexing always
    adds = !serve_static_file? if !@generate_page_result

    return if !adds

    job_klass = elasticsearch_indexing_class
    return if !job_klass

    job = job_klass.bind(site_id: (@cur_site || site).id, node_id: parent.try(:id))
    job.perform_later(action: 'index', id: id)
  end

  def rename_page_in_elasticsearch(src, dst)
    job_klass = elasticsearch_indexing_class
    return if !job_klass

    job = job_klass.bind(site_id: (@cur_site || site).id, node_id: parent.try(:id))
    job.perform_later(action: 'rename', id: id, src: src, dst: dst)
  end

  def remove_page_from_elasticsearch
    job_klass = elasticsearch_indexing_class
    return if !job_klass

    job = job_klass.bind(site_id: (@cur_site || site).id, node_id: parent.try(:id))
    job.perform_later(action: 'remove', id: id, url: url)
  end
end
