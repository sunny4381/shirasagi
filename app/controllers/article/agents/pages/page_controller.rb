class Article::Agents::Pages::PageController < ApplicationController
  include Cms::PageFilter::View2
  include Cms::ForMemberFilter::Page
end
