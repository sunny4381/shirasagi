class Cms::Liquid::PartDrop < SS::Liquid::DocumentDrop
  def html
    view_context.render_layout_part(@item)
  end
end
