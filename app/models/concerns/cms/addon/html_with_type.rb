module Cms::Addon::HtmlWithType
  extend ActiveSupport::Concern
  extend SS::Addon

  included do
    field :html, type: String
    field :html_type, type: String
    validates :html_type, inclusion: { in: %w(ss liquid) }, allow_blank: true
    permit_params :html, :html_type
  end

  def html_type_options
    options = %w(ss)
    options << 'liquid' unless SS.config.cms.liquid_layout['disable']
    options.map { |m| [I18n.t("cms.options.html_type.#{m}"), m] }
  end

  def liquid?
    html_type == 'liquid'
  end

  def html?
    !liquid?
  end
end
