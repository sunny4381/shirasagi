class Gws::Schedule::CalendarsController < ApplicationController
  include Gws::BaseFilter
  include Gws::CrudFilter

  model Gws::Schedule::Calendar
  navi_view "gws/schedule/main/navi"

  before_action :new_item, only: [:new, :create]
  before_action :set_calendar_addons

  private

  def set_crumbs
    @crumbs << [@cur_site.menu_schedule_label || t('modules.gws/schedule'), gws_schedule_main_path]
    @crumbs << [t('gws/schedule.navi.calendar'), action: :index]
  end

  def fix_params
    { cur_site: @cur_site, cur_user: @cur_user }
  end

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

  public

  def new
    raise "403" unless @item.allowed?(:edit, @cur_user, site: @cur_site)

    if @item.calendar_model.blank?
      render file: 'select_calendar'
      return
    end

    render
  end

  def create
    return render_create(false) unless @item.allowed?(:edit, @cur_user, site: @cur_site, strict: true)
    render_create @item.save
  end
end
