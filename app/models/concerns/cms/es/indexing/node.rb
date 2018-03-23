module Cms::Es::Indexing::Node
  extend ActiveSupport::Concern

  def elasticsearch_indexing_class
    class_name = "#{route.sub('/', '/agents/nodes/')}_indexing_job"
    class_name.classify.constantize
  rescue
    nil
  end

  def add_node_to_elasticsearch
    job_klass = elasticsearch_indexing_class
    return if !job_klass

    job = job_klass.bind(site_id: (@cur_site || site).id, node_id: id)
    job.perform_now(action: 'index', id: id)
  end

  def rename_node_in_elasticsearch(src, dst)
    job_klass = elasticsearch_indexing_class
    return if !job_klass

    job = job_klass.bind(site_id: (@cur_site || site).id, node_id: id)
    job.perform_later(action: 'rename', id: id, src: src, dst: dst)
  end

  def remove_node_from_elasticsearch
    job_klass = elasticsearch_indexing_class
    return if !job_klass

    job = job_klass.bind(site_id: (@cur_site || site).id, node_id: id)
    job.perform_later(action: 'remove', id: id, url: url)
  end
end
