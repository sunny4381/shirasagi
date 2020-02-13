class Gws::Schedule::Remote::AccountsController < ApplicationController
  include Gws::BaseFilter
  include Gws::CrudFilter

  GOOGLE_OAUTH_TIMEOUT = 600

  model Gws::Schedule::Remote::Account
  navi_view "gws/schedule/main/navi"

  before_action :new_item, only: [:new, :create]
  before_action :set_calendar_addons

  private

  def set_crumbs
    @crumbs << [@cur_site.menu_schedule_label || t('modules.gws/schedule'), gws_schedule_main_path]
    @crumbs << [t('gws/schedule.navi.remote_account'), action: :index]
  end

  def fix_params
    { cur_site: @cur_site, cur_user: @cur_user }
  end

  # def pre_params
  #   { color: SS::RandomColor.random_rgb.to_s }
  # end

  def new_item
    if request.get?
      # new
      @item = @model.new pre_params.merge(fix_params)
      @item.calendar_model = params[:calendar_model].to_s
    else
      # create
      @item = @model.new get_params
    end
  end

  def set_calendar_addons
    return if @item.blank?

    @addons = @model.calendar_addons(@item.calendar_model)
  end

  def redirect_to_google_consent_screen
    client_id = SS.config.gws.schedule.dig("google_calendar", "client_id")
    redirect_uri = url_for(action: :new, calendar_model: @item.calendar_model)
    scope = "https://www.googleapis.com/auth/calendar"
    state = SS::Crypt.encrypt({ time: Time.zone.now.to_i }.to_json)
    query = {
      response_type: "code", client_id: client_id, redirect_uri: redirect_uri, scope: scope,
      access_type: "offline", state: state
    }

    redirect_to URI::HTTPS.build(host: "accounts.google.com", path: "/o/oauth2/v2/auth", query: query.to_query).to_s
  end

  public

  def new
    raise "403" unless @item.allowed?(:edit, @cur_user, site: @cur_site)

    if @item.calendar_model.blank?
      render file: 'select_calendar'
      return
    end

    if @item.calendar_model == "google" && params[:state].blank?
      redirect_to_google_consent_screen
      return
    end

    if @item.calendar_model == "google" && params[:state].present?
      state = SS::Crypt.decrypt(params[:state])
      if state.blank?
        redirect_to_google_consent_screen
        return
      end

      state = JSON.parse(state)
      if Time.zone.now.to_i - state["time"] >= GOOGLE_OAUTH_TIMEOUT
        redirect_to_google_consent_screen
        return
      end

      if params[:code].blank?
        redirect_to_google_consent_screen
        return
      end

      authorization_code = params[:code]
      client_id = SS.config.gws.schedule.dig("google_calendar", "client_id")
      client_secret = SS.config.gws.schedule.dig("google_calendar", "client_secret")
      redirect_uri = url_for(action: :new, calendar_model: @item.calendar_model)

      response = Faraday.post(
        "https://www.googleapis.com/oauth2/v4/token",
        code: authorization_code, client_id: client_id, client_secret: client_secret, redirect_uri: redirect_uri,
        grant_type: "authorization_code", access_type: "offline", state: params[:state]
      )
      unless response.success?
        redirect_to_google_consent_screen
        return
      end

      token_info = JSON.parse(response.body)
      access_token = token_info["access_token"]
      refresh_token = token_info["refresh_token"]

      calendar_accessor = Gws::Schedule::Remote::GoogleCalendar.new(
        cur_site: @cur_site, cur_user: @cur_user, access_token: access_token, refresh_token: refresh_token
      )

      @item.google_principal_url = calendar_accessor.principal_url

      calendar_home_set = calendar_accessor.calendar_home_set(@item.google_principal_url)
      @item.name = calendar_home_set[:display_name]
      @item.google_calendar_home_set = calendar_home_set[:calendar_home_set]
      @item.google_access_token = calendar_accessor.access_token
      @item.google_refresh_token = calendar_accessor.refresh_token
    end

    render
  end

  def create
    return render_create(false) unless @item.allowed?(:edit, @cur_user, site: @cur_site, strict: true)
    render_create @item.save
  end

  def sync
    set_item
    raise "403" unless @item.allowed?(:edit, @cur_user, site: @cur_site)

    if request.get?
      render
      return
    end

    Gws::Schedule::CalendarSyncJob.bind(site_id: @cur_site, user_id: @cur_user).perform_later(@item.id.to_s)
    redirect_to({ action: :show }, { notice: t("gws/schedule.notice.start_calendar_synchronization") })
  end
end
