class Gws::Schedule::CalendarSyncJob < Gws::ApplicationJob
  def perform(*args)
    @options = args.extract_options!
    @imported_uuids = []

    Gws::Schedule::Calendar.site(site).in(id: args).to_a.each do |calendar|
      @imported_uuids.clear

      sync(calendar)

      count = Gws::Schedule::Plan.site(site).calendar(calendar).nin(uuid: @imported_uuids).destroy_all
      Rails.logger.info("#{calendar.name}(#{calendar.id}): delete non-related #{count} plans") if count > 0
    end
  end

  private

  def sync(calendar)
    Rails.logger.info("#{calendar.name}(#{calendar.id}): start synchronizing ...")

    case calendar.calendar_model
    when "ics"
      sync_ics(calendar)
    when "google"
      sync_google(calendar)
    end

    Rails.logger.info("#{calendar.name}(#{calendar.id}): imported #{@imported_uuids.length.to_s(:delimited)} events")
  rescue => e
    Rails.logger.warn("#{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")}")
  end

  def sync_ics(calendar)
    http_client = Faraday.new(url: calendar.ics_url) do |builder|
      builder.request  :url_encoded
      builder.response :logger, Rails.logger
      builder.adapter Faraday.default_adapter
    end
    http_client.headers[:user_agent] += " (SHIRASAGI/#{SS.version}; PID/#{Process.pid})"

    response = http_client.get
    unless response.success?
      Rails.logger.warn("#{calendar.name}(#{calendar.id}): failed to download ics file from '#{calendar.ics_url}'")
      return
    end

    ics_calendars = Icalendar::Calendar.parse(response.body)
    ics_calendars.each do |ics_calendar|
      time_zone = extract_time_zone(calendar, ics_calendar)

      ics_calendar.events.each do |ics_event|
        plan = import_ics_event(calendar, ics_event, time_zone)
        if plan
          @imported_uuids << plan.uuid
          Rails.logger.info("imported #{plan.name}(#{plan.id}) in #{term(plan)}")
        end
      end
    end
  end

  def sync_google(calendar)
    raise NotImplementedError
  end

  def extract_time_zone(calendar, ics_calendar)
    time_zone_id = utf8_str_array(ics_calendar.x_wr_timezone).first
    time_zone_id ||= calendar.ics_time_zone.presence

    time_zone = nil
    time_zone = ActiveSupport::TimeZone.find_tzinfo(time_zone_id) if time_zone_id.present?
    time_zone || ActiveSupport::TimeZone.find_tzinfo("UTC")
  rescue StandardError
    Rails.logger.warn("unable to find time zone: #{time_zone_id}")
    ActiveSupport::TimeZone.find_tzinfo("UTC")
  end

  def import_ics_event(calendar, ics_event, time_zone)
    dtstart = ics_event.dtstart
    all_day = dtstart.value_type.casecmp("DATE") == 0

    summary = utf8_str(ics_event.summary)
    dtend = ics_event.dtend
    if dtend.blank?
      Rails.logger.info("#{summary}: unable to import because currently repeated events are not supported.")
      return
    end

    uid = utf8_str(ics_event.uid)
    plan = Gws::Schedule::Plan.site(site).calendar(calendar).where(uuid: uid).first_or_initialize do |new_plan|
      new_plan.site = site
      new_plan.calendar = calendar
      new_plan.uuid = uid
      new_plan.member_ids = [ user.id ]
      new_plan
    end
    plan.cur_site = site
    plan.cur_user = user

    plan.name = summary
    plan.text = format_plan_text(
      url: ics_event.url, description: utf8_str(ics_event.description), location: utf8_str(ics_event.location),
      contacts: utf8_str_array(ics_event.contact), categories: utf8_str_array(ics_event.categories)
    )

    if all_day
      plan.start_at = plan.start_on = dtstart.value.in_time_zone(time_zone).in_time_zone
      plan.end_at = plan.end_on = dtend.value.in_time_zone(time_zone).in_time_zone
      plan.allday = "allday"
    else
      plan.start_at = dtstart.value.in_time_zone(time_zone).in_time_zone
      plan.end_at = dtend.value.in_time_zone(time_zone).in_time_zone
      plan.allday = nil
    end

    unless plan.save
      Rails.logger.warn("#{plan.name}: #{plan.errors.full_messages.join("\n")}")
      return
    end

    plan
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
