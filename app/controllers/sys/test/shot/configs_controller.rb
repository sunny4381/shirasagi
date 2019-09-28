class Sys::Test::Shot::ConfigsController < ApplicationController
  include Sys::BaseFilter
  include Sys::CrudFilter

  # menu_view "sys/test/menu"
  model Sys::Test::Shot::Config

  private

  def set_crumbs
    @crumbs << ["Screenshot", sys_test_shots_path]
  end
end
