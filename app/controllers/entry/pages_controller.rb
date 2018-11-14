class Entry::PagesController < ApplicationController
  include Cms::BaseFilter
  include Cms::PageFilter

  model Entry::Page

  append_view_path "app/views/cms/pages"
  mod_navi_view "article/main/mod_navi"
end
