class Gws::Schedule::Search::TimesController < ApplicationController
  include Gws::BaseFilter

  model Gws::Schedule::PlanSearch

  navi_view "gws/schedule/main/navi"

  private

  def set_crumbs
    @crumbs << [@cur_site.menu_schedule_label || t('modules.gws/schedule'), gws_schedule_main_path]
    @crumbs << [t('gws/schedule.tabs.search'), gws_schedule_search_path]
    @crumbs << [t('gws/schedule.tabs.search/times'), gws_schedule_search_times_path]
  end

  def fix_params
    { cur_user: @cur_user, cur_site: @cur_site }
  end

  def pre_params
    { min_hour: @cur_site.facility_min_hour || 8, max_hour: @cur_site.facility_max_hour || 22 }
  end

  def get_params
    return fix_params if params[:s].blank?
    params.require(:s).permit(Gws::Schedule::PlanSearch.permitted_fields).merge(fix_params)
  end

  public

  def index
    max = SS.config.gws.schedule['search_times']['max_facilities']

    @s = get_params
    @s[:facility_ids] = @s[:facility_ids].reject(&:empty?) rescue []

    if @s[:facility_ids].count > max
      @s[:facility_ids] = @s[:facility_ids].slice(0, max)
      facility_error = true
    end

    @time_search = Gws::Schedule::PlanSearch.new(pre_params.merge(@s))
    return if @time_search.invalid?

    @time_search.errors.add :base, t('gws.errors.plan_search.max_facilities', count: max) if facility_error.present?

    @items = @time_search.search
  end
end
