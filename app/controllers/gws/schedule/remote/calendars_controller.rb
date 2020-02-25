class Gws::Schedule::Remote::CalendarsController < ApplicationController
  include Gws::BaseFilter
  include Gws::CrudFilter

  model Gws::Schedule::Remote::Calendar
  navi_view "gws/schedule/main/navi"

  private

  def set_account
    @account ||= Gws::Schedule::Remote::Account.site(@cur_site).find(params[:account_id])
  end

  def set_crumbs
    set_account

    @crumbs << [@cur_site.menu_schedule_label || t('modules.gws/schedule'), gws_schedule_main_path]
    @crumbs << [t('gws/schedule.navi.remote_account'), gws_schedule_remote_accounts_path]
    @crumbs << [@account.name, gws_schedule_remote_account_path(id: @account)]
  end

  def fix_params
    { cur_site: @cur_site, cur_user: @cur_user }
  end

  def set_item
    set_account

    @item ||= begin
      item = @account.calendars.find(params[:id])
      item.attributes = fix_params
      item
    end
  rescue Mongoid::Errors::DocumentNotFound => e
    return render_destroy(true) if params[:action] == 'destroy'
    raise e
  end

  public

  def index
    # raise "403" unless @model.allowed?(:read, @cur_user, site: @cur_site)

    @items = @account.calendars.
      allow(:read, @cur_user, site: @cur_site).
      search(params[:s]).
      page(params[:page]).per(50)
  end

  def sync
    set_item
    raise "403" unless @item.allowed?(:edit, @cur_user, site: @cur_site)

    if request.get?
      render
      return
    end

    job_class = Gws::Schedule::Remote::EventSyncJob.bind(site_id: @cur_site, user_id: @cur_user)
    job = job_class.perform_later(@item.id.to_s)

    respond_to do |format|
      format.html { redirect_to({ action: :show }, { notice: t("gws/schedule.notice.start_calendar_synchronization") }) }
      format.json do
        data = { job_id: job.job_id, notice: t("gws/schedule.notice.start_calendar_synchronization") }
        render json: { status: "ok", data: data }, status: :ok
      end
    end
  rescue => e
    logger.warn("#{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")}")

    respond_to do |format|
      format.html do
        @item.errors.add(:base, e.to_s)
        render
      end
      format.json do
        render json: { status: "bad request", error: e.to_s }, status: :bad_request
      end
    end
  end
end
