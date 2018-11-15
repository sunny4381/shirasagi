class Cms::Column::Value::TextArea < Cms::Column::Value::Base
  field :value, type: String

  def to_html
    if column.blank?
      return to_default_html
    end

    layout = column.layout
    if layout.blank?
      return to_default_html
    end

    render_opts = {}
    render_opts["value"] = value if value.present?

    template = Liquid::Template.parse(layout)
    template.render(render_opts).html_safe
  end

  def validate_value(record, attribute)
    return if column.blank?

    if column.required? && value.blank?
      record.errors.add(:base, name + I18n.t('errors.messages.blank'))
    end

    return if value.blank?

    if column.max_length.present? && column.max_length > 0
      if value.length > column.max_length
        record.errors.add(:base, name + I18n.t('errors.messages.less_than_or_equal_to', count: column.max_length))
      end
    end
  end

  private

  def to_default_html
    ApplicationController.helpers.sanitize(ApplicationController.helpers.br(self.value))
  end
end
