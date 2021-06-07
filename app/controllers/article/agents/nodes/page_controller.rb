class Article::Agents::Nodes::PageController < ApplicationController
  include Cms::NodeFilter::View
  include Cms::ForMemberFilter::Node
  helper Cms::ListHelper

  before_action :accept_cors_request, only: [:rss]

  private

  def pages
    Article::Page.public_list(site: @cur_site, node: @cur_node, date: @cur_date)
  end

  def index_page_exists?
    path = "#{@cur_node.filename}/index.html"
    Cms::Page.site(@cur_site).and_public.filename(path).present?
  end

  def cleanup_index_files(start_index)
    start_index.upto(9_999) do |page_index|
      basename = "index.p#{page_index + 1}.html"
      file = "#{@cur_node.path}/#{basename}"
      break unless Fs.exists?(file)
      Fs.rm_rf file
    end
  end

  public

  def index
    @items = pages.
      order_by(@cur_node.sort_hash).
      page(params[:page]).
      per(@cur_node.limit)

    render_with_pagination @items
  end

  def rss
    @items = pages.
      order_by(@cur_node.sort_hash).
      limit(@cur_node.limit)

    render_rss @cur_node, @items
  end

  def generate
    if index_page_exists? || !@cur_node.serve_static_file?
      cleanup_index_files(1)
      return true
    end

    next_page_index = 0
    all_pages = pages.order_by(@cur_node.sort_hash).to_a
    all_pages.each_slice(@cur_node.limit).each_with_index do |pages, page_index|
      pages = Kaminari.paginate_array(pages, limit: @cur_node.limit, offset: page_index * @cur_node.limit, total_count: all_pages.length)
      html = _render_with_pagination(pages)

      if page_index == 0
        basename = "index.html"
      else
        basename = "index.p#{page_index + 1}.html"
      end

      if Fs.write_if_modified("#{@cur_node.path}/#{basename}", html)
        @task.log "#{@cur_node.url}#{basename}" if @task
      end

      if page_index == 0
        basename = "rss.xml"
        rss = _render_rss(@cur_node, pages)
        if Fs.write_if_modified("#{@cur_node.path}/#{basename}", rss.to_xml)
          @task.log "#{@cur_node.url}#{basename}" if @task
        end
      end

      next_page_index = page_index + 1
    end

    if next_page_index == 0
      # generate empty page because no pages are generated
      html = _render_with_pagination([])
      basename = "index.html"
      if Fs.write_if_modified("#{@cur_node.path}/#{basename}", html)
        @task.log "#{@cur_node.url}#{basename}" if @task
      end

      basename = "rss.xml"
      rss = _render_rss(@cur_node, [])
      if Fs.write_if_modified("#{@cur_node.path}/#{basename}", rss.to_xml)
        @task.log "#{@cur_node.url}#{basename}" if @task
      end

      next_page_index = 1
    end

    cleanup_index_files(next_page_index)
    true
  ensure
    head :no_content
  end
end
