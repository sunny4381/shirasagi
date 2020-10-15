module SS::ScriptExpected
  ALWAYS_ALLOWED = 200
  PARTIALLY_ALLOWED = 100
  ESCAPED = 0
end

module SS::SanitizeHelper
  extend ActiveSupport::Concern

  def ss_sanitize(html, options = {})
    cur_site = options[:cur_site] || @cur_site
    script_expected = options[:script_expected]
    options = options.except(:cur_site, :script_expected)

    return sanitize(html, options) if cur_site.blank? || script_expected.nil?

    if cur_site.script_level <= script_expected
      # "<script> is allowed" means all tags are allowed
      html.html_safe
    else
      # "<script> is not allowed" means only some specific tags are allowed
      sanitize(html, options)
    end
  end
end
