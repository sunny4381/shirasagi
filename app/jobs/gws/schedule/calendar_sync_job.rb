class Gws::Schedule::CalendarSyncJob < Gws::ApplicationJob

  before_perform :ensure_cal_dav_methods

  def perform(*args)
    @options = args.extract_options!
    @imported_calendars = []
    @imported_events = []

    Gws::Schedule::Remote::Account.site(site).in(id: args).to_a.each do |account|
      @imported_calendars.clear
      @imported_events.clear

      sync_account(account)

      count = Gws::Schedule::Plan.site(site).in(calendar_id: @imported_calendars).nin(uuid: @imported_events).destroy_all
      Rails.logger.info("#{calendar.name}(#{calendar.id}): delete non-related #{count} plans") if count > 0
    end
  end

  private

  def ensure_cal_dav_methods
    Faraday::Connection::METHODS << :propfind if !Faraday::Connection::METHODS.include?(:propfind)
    Faraday::Connection::METHODS << :proppatch if !Faraday::Connection::METHODS.include?(:proppatch)
    Faraday::Connection::METHODS << :report if !Faraday::Connection::METHODS.include?(:report)
  end

  def sync_account(account)
    Rails.logger.info("#{account.name}(#{account.id}): start synchronizing ...")

    case account.calendar_model
    when "ics"
      sync_account_ics(account)
    when "cal_dav"
      sync_account_cal_dav(account)
    when "google"
      sync_account_google(account)
    end

    Rails.logger.info("#{account.name}(#{account.id}): imported #{@imported_events.length.to_s(:delimited)} events")
  rescue => e
    Rails.logger.warn("#{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")}")
  end

  def sync_account_google(account)
    accessor = Gws::Schedule::Remote::GoogleCalendar.new(
      cur_site: site, cur_user: user, access_token: account.google_access_token, refresh_token: account.google_refresh_token
    )

    calendar_settings = accessor.calendar_collection(account.google_calendar_home_set)
    calendar_settings.reject! { |calendar_setting| calendar_setting[:url].blank? }
    calendar_settings.reject! { |calendar_setting| calendar_setting[:display_name].blank? }
    calendar_settings.reject! { |calendar_setting| calendar_setting[:calendar_components].blank? }
    calendar_settings.select! { |calendar_setting| calendar_setting[:calendar_components].include?("VEVENT") }
    calendar_settings.each do |calendar_setting|
      calendar = account.calendars.where(google_calender_url: calendar_setting[:url]).first_or_initialize do |calendar|
        calendar.name = calendar_setting[:display_name]
        calendar.description = calendar_setting[:calendar_description] if calendar_setting[:calendar_description].present?
        calendar.order = calendar_setting[:calendar_order].to_i if calendar_setting[:calendar_order].numeric?
        calendar.color = normalize_ics_color(calendar_setting[:calendar_color]) if calendar_setting[:calendar_color].present?
        calendar.privileges = calendar_setting[:privileges] if calendar_setting[:privileges].present?
        calendar.member_ids = [ user.id ]
      end
      calendar.cur_site = site
      calendar.cur_user = user
      if calendar.new_record?
        if !calendar.save
          Rails.logger.warn(calendar.errors.full_messages.join("\n"))
          next
        end
      end

      sync_calendar_google(accessor, account, calendar)
      @imported_calendars << calendar.id
    end
  ensure
    account.update(google_access_token: accessor.access_token) if account.google_access_token != accessor.access_token
  end

  def sync_calendar_google(accessor, account, calendar)
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

  # def sync(calendar)
  #   Rails.logger.info("#{calendar.name}(#{calendar.id}): start synchronizing ...")
  #
  #   case calendar.calendar_model
  #   when "ics"
  #     sync_ics(calendar)
  #   when "cal_dav"
  #     sync_cal_dav(calendar)
  #   when "google"
  #     sync_google(calendar)
  #   end
  #
  #   Rails.logger.info("#{calendar.name}(#{calendar.id}): imported #{@imported_events.length.to_s(:delimited)} events")
  # rescue => e
  #   Rails.logger.warn("#{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")}")
  # end

  def create_http_client(url)
    http_client = Faraday.new(url: url) do |builder|
      builder.request  :url_encoded
      builder.response :logger, Rails.logger
      builder.adapter Faraday.default_adapter
    end
    http_client.headers[:user_agent] += " (SHIRASAGI/#{SS.version}; PID/#{Process.pid})"
    http_client
  end

  # def sync_ics(calendar)
  #   http_client = create_http_client(calendar.ics_url)
  #   response = http_client.get
  #   unless response.success?
  #     Rails.logger.warn("#{calendar.name}(#{calendar.id}): failed to download ics file from '#{calendar.ics_url}'")
  #     return
  #   end
  #
  #   ics_calendars = Icalendar::Calendar.parse(response.body)
  #   ics_calendars.each do |ics_calendar|
  #     time_zone = extract_time_zone(calendar, ics_calendar)
  #
  #     ics_calendar.events.each do |ics_event|
  #       plan = import_ics_event(calendar, ics_event, time_zone)
  #       if plan
  #         @imported_events << plan.uuid
  #         Rails.logger.info("imported #{plan.name}(#{plan.id}) in #{term(plan)}")
  #       end
  #     end
  #   end
  # end
  #
  # def sync_cal_dav(calendar)
  #   if calendar.cal_dav_cache_principal_url.blank?
  #     get_current_user_principal(calendar)
  #   end
  #   if calendar.cal_dav_cache_principal_url.blank?
  #     Rails.logger.warn("#{calendar.name}(#{calendar.id}): unable to determine calendar's principal url")
  #     return
  #   end
  #
  #   get_calendar_collection(calendar)
  #
  #   raise NotImplementedError
  # end

  # def get_current_user_principal(calendar)
  #   paths = [
  #     "/.well-known/caldav", "/", "/caldav/v2", "/principals/users/#{calendar.cal_dav_username}/",
  #     "/principals/", "/dav/principals/"
  #   ]
  #
  #   response = nil
  #   paths.each do |path|
  #     url = URI.join(calendar.cal_dav_url, path).to_s
  #     response = _current_user_principal(calendar, url)
  #     break if response.success?
  #   end
  #
  #   return false if !response.success?
  #
  #   doc = REXML::Document.new(response.body)
  #   if doc.elements["//D:current-user-principal/D:href"].length > 0
  #     path = doc.elements["//D:current-user-principal/D:href"].text
  #     calendar.cal_dav_cache_principal_url = URI.join(calendar.cal_dav_url, path).to_s
  #   elsif doc.elements["//D:principal-URL/D:href"].length > 0
  #     path = doc.elements["//D:principal-URL/D:href"].text
  #     calendar.cal_dav_cache_principal_url = URI.join(calendar.cal_dav_url, path).to_s
  #   end
  #
  #   resource_types = []
  #   doc.elements["//D:resourcetype"].each do |node|
  #     next if node.node_type != :element
  #
  #     resource_types << node.namespace + node.name
  #   end
  #   calendar.cal_dav_cache_resource_types = resource_types.uniq.sort
  #   calendar.cal_dav_cache_refreshed_at = Time.zone.now
  #   calendar.save
  # end

  # def _current_user_principal(calendar, url)
  #   current_user_principal_xml = <<~PRINCIPAL_XML
  #     <?xml version="1.0" encoding="UTF-8"?>
  #     <A:propfind xmlns:A="DAV:">
  #       <A:prop>
  #         <A:current-user-principal/>
  #         <A:principal-URL/>
  #         <A:resourcetype/>
  #       </A:prop>
  #     </A:propfind>
  #   PRINCIPAL_XML
  #
  #   http_client = create_http_client(url)
  #   response = http_client.run_request(:propfind, nil, current_user_principal_xml, nil) do |request|
  #     request.headers["Content-Type"] = "text/xml"
  #     request.headers["Depth"] = "0"
  #     request.headers["Brief"] = "t"
  #     request.headers["Accept"] = "*/*"
  #   end
  #
  #   if response.status == 401 && basic_auth?(response)
  #     # Basic 認証
  #     credential = Base64.strict_encode64([ calendar.cal_dav_username, SS::Crypt.decrypt(calendar.cal_dav_password) ].join(":"))
  #     response = http_client.run_request(:propfind, nil, current_user_principal_xml, nil) do |request|
  #       request.headers["Content-Type"] = "text/xml; charset=utf-8"
  #       request.headers["Depth"] = "0"
  #       request.headers["Brief"] = "t"
  #       request.headers["Accept"] = "*/*"
  #       request.headers["Authorization"] = "Basic #{credential}"
  #     end
  #   end
  #
  #   response
  # end

  # def get_calendar_collection(calendar)
  #   allprop_xml = <<~PROPNAME_XML
  #     <?xml version="1.0" encoding="UTF-8"?>
  #     <A:propfind xmlns:A="DAV:">
  #       <A:allprop/>
  #     </A:propfind>
  #   PROPNAME_XML
  #   http_client = create_http_client(calendar.cal_dav_cache_principal_url)
  #   response = http_client.run_request(:propfind, nil, allprop_xml, nil) do |request|
  #     request.headers["Content-Type"] = "text/xml"
  #     request.headers["Depth"] = "1"
  #     request.headers["Brief"] = "t"
  #     request.headers["Accept"] = "*/*"
  #   end
  #
  #   if response.status == 401 && basic_auth?(response)
  #     # Basic 認証
  #     credential = Base64.strict_encode64([ calendar.cal_dav_username, SS::Crypt.decrypt(calendar.cal_dav_password) ].join(":"))
  #     response = http_client.run_request(:propfind, nil, allprop_xml, nil) do |request|
  #       request.headers["Content-Type"] = "text/xml"
  #       request.headers["Depth"] = "1"
  #       request.headers["Brief"] = "t"
  #       request.headers["Accept"] = "*/*"
  #       request.headers["Authorization"] = "Basic #{credential}"
  #     end
  #   end
  #
  #   puts "status=#{response.status}, body=#{response.body}"
  #   response
  # end

  # def sync_google(calendar)
  #   raise NotImplementedError
  # end

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
      new_plan.readable_setting_range = "private"
      new_plan.readable_member_ids = [ user.id ]
      new_plan.custom_group_ids = []
      new_plan.group_ids = []
      new_plan.user_ids = [ user.id ]
      new_plan
    end
    plan.cur_site = site
    plan.cur_user = user

    plan.name = summary
    plan.text = format_plan_text(
      url: ics_event.url, description: utf8_str(ics_event.description), location: utf8_str(ics_event.location),
      contacts: utf8_str_array(ics_event.contact), categories: utf8_str_array(ics_event.categories)
    )

    plan.cal_dav_status_code = 200
    plan.cal_dav_etag = params[:etag]
    plan.cal_dav_schedule_tag = params[:schedule_tag]
    plan.cal_dav_error = ""

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

  def basic_auth?(response)
    www_authenticate = response.headers["www-authenticate"]
    return false if www_authenticate.blank?

    www_authenticate.include?("Basic realm")
  end

  def normalize_ics_color(color)
    return if color.blank?
    return if !color.starts_with?("#")

    color = color.downcase
    case color.length
    when 4
      # "#RGB" format is valid
      color
    when 7
      # "#RRGGBB" format is valid
      color
    when 9
      # "#RRGGBBAA" format is valid, but remove "AA" part
      color = color[0..6]
    else
      # others are invalid
      color = nil
    end

    color
  end
end
