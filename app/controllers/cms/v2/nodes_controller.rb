class Cms::V2::NodesController < ApplicationController
  include Cms::BaseFilter
  include Cms::CrudFilter

  model Cms::Node

  navi_view "cms/main/navi"
end
