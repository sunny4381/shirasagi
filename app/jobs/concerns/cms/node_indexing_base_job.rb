module Cms::NodeIndexingBaseJob
  extend ActiveSupport::Concern
  include Cms::IndexingBaseJob

  class RenderingError < StandardError; end

  private

  def base_criteria
    Cms::Node.site(site)
  end

  def index_item_id(id)
    "node-#{id}"
  end

  def index_file_id(id)
    "file-#{id}"
  end

  def item_html
    # get html via rack interface
    env = new_rack_env
    status, headers, body = Rails.application.call(env)
    if status != 200
      raise RenderingError.new, "got #{status}"
    end

    # we can get html via `ss.undecorated_body` if special flag `ss.filters` contains `indexing`
    env['ss.undecorated_body']
  ensure
    body.close if body.respond_to?(:close)
  end

  def new_rack_env
    {
      'rack.input' => StringIO.new,
      'REQUEST_METHOD' => 'GET',
      'HTTP_HOST' => site.domain,
      'REQUEST_URL' => @cur_item.full_url,
      'REQUEST_PATH' => @cur_item.url,
      'PATH_INFO' => @cur_item.url,
      'QUERY_STRING' => '',
      'REMOTE_ADDR' => '127.0.0.1',
      'REMOTE_HOST' => '127.0.0.1',
      'ss.filters' => [ :indexing ],
    }
  end
end
