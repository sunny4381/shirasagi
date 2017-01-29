module Cms::PublicFilter::Layout
  extend ActiveSupport::Concern
  include Cms::PublicFilter::Agent
  include Cms::PublicHelper
  include Cms::PublicFilter::OpenGraph
  include Cms::PublicFilter::TwitterCard

  included do
    helper Cms::Rendering
  end

  private
    def filters
      @filters ||= begin
        request.env["ss.filters"] ||= []
      end
    end

    def find_part(path)
      part = Cms::Part.site(@cur_site).filename(path).first
      return unless part
      @preview || part.public? ? part.becomes_with_route : nil
    end

    def render_part(part, opts = {})
      view_context.render_part(part, opts)
    end

  public
    def mobile_path?
      filters.include?(:mobile)
    end

    def preview_path?
      filters.include?(:preview)
    end

    def stylesheets
      @stylesheets || []
    end

    def stylesheet(path)
      @stylesheets ||= []
      @stylesheets << path unless @stylesheets.include?(path)
    end

    def javascripts
      @javascripts || []
    end

    def javascript(path)
      @javascripts ||= []
      @javascripts << path unless @javascripts.include?(path)
    end

    def javascript_configs
      if @javascript_config.nil?
        @javascript_config = {}

        conf = Cms::ThemeTemplate.to_config(site: @cur_site, preview_path: preview_path?)
        @javascript_config.merge!(conf)

        conf = Recommend::History::Log.to_config(
          site: @cur_site, item: (@cur_page || @cur_node || @cur_part), path: @cur_path,
          preview_path: preview_path?
        )
        @javascript_config.merge!(conf)
      end
      @javascript_config
    end

    def javascript_config(conf)
      javascript_configs
      @javascript_config.merge!(conf)
    end
end
