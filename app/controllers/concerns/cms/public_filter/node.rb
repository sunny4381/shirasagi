module Cms::PublicFilter::Node
  extend ActiveSupport::Concern
  include Cms::PublicFilter::Layout

  private

  def init_context
    # self.params   = ActionController::Parameters.new
    # self.request  = ActionDispatch::Request.new("rack.input" => "", "REQUEST_METHOD" => "GET")
    # self.response = ActionDispatch::Response.new

    @site.reload if @site.changed?
    @node.reload if @node.changed?
  end

  public

  def generate_node(node, opts = {})
    begin
      @exists = true
      html = Cms::Agent.render_node(self, node, opts)
    rescue StandardError => e
      @exists = false
      return if e.to_s == "404"
      return if e.is_a? Mongoid::Errors::DocumentNotFound
      raise e
    end

    file = opts[:file] || "#{node.path}/index.html"
    Fs.write_if_modified(file, html)
  end

  def generate_node_with_pagination(node, opts = {})
    if generate_node(node, cache: node.filename)
      @task.log "#{node.url}index.html" if @task
    end

    max = opts[:max] || 9999
    num = max

    2.upto(max) do |i|
      file = "#{node.path}/index.p#{i}.html"

      if generate_node(node, file: file, params: { page: i }, cache: node.filename)
        @task.log "#{node.url}index.p#{i}.html" if @task
      end

      if !@exists
        num = i
        break
      end
    end

    num.upto(max) do |i|
      file = "#{node.path}/index.p#{i}.html"
      break unless Fs.exists?(file)
      Fs.rm_rf file
    end
  end
end
