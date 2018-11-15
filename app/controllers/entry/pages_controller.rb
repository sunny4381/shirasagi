class Entry::PagesController < ApplicationController
  include Cms::BaseFilter
  include Cms::PageFilter

  model Entry::Page

  append_view_path "app/views/cms/pages"
  navi_view "cms/main/navi"

  if !Rails.env.production?
    # if autoload feature is enabled, lazy class loadings is activated.
    # load all column classes and column value classes
    # because we need to know all column classes and column value classes before posting, puting etc.
    before_action do
      Cms::Column.plugins.map { |p| p[1].sub('/', '/column/').classify.constantize rescue nil }.compact.each(&:value_type)
    end
  end

  private

  def fix_params
    { cur_user: @cur_user, cur_site: @cur_site, cur_node: @cur_node }
  end
end
