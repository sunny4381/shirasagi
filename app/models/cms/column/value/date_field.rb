class Cms::Column::Value::DateField < Cms::Column::Value::Base
  field :html_tag, type: String
  field :html_additional_attr, type: String, default: ''
  field :date, type: DateTime

  def validate_value(record, attribute)
    return if column.blank?

    if column.required? && date.blank?
      record.errors.add(:base, name + I18n.t('errors.messages.blank'))
    end

    return if date.blank?
  end

  def update_value(new_value)
    self.name = new_value.name
    self.order = new_value.order
    self.html_tag = new_value.html_tag
    self.html_additional_attr = new_value.html_additional_attr
    return false if date == new_value.date
    self.date = new_value.date
    true
  end

  def html_additional_attr_to_h
    return {} if html_additional_attr.blank?
    html_additional_attr.scan(/\S+?=".+?"/m).
      map { |s| s.split(/=/).size == 2 ? s.delete('"').split(/=/) : nil }.
      compact.to_h
  end

  def to_html
    if column.blank?
      return to_default_html
    end

    layout = column.layout
    if layout.blank?
      return to_default_html
    end

    render_opts = {}
    render_opts["value"] = date.to_date if date.present?

    template = Liquid::Template.parse(layout)
    template.render(render_opts).html_safe
  end

  def value
    I18n.l(self.date.to_date) rescue nil
  end

  private

  def to_default_html
    return '' if date.blank?

    text = I18n.l(date.to_date, format: :long) rescue nil
    return '' if text.blank?

    options = html_additional_attr_to_h
    case html_tag
    when 'span'
      ApplicationController.helpers.content_tag('span', text, options)
    when 'time'
      options['datetime'] ||= date.iso8601
      ApplicationController.helpers.content_tag('time', text, options)
    else
      text
    end
  end
end
