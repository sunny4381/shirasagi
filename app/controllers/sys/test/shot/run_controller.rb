class Sys::Test::Shot::RunController < ApplicationController
  include Sys::BaseFilter
  include Sys::CrudFilter

  # menu_view "sys/test/menu"
  model Sys::Test::Shot::Config

  private

  def set_crumbs
    set_config
    @crumbs << ["Screenshot", sys_test_shots_path]
  end

  def set_config
    @config ||= Sys::Test::Shot::Config.find(params[:shot_id])
  end

  def set_item
    @item = @config
  end

  public

  def create
    raise "403" unless @config.allowed?(:edit, @cur_user)

    return stop if params[:stop]

    if @config.ready
      Sys::Test::Shot::CrawlerJob.bind(user_id: @cur_user.id).perform_later(@config.id)
      respond_to do |format|
        format.html { redirect_to({ action: :show }, { notice: I18n.t("ss.notice.run") }) }
        format.json { render json: @config.to_json, status: :created, content_type: json_content_type }
      end
    else
      respond_to do |format|
        format.html { render action: :show }
        format.json { render json: @config.errors.full_messages, status: :unprocessable_entity, content_type: json_content_type }
      end
    end
  end

  def stop
    @item.update(interrupt: "stop")
    redirect_to({ action: :show }, { notice: t("ss.tasks.interrupted") })
  end
end
