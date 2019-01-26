module SS::Editors::CkeditorHelper
  extend ActiveSupport::Concern

  def ckeditor_editor_options(opts = {})
    opts = opts.symbolize_keys

    base_opts = SS.config.cms.ckeditor['options'].symbolize_keys
    if opts.delete(:readonly)
      readonly_options = SS.config.cms.ckeditor['readonly_options'].presence
      readonly_options ||= {}
      base_opts.merge!(readonly_options.symbolize_keys)
    end
    if opts.delete(:public_side)
      public_side_options = SS.config.cms.ckeditor['public_side_options'].presence
      public_side_options ||= {}
      base_opts.merge!(public_side_options.symbolize_keys)
    end
    if opts.delete(:advanced)
      advanced_options = SS.config.cms.ckeditor['advanced_options'].presence
      advanced_options ||= {}
      base_opts.merge!(advanced_options.symbolize_keys)
    end

    base_opts = site_ckeditor_editor_options(base_opts)

    opts.reverse_merge!(base_opts)
    opts[:extraPlugins] = opts[:extraPlugins].join(',') if opts[:extraPlugins].is_a?(Array)
    opts[:removePlugins] = opts[:removePlugins].join(',') if opts[:removePlugins].is_a?(Array)
    opts[:extraPlugins] ||= ''
    opts[:removePlugins] ||= ''

    if opts[:templates]
      opts[:templates_files] ||= []
      opts[:templates_files] << "#{template_cms_editor_templates_path}.js?_=#{Time.zone.now.to_i}"
    else
      opts.delete(:templates)
      opts.delete(:templates_files)
    end
    opts
  end

  def html_editor_ckeditor(elem, opts = {})
    SS.config.cms.ckeditor.fetch('stylesheets', []).each do |ss|
      controller.stylesheet ss
    end
    SS.config.cms.ckeditor.fetch('javascripts', []).each do |js|
      controller.javascript js
    end
    opts = ckeditor_editor_options(opts)
    jquery do
      "Cms_Editor_CKEditor.render('#{elem}', #{opts.to_json});".html_safe
    end
  end

  def site_ckeditor_editor_options(opts = {})
    return opts if @cur_site.nil?
    if @cur_node
      color_button = @cur_node.try(:color_button) || @cur_site.color_button
      editor_css_path = @cur_node.try(:editor_css_path) || @cur_site.editor_css_path
    else
      color_button = @cur_site.color_button
      editor_css_path = @cur_site.editor_css_path
    end

    if color_button == 'enabled'
      opts[:extraPlugins] ||= ['colorbutton']
      opts[:removePlugins] ||= []
      opts[:removePlugins] -= ['colorbutton']
    end
    opts[:removePlugins] ||= ['colorbutton'] if color_button == 'disabled'

    opts[:contentsCss] ||= []
    if editor_css_path.present?
      opts[:contentsCss] << ::File.join(@cur_site.full_url, editor_css_path)
    end

    opts
  end
end