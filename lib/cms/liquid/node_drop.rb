class Cms::Liquid::NodeDrop < SS::Liquid::DocumentDrop
  def parent
    @item.parent ? @item.parent.becomes_with_route : nil
  end
end
