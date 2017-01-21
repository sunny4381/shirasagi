class Cms::Layout
  include Cms::Model::Layout
  include Cms::Addon::Html
  include Cms::Addon::GroupPermission
  include History::Addon::Backup

  index({ site_id: 1, filename: 1 }, { unique: true })

  def liquid?
    html.include?("liquid layout")
  end

  def html?
    !liquid?
  end
end
