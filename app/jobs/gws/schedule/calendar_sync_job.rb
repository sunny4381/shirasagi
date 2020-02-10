class Gws::Schedule::CalendarSyncJob < Gws::ApplicationJob
  def perform(*args)
    _options = args.extract_options!

    Gws::Schedule::Calendar.site(site).in(id: args).to_a.each do |calendar|
      sync(calendar)
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
  rescue => e
    Rails.logger.warn("#{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")}")
  end

  def sync_ics(calendar)
    response = Faraday.get(calendar.ics_url) do |request|
      request.headers[:user_agent] += " (SHIRASAGI/#{SS.version}; PID/#{Process.pid})"
    end
    unless response.success?
      Rails.logger.warn("#{calendar.name}(#{calendar.id}): failed to download ics file from '#{calendar.ics_url}'. error #{response.status}")
      return
    end

    ics_calendars = Icalendar::Calendar.parse(response.body)
    ics_calendars.each do |ics_calendar|
      calendar_names = utf8_str_array(ics_calendar.x_wr_calname)
      calendar_descriptions = utf8_str_array(ics_calendar.x_wr_caldesc)
      Rails.logger.debug("calendar_name=#{calendar_names.first}, calendar_description=#{calendar_descriptions.first}")

      time_zone_id = utf8_str_array(ics_calendar.x_wr_timezone).first
      time_zone_id ||= calendar.ics_time_zone.presence

      time_zone = nil
      if time_zone_id.present?
        begin
          time_zone = ActiveSupport::TimeZone.find_tzinfo(time_zone_id)
        rescue TZInfo::InvalidTimezoneIdentifier
          Rails.logger.warn("unable to find time zone: #{time_zone_id}")
        end
      end
      time_zone ||= ActiveSupport::TimeZone.find_tzinfo("UTC")

      ics_calendar.events.each do |ics_event|
        uid = utf8_str(ics_event.uid)
        url = ics_event.url
        summary = utf8_str(ics_event.summary)
        description = utf8_str(ics_event.description)
        location = utf8_str(ics_event.location)
        contacts = utf8_str_array(ics_event.contact)
        dtstart = ics_event.dtstart
        dtend = ics_event.dtend
        created = ics_event.created
        last_modified = ics_event.last_modified
        categories = utf8_str_array(ics_event.categories)

        puts "uid=#{uid}, url=#{url}, summary=#{summary}, description=#{description}, location=#{location}, contacts=#{contacts.join(", ")}, categories=#{categories.join(", ")}"

        if dtend.blank?
          Rails.logger.info("currently repeated events are not supported.")
          next
        end

        start_at = dtstart.value.in_time_zone(time_zone).in_time_zone
        end_at = dtend.value.in_time_zone(time_zone).in_time_zone
        puts "start_at=#{start_at}, end_at=#{end_at}, allday=#{dtstart.value_type.casecmp("DATE") == 0 ? "yes" : "no"}"
      end
    end
  end

  def sync_google(calendar)
    raise NotImplementedError
  end

  def utf8_str(value)
    return "" if value.blank?

    value.dup.force_encoding("UTF-8")
  end

  def utf8_str_array(array)
    return [] if array.blank?

    array.map { |value| utf8_str(value) }
  end
end
