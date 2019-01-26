module SS::EditorHelper
  extend ActiveSupport::Concern
  include SS::Editors::CkeditorHelper
  include SS::Editors::Ckeditor5Helper
  include SS::Editors::TinymceHelper
  include SS::Editors::MarkdownHelper

  CODE_EXT_MODES = {
    html: :htmlmixed,
    scss: :css,
    js: :javascript,
    coffee: :coffeescript,
  }.freeze

  CODE_MODE_FILES = {
    htmlmixed: %w(xml javascript css vbscript htmlmixed),
  }.freeze

  def code_editor(elem, opts = {})
    mode   = opts[:mode].to_s.presence
    mode ||= opts[:filename].sub(/.*\./, "") if opts[:filename]

    mode = CODE_EXT_MODES[mode.to_sym] if mode && CODE_EXT_MODES[mode.to_sym]

    mode_path = "/assets/js/codemirror/mode"
    mode_file = "#{Rails.public_path}#{mode_path}"
    mode = nil if mode && !File.exists?("#{mode_file}/#{mode}/#{mode}.js")

    controller.stylesheet "/assets/css/codemirror/codemirror.css"
    controller.javascript "/assets/js/codemirror/codemirror.js"

    if mode
      (CODE_MODE_FILES[mode.to_sym] || [mode]).each do |m|
        controller.javascript "#{mode_path}/#{m}/#{m}.js"
      end
    end

    editor_opts = {}
    editor_opts[:mode]        = mode if mode.present?
    editor_opts[:readOnly]    = true if opts[:readonly]
    editor_opts[:lineNumbers] = true

    jquery do
      "Cms_Editor_CodeMirror.render('#{elem}', #{editor_opts.to_json});".html_safe
    end
  end

  def html_editor(elem, opts = {})
    case SS.config.cms.html_editor
    when "ckeditor"
      html_editor_ckeditor(elem, opts)
    when "tinymce"
      html_editor_tinymce(elem, opts)
    when "markdown"
      html_editor_markdown(elem, opts)
    when "ckeditor5_or_4"
      if browser.ie?
        html_editor_ckeditor(elem, opts)
      else
        html_editor_ckeditor5(elem, opts)
      end
    end
  end

  def html_editor_options(opts = {})
    case SS.config.cms.html_editor
    when "ckeditor"
      ckeditor_editor_options(opts)
    when "tinymce"
      tinymce_editor_options(opts)
    when "markdown"
      #html_editor_markdown(elem, opts)
    when "ckeditor5_or_4"
      if browser.ie?
        ckeditor_editor_options(opts)
      else
        ckeditor5_editor_options(opts)
      end
    end
  end
end
