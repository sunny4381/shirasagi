class Cms::Liquid::PageDrop < SS::Liquid::DocumentDrop
  def parent
    @item.parent ? @item.parent.becomes_with_route : nil
  end

  def categories
    @item.categories.and_public.to_a.map(&:becomes_with_route)
  end
end
