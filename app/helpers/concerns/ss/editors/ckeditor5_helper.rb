module SS::Editors::Ckeditor5Helper
  extend ActiveSupport::Concern

  def html_editor_ckeditor5(elem, opts = {})
    SS.config.cms.ckeditor5.fetch('stylesheets', []).each do |ss|
      if ss.start_with?("/")
        controller.stylesheet ss
      else
        controller.stylesheet stylesheet_path(ss)
      end
    end
    SS.config.cms.ckeditor5.fetch('javascripts', []).each do |js|
      if js.start_with?("/")
        controller.javascript js
      else
        controller.javascript javascript_path(js)
      end
    end
    opts = ckeditor5_editor_options(opts)
    jquery do
      "Cms_Editor_CKEditor5.render('#{elem}', #{opts.to_json});".html_safe
    end
  end

  def ckeditor5_editor_options(opts)
    opts
  end
end
