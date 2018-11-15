class Cms::Column::Value::UrlField < Cms::Column::Value::Base
  field :html_tag, type: String
  field :html_additional_attr, type: String, default: ''
  field :value, type: String

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

  def update_value(new_value)
    self.name = new_value.name
    self.order = new_value.order
    self.html_tag = new_value.html_tag
    self.html_additional_attr = new_value.html_additional_attr
    return false if value == new_value.value
    self.value = new_value.value
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
    if value.present?
      label, link = parse_value
      render_opts["value"] = value
      render_opts["label"] = label
      render_opts["link"] = link
    end

    template = Liquid::Template.parse(layout)
    template.render(render_opts).html_safe
  end

  private

  def to_default_html
    return '' if value.blank?

    options = html_additional_attr_to_h
    case html_tag
    when 'a'
      label, link = parse_value
      ApplicationController.helpers.link_to(label || link, link, options)
    else
      value
    end
  end

  def parse_value
    return if value.blank?

    label, link = value.split(',')
    if link.blank?
      link = label
      label = nil
    end

    label.strip! if label
    link.strip! if link

    [ label, link ]
  end
end
