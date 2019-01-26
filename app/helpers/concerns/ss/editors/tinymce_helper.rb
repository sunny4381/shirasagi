module SS::Editors::TinymceHelper
  extend ActiveSupport::Concern

  def tinymce_editor_options(opts = {})
    opts = opts.symbolize_keys

    base_opts = SS.config.cms.tinymce['options'].symbolize_keys
    if opts[:readonly]
      readonly_options = SS.config.cms.tinymce['readonly_options'].presence
      readonly_options ||= {}
      base_opts.merge!(readonly_options.symbolize_keys)
    elsif opts[:public_side]
      public_side_options = SS.config.cms.tinymce['public_side_options'].presence
      public_side_options ||= {}
      base_opts.merge!(public_side_options.symbolize_keys)
    else
      base_opts[:templates] = "#{template_cms_editor_templates_path}.json?_=#{Time.zone.now.to_i}"
    end

    base_opts = site_tinymce_editor_options(base_opts)
    base_opts[:plugins] ||= []

    opts.reverse_merge!(base_opts)
    opts
  end

  def html_editor_tinymce(elem, opts = {})
    controller.javascript "/assets/js/tinymce/tinymce.min.js"
    editor_opts = tinymce_editor_options(opts)
    jquery do
      "Cms_Editor_TinyMCE.render('#{elem}', #{editor_opts.to_json});".html_safe
    end
  end

  def site_tinymce_editor_options(opts = {})
    return opts if @cur_site.nil?
    if @cur_node
      color_button = @cur_node.try(:color_button) || @cur_site.color_button
      editor_css_path = @cur_node.try(:editor_css_path) || @cur_site.editor_css_path
    else
      color_button = @cur_site.color_button
      editor_css_path = @cur_site.editor_css_path
    end

    if color_button == 'enabled'
      opts[:plugins] ||= []
      opts[:plugins].push('textcolor')
      opts[:plugins].uniq!
      if opts[:toolbar]
        opts[:toolbar] += ' | forecolor backcolor' unless opts[:toolbar].include?('forecolor backcolor')
      end
    end
    if color_button == 'disabled'
      opts[:plugins] ||= []
      opts[:plugins].delete('textcolor')
      if opts[:toolbar]
        opts[:toolbar].gsub!(' | forecolor backcolor', '')
      end
    end

    opts[:content_css] ||= []
    if editor_css_path.present?
      opts[:contents_css] << ::File.join(@cur_site.full_url, editor_css_path)
    end

    opts
  end
end