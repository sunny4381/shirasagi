class Entry::Agents::Pages::PageController < ApplicationController
  include Cms::PageFilter::View
  include Cms::ForMemberFilter::Page
end
