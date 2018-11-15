class Cms::Column::TextArea < Cms::Column::Base
  include Cms::Addon::Column::TextLike

  def serialize_value(value)
    value_type.new(
      column_id: self.id, name: self.name, order: self.order,
      value: value
    )
  end
end
