class Cms::Column::Value::Base
  extend SS::Translation
  include SS::Document
  include SS::Liquidization

  embedded_in :page, inverse_of: :column_values
  belongs_to :column, class_name: 'Cms::Column::Base'
  field :name, type: String
  field :order, type: Integer
  field :class_name, type: String

  after_initialize :copy_column_settings, if: ->{ new_record? }

  liquidize do
    export :name
    export :to_html, as: :html
    export :to_html, as: :to_s
    export as: :type do
      self.class.name
    end
  end

  def to_html
    if column.blank?
      return to_default_html
    end

    layout = column.layout
    if layout.blank?
      return to_default_html
    end

    render_opts = { "value" => self }

    template = Liquid::Template.parse(layout)
    template.render(render_opts).html_safe
  end

  def validate_value(record, attribute)
    return if column.blank?

    if column.required? && value.blank?
      record.errors.add(:base, name + I18n.t('errors.messages.blank'))
    end
  end

  def update_value(new_value)
    self.name = new_value.name
    self.order = new_value.order
    return false if value == new_value.value
    self.value = new_value.value
    true
  end

  def new_clone
    ret = self.class.new self.attributes.to_h.except('_id', '_type', 'created', 'updated')
    ret.instance_variable_set(:@new_clone, true)
    ret
  end

  def generate_public_files
  end

  def remove_public_files
  end

  private

  def copy_column_settings
    return if column.blank?

    self.name ||= column.name
    self.order ||= column.order
  end

  def to_default_html
    ApplicationController.helpers.sanitize(self.value)
  end
end
