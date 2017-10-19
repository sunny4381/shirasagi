class Pico::PortalController < ApplicationController
  include Gws::BaseFilter
  include Gws::CrudFilter

  layout 'pico/base'
  menu_view nil

  def index
  end
end
