module SS::Liquidable
  extend ActiveSupport::Concern

  included do
    class_variable_set(:@@_liquid_methods, [])
  end

  module ClassMethods
    def liquid_methods(*methods)
      params = class_variable_get(:@@_liquid_methods)
      return params if methods.blank?

      params.concat(methods.map(&:to_sym)).uniq!
      class_variable_set(:@@_liquid_methods, params)
      params
    end
  end

  def to_liquid
    SS::Liquid::DocumentDrop.new(self)
  end
end
