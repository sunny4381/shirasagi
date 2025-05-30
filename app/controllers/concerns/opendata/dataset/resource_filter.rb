module Opendata::Dataset::ResourceFilter
  extend ActiveSupport::Concern

  included do
    before_action :accept_cors_request
    before_action :set_dataset
    before_action :deny
    append_view_path "app/views/opendata/agents/nodes/dataset/resource"
  end

  private

  def set_dataset
    @dataset_path = @cur_main_path.sub(/#{::Regexp.escape(@model.context_path)}\/.*/, ".html")
    @dataset = Opendata::Dataset.site(@cur_site).filename(@dataset_path)
    @dataset = preview_path? ? @dataset.first : @dataset.and_public.first

    raise "404" unless @dataset
  end

  def deny
    return if @dataset.public?

    user = get_user_by_session
    raise "404" unless user

    set_last_logged_in
  end

  def set_last_modified
    response.headers["Last-Modified"] = CGI::rfc1123_date(@dataset.updated.in_time_zone)
  end

  def download_resource
    if !preview_path?
      @item.dataset.inc downloaded: 1
      @item.create_download_history(remote_addr, request.user_agent, Time.zone.now) if @item.is_a?(Opendata::Resource)
    end
    @cur_node.layout_id = nil

    response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"

    send_file @item.file.path, type: @item.content_type, filename: @item.filename,
              disposition: :attachment, x_sendfile: true
  end

  def download_source_url
    if !preview_path?
      @item.dataset.inc downloaded: 1
      @item.create_download_history(remote_addr, request.user_agent, Time.zone.now) if @item.is_a?(Opendata::Resource)
    end

    redirect_to @item.source_url
  end

  def tsv_content
    @data = @item.parse_tsv
    @map_markers = @item.extract_map_points(@data)

    if @data.blank?
      raise "404"
    elsif @item.preview_graph_enabled?
      graph_content
    elsif @map_markers.present?
      render template: "map_content"
    else
      render template: "content", layout: 'cms/ajax'
    end
  end

  def xls_content
    @sheets, @data = @item.parse_xls(params[:page])
    @map_markers = @item.extract_map_points(@data)

    if @data.blank?
      raise "404"
    elsif @map_markers.present?
      render template: "map_content", layout: 'cms/ajax'
    else
      render template: "content", layout: 'cms/ajax'
    end
  end

  def kml_content
    render template: "kml_content", layout: 'cms/ajax'
  end

  def geojson_content
    render template: "geojson_content", layout: 'cms/ajax'
  end

  def pdf_content
    @limit = SS.config.opendata.preview["pdf"]["page_limit"]
    @images = @item.extract_pdf_base64_images(@limit)

    if @images.blank?
      raise "404"
    else
      render template: "pdf_content", layout: 'cms/ajax'
    end
  end

  def image_content
    render "image_content", layout: 'cms/ajax'
  end

  def graph_content
    if @item.preview_graph_types.include?(params[:type])
      @type = params[:type]
    else
      @type = @item.preview_graph_types.first
    end

    if @item.format != "CSV"
      raise "404"
    else
      render "graph/#{@type}_content", layout: 'cms/ajax'
    end
  end

  def pie_graph_content
    render "graph/pie_content", layout: 'cms/ajax'
  end

  public

  def index
    redirect_to @dataset_path
  end

  def download
    set_item
    raise "404" unless @item

    if @item.source_url.present?
      download_source_url
    else
      raise "404" if @item.filename != params[:filename].force_encoding("utf-8")
      download_resource
    end
  end

  def content
    @cur_node.layout_id = nil

    set_item
    if @item.is_a?(Opendata::Resource) && !preview_path?
      @item.create_preview_history(remote_addr, request.user_agent, Time.zone.now)
    end

    raise "no referer" if request.referer.blank?
    raise "detected bot" if browser.bot?

    Timeout.timeout(20) do
      if @item.tsv_present?
        tsv_content
      elsif @item.xls_present?
        xls_content
      elsif @item.kml_present?
        kml_content
      elsif @item.geojson_present?
        geojson_content
      elsif @item.pdf_present?
        pdf_content
      elsif @item.image_present?
        image_content
      else
        raise "no content"
      end
    end
  rescue Timeout::Error => e
    @error_message = I18n.t("opendata.errors.messages.resource_preview_timeout")
    Rails.logger.error("#{e.class} (#{e.message}): #{request.path} #{@error_message}")
    render template: "error_content", layout: 'cms/ajax', status: :not_found
  rescue => e
    @error_message = I18n.t("opendata.errors.messages.resource_preview_failed")
    Rails.logger.error("#{e.class} (#{e.message}): #{request.path} #{@error_message}")
    render template: "error_content", layout: 'cms/ajax', status: :not_found
  end
end
