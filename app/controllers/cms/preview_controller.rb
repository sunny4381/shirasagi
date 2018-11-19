class Cms::PreviewController < ApplicationController
  include Cms::BaseFilter

  before_action :set_controller
  before_action :set_preview_date
  before_action :set_cur_path, only: %i[index]
  before_action :set_form_data, only: %i[form_preview]
  before_action :render_contents

  private

  def set_controller
    @controller = Cms::PublicController
  end

  def set_preview_date
    @cur_date = params[:preview_date].present? ? params[:preview_date].in_time_zone : Time.zone.now
  end

  def set_cur_path
    @cur_path ||= request_path
    @cur_path.sub!(/^#{cms_preview_path}(\d+)?/, "")
    @cur_path = "index.html" if @cur_path.blank?
    @cur_path = URI.decode(@cur_path)
  end

  def set_form_data
    path = params[:path]
    preview_item = params.require(:preview_item).permit!
    id = preview_item[:id]
    route = preview_item[:route]

    page = Cms::Page.site(@cur_site).find(id) rescue Cms::Page.new(route: route)
    page = page.becomes_with_route
    page.attributes = preview_item.select { |k, v| k != "id" }
    page.site = @cur_site
    page.lock_owner_id = nil if page.respond_to?(:lock_owner_id)
    page.lock_until = nil if page.respond_to?(:lock_until)

    raise page_not_found unless page.name.present?
    raise page_not_found unless page.basename.present?
    page.basename = page.basename.sub(/\..+?$/, "") + ".html"

    @cur_layout = Cms::Layout.site(@cur_site).where(id: page.layout_id).first
    @cur_body_layout = Cms::BodyLayout.site(@cur_site).where(id: page.body_layout_id).first
    page.layout_id = nil if @cur_layout.nil?
    page.body_layout_id = nil if @cur_body_layout.nil?
    @cur_node = Cms::Node.site(@cur_site).where(filename: /^#{path.sub(/\/$/, "")}/).first
    @cur_page = page
    @preview_page = page
    @preview_item = preview_item
  end

  def render_contents
    opts = { user: @cur_user, date: @cur_date }
    opts[:node] = @cur_node if @cur_node
    opts[:page] = @cur_page if @cur_page

    @contents_env = {}
    request.env.keys.each do |key|
      if !key.include?(".") || key.start_with?("rack.") || key.start_with?("ss.")
        @contents_env[key] = request.env[key]
      end
    end
    @contents_env["HTTP_X_FORWARDED_HOST"] = @cur_site.domain
    @contents_env["REQUEST_URI"] = "#{@cur_site.full_url}#{@cur_path[1..-1]}"
    @contents_env["PATH_INFO"] = @cur_path
    @contents_env["REQUEST_PATH"] = @cur_path
    @contents_env["QUERY_STRING"]
    @contents_env["ORIGINAL_FULLPATH"]
    @contents_env["ss.filters"] ||= []
    @contents_env["ss.filters"] << { preview: opts }

    req = ActionDispatch::Request.new @contents_env
    res = @controller.make_response! req

    @contents_status, @contents_headers, @contents_body = @controller.dispatch("index", req, res)
  end

  def convert_html_to_preview(body, options)
    preview_url = cms_preview_path preview_date: params[:preview_date]

    body.gsub!(/(href|src)=".*?"/) do |m|
      url = m.match(/.*?="(.*?)"/)[1]
      if url =~ /^\/(assets|assets-dev)\//
        m
      elsif url =~ /^\/(?!\/)/
        m.sub(/="/, "=\"#{preview_url}")
      else
        m
      end
    end

    body.sub!("</body>", preview_template_html(options) + "</body>")
    body
  end

  def preview_template_html(options)
    h = []
    h << view_context.stylesheet_link_tag("cms/preview")
    h << view_context.javascript_include_tag("cms/public") if options[:mobile]
    h << view_context.javascript_include_tag("cms/preview")
    h << '<link href="/assets/css/colorbox/colorbox.css" rel="stylesheet" />'
    h << '<script src="/assets/js/jquery.colorbox.js"></script>'
    h << '<script>'
    h << '$(function(){'
    if @cur_site.subdir.present?
      h << '  SS_Preview.preview_path = "' + "/#{@cur_site.subdir}" + '";'
    end
    h << '  SS_Preview.mobile_path = "' + @cur_site.mobile_path + '";'
    if @preview_page
      h << 'SS_Preview.request_path = "' + request.path + '";'
      h << 'SS_Preview.form_item = ' + @preview_item.to_json + ';'
    end
    h << '  SS_Preview.render();'
    h << '});'
    h << '</script>'
    h << '<div id="ss-preview">'
    h << '<div class="d-inline-block">'
    h << '<input type="text" class="date" value="' + @cur_date.strftime("%Y/%m/%d %H:%M") + '" />'
    if @cur_site.mobile_enabled?
      h << '<input type="button" class="preview" value="' + t("ss.links.pc") + '">'
      h << '<input type="button" class="mobile" value="' + t("ss.links.mobile") + '">'
    else
      h << '<input type="button" class="preview" value="' + t("cms.preview_page") + '">'
    end
    h << '</div>'
    h << '<div class="inline-block">'
    if @parts.present? && Cms::Part.allowed?(:read, @cur_user, site: @cur_site, node: @cur_node)
      h << '<input type="button" class="part" value="' + t('cms.show_link_to_part') + '" />'
      h << '<select id="preview_part" name="preview[part]">'
      h << "<option value=''>#{t('cms.part')}</option>"
      @parts.each_value do |part|
        next if part.blank?
        h << "<option value='#{cms_part_path(site: @cur_site, id: part.id)}'>#{part.name}</option>"
      end
      h << '</select>'
      h << '<input type="button" class="preview-part-button preview-hide" value="' + t('cms.part') + '">'
    end
    if @cur_layout && Cms::Layout.allowed?(:read, @cur_user, site: @cur_site, node: @cur_node)
      layout_path = cms_layout_path(site: @cur_site, id: @cur_layout.id)
      h << "<input type='button' onclick='window.open(\"#{layout_path}\")' value='#{t('cms.layout')}'>"
    end
    if @cur_node && Cms::Node.allowed?(:read, @cur_user, site: @cur_site, node: @cur_node)
      node_path = cms_node_path(site: @cur_site, id: @cur_node.id)
      h << "<input type='button' onclick='window.open(\"#{node_path}\")' value='#{t('cms.node')}'>"
    end
    if @cur_page && Cms::Page.allowed?(:read, @cur_user, site: @cur_site, node: @cur_node)
      page_path = cms_page_path(site: @cur_site, id: @cur_page.id)
      h << "<input type='button' onclick='window.open(\"#{page_path}\")' value='#{Cms::Page.model_name.human}'>"
    end
    h << '</div>'
    h << '</div>'

    h.join("\n")
  end

  def render_preview
    self.status = @contents_status
    self.content_type = @contents_headers["Content-Type"]
    @contents_headers.each do |k, v|
      self.headers[k] = v
    end

    if !@contents_headers["Content-Type"].include?("text/html")
      self.response_body = @contents_body
      return
    end

    mobile = @contents_env.any? { |f| f == :mobile || f.is_a?(Hash) && f.key?(:mobile) }
    html = convert_html_to_preview(@contents_body.body, mobile: mobile)
    render html: html.html_safe, layout: false
  rescue => exception
    if exception.to_s.numeric?
      status = exception.to_s.to_i
      file = error_html_file(status)
      return ss_send_file(file, status: status, type: Fs.content_type(file), disposition: :inline)
    end
    raise
  end

  public

  def index
    render_preview
  end

  def form_preview
    render_preview
  end
end
