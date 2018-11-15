class Cms::Column::RadioButton < Cms::Column::Base
  include Cms::Addon::Column::SelectLike

  def serialize_value(value)
    value_type.new(
      column_id: self.id, name: self.name, order: self.order,
      value: value
    )
  end
end
