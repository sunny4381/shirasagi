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

  def archive
    set_item
    return if request.get?
    Sys::Test::Shot::ArchiveJob.bind(user_id: @cur_user).perform_later(@item.id, request_url: request.url)

    redirect_to({ action: :index }, { notice: "アーカイブ作成処理を開始しました。アーカイブの作成が終わると通知が送られ、通知にダウンロード用 URL が記載されています。" })
  end
end
