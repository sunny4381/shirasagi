class SS::Liquid::DocumentDrop < SS::Liquid::BaseDrop
  def initialize(item)
    @item = item
  end

  def liquid_method_missing(method)
    if @item.class.liquid_methods.include?(method.to_sym)
      @item.send(method)
    else
      super
    end
  end
end
