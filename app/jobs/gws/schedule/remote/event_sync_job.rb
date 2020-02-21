class Gws::Schedule::Remote::EventSyncJob < Gws::ApplicationJob

  before_perform :ensure_cal_dav_methods

  def perform(*args)
    @options = args.extract_options!
    @imported_events = []

    Gws::Schedule::Remote::Calendar.site(site).in(id: args).to_a.each do |calendar|
      @imported_events.clear

      account = calendar.account
      case account.calendar_model
      when "ics"
        sync_account_ics(account)
      when "cal_dav"
        sync_account_cal_dav(account)
      when "google"
        sync_calendar_google(account, calendar)
      end

      Rails.logger.info("#{account.name}(#{account.id}): synchronized #{@imported_events.length.to_s(:delimited)} events")

      count = Gws::Schedule::Plan.site(site).calendar(calendar).nin(uuid: @imported_events).destroy_all
      Rails.logger.info("#{calendar.name}(#{calendar.id}): delete non-related #{count} plans") if count > 0
    end
  end

  private

  def ensure_cal_dav_methods
    Faraday::Connection::METHODS << :propfind if !Faraday::Connection::METHODS.include?(:propfind)
    Faraday::Connection::METHODS << :proppatch if !Faraday::Connection::METHODS.include?(:proppatch)
    Faraday::Connection::METHODS << :report if !Faraday::Connection::METHODS.include?(:report)
  end

  def sync_calendar_google(account, calendar)
    accessor = Gws::Schedule::Remote::GoogleCalendar.new(
      cur_site: site, cur_user: user, access_token: account.google_access_token, refresh_token: account.google_refresh_token
    )
    event_settings = accessor.query_events(calendar.google_calender_url)
    return if event_settings.blank?

    event_settings.each do |event_setting|
      calendar_data = event_setting[:calendar_data]
      next if calendar_data.blank?

      ics_calendars = Icalendar::Calendar.parse(calendar_data) rescue nil
      next if ics_calendars.blank?

      ics_calendars.each do |ics_calendar|
        time_zone = extract_time_zone(calendar, ics_calendar)

        ics_calendar.events.each do |ics_event|
          plan = import_ics_event(calendar, ics_event, time_zone, event_setting.slice(:etag, :schedule_tag))
          if plan
            @imported_events << plan.uuid
            Rails.logger.info("imported #{plan.name}(#{plan.id}) in #{term(plan)}")
          end
        end
      end
    end
  end

  def extract_time_zone(calendar, ics_calendar)
    time_zone_id = utf8_str_array(ics_calendar.x_wr_timezone).first
    time_zone_id ||= ics_calendar.timezones.first.try(:tzid)
    time_zone_id ||= calendar.ics_time_zone.presence

    time_zone = nil
    time_zone = ActiveSupport::TimeZone.find_tzinfo(time_zone_id) if time_zone_id.present?
    time_zone || ActiveSupport::TimeZone.find_tzinfo("UTC")
  rescue StandardError
    Rails.logger.warn("unable to find time zone: #{time_zone_id}")
    ActiveSupport::TimeZone.find_tzinfo("UTC")
  end

  def import_ics_event(calendar, ics_event, time_zone, params)
    dtstart = ics_event.dtstart

    summary = utf8_str(ics_event.summary)
    dtend = ics_event.dtend
    if dtend.blank?
      Rails.logger.info("#{summary}: unable to import because currently repeated events are not supported.")
      return
    end

    uid = utf8_str(ics_event.uid)
    plan = first_or_initialize_plan(calendar, uid)
    plan.cur_site = site
    plan.cur_user = user
    plan.name = summary
    plan.text = format_plan_text(
      url: ics_event.url, description: utf8_str(ics_event.description), location: utf8_str(ics_event.location),
      contacts: utf8_str_array(ics_event.contact), categories: utf8_str_array(ics_event.categories)
    )

    set_start_and_end(plan, time_zone, dtstart, dtend)

    set_cal_dav_attributes(plan, params)

    unless plan.save
      Rails.logger.warn("#{plan.name}: #{plan.errors.full_messages.join("\n")}")
      return
    end

    plan
  end

  def first_or_initialize_plan(calendar, uid)
    Gws::Schedule::Plan.site(site).calendar(calendar).where(uuid: uid).first_or_initialize do |new_plan|
      new_plan.site = site
      new_plan.calendar = calendar
      new_plan.uuid = uid
      new_plan.member_ids = [ user.id ]
      new_plan.readable_setting_range = "private"
      new_plan.readable_member_ids = [ user.id ]
      new_plan.custom_group_ids = []
      new_plan.group_ids = []
      new_plan.user_ids = [ user.id ]
      new_plan
    end
  end

  def set_start_and_end(plan, time_zone, dtstart, dtend)
    all_day = dtstart.value_type.casecmp("DATE") == 0
    if all_day
      plan.allday = "allday"
      plan.start_on = dtstart.value.in_time_zone(time_zone).in_time_zone
      plan.end_on = dtend.value.in_time_zone(time_zone).in_time_zone.yesterday
      plan.start_at = plan.start_on
      plan.end_at = plan.end_on.end_of_day
    else
      plan.start_at = dtstart.value.in_time_zone(time_zone).in_time_zone
      plan.end_at = dtend.value.in_time_zone(time_zone).in_time_zone
      plan.allday = nil
    end
  end

  def set_cal_dav_attributes(plan, params)
    plan.cal_dav_status_code = 200
    plan.cal_dav_etag = params[:etag]
    plan.cal_dav_schedule_tag = params[:schedule_tag]
    plan.cal_dav_error = ""
  end

  def utf8_str(value)
    return "" if value.blank?

    value.dup.force_encoding("UTF-8")
  end

  def utf8_str_array(array)
    return [] if array.blank?

    array.map { |value| utf8_str(value) }
  end

  def format_plan_text(params)
    text = []

    if params[:url].present?
      text << ""
      text << "[URL]"
      text << params[:url]
    end

    if params[:description].present?
      text << ""
      text << "[概要・説明]"
      text << params[:description]
    end

    if params[:location].present?
      text << ""
      text << "[場所]"
      text << params[:location]
    end

    if params[:contacts].present?
      text << ""
      text << "[問い合わせ]"
      text << params[:contacts].join(", ")
    end

    if params[:categories].present?
      text << ""
      text << "[カテゴリー・ジャンル]"
      text << params[:categories].join(", ")
    end

    text.shift
    text.join("\n")
  end

  def term(plan)
    if plan.allday?
      dates = [plan.start_at.to_date, plan.end_at.to_date].uniq
    else
      dates = [plan.start_at, plan.end_at].uniq
    end
    dates.map! { |m| I18n.l(m, format: :gws_long) }
    return dates[0] if dates.size == 1

    dates[1].split(/ /).each_with_index do |s, i|
      next if s == dates[0].split(/ /)[i]
      return [dates[0], dates[1].split(/ /)[i..-1].join(' ')].join(' - ')
    end
  end
end
