class Cms::Liquid::LayoutsDrop < Cms::Liquid::BaseDrop
  def liquid_method_missing(method)
    layout = Cms::Layout.site(cur_site).and_public.where(filename: "#{normalize_path(method)}.layout.html").first
    if layout.present?
      layout
    else
      super
    end
  end
end
