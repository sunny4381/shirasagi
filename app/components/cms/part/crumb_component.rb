class Cms::Part::CrumbComponent < Cms::CmsComponent
  def initialize(items)
    @items = items
  end

  attr_reader :items
end
