class Cms::Liquid::LayoutDrop < SS::Liquid::DocumentDrop
  def html
    view_context.render_layout_parts(@item.html.to_s)
  end
end
