class Sys::Test::Shot::ConfigsController < ApplicationController
  include Sys::BaseFilter
  include Sys::CrudFilter

  # menu_view "sys/test/menu"
  model Sys::Test::Shot::Config

  private

  def set_crumbs
    @crumbs << ["Screenshot", sys_test_shots_path]
  end

  public

  def run
    set_item
    if request.get?
      render
      return
    end

    Sys::Test::Shot::CrawlerJob.bind(user_id: @cur_user.id).perform_now(@item.id)
    redirect_to({ action: :show }, { notice: I18n.t("ss.notice.run") })
  end
end
