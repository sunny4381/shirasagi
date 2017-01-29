module Cms::AgentFilter
  extend ActiveSupport::Concern
  include SS::AgentFilter

  included do
    helper Cms::Rendering
    alias_method_chain :render, :cms_layout
  end

  # override a render method to render cms layout
  def render_with_cms_layout(*args, &block)
    @cur_item = @cur_page || @cur_node

    @window_name = @cur_site.name
    @window_name = "#{@cur_item.name} - #{@cur_site.name}" if @cur_item.filename != "index.html"

    init_cur_layout

    options = args.extract_options!
    erb_layout = options.delete(:layout)
    erb_layout ||= 'cms/nil' if @cur_layout.blank?
    erb_layout ||= 'cms/nil' if request.xhr?
    erb_layout ||= @cur_layout.html? ? 'cms/page' : 'cms/liquid'
    options[:layout] = erb_layout

    render_without_cms_layout(*args, options, &block)
  end

  private
    # must be overrided by subclass
    def init_cur_layout
      raise NotImplementedError
    end
end
