class Cms::Liquid::PartsDrop < Cms::Liquid::BaseDrop
  def liquid_method_missing(method)
    part = Cms::Part.site(cur_site).and_public.where(filename: "#{normalize_path(method)}.part.html").first
    if part.present?
      part.becomes_with_route
    else
      super
    end
  end
end
