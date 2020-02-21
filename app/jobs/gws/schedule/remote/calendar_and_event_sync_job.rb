class Gws::Schedule::Remote::CalendarAndEventSyncJob < Gws::ApplicationJob

  before_perform :ensure_cal_dav_methods

  def perform(*args)
    @options = args.extract_options!
    @imported_calendars = []

    Gws::Schedule::Remote::Account.site(site).in(id: args).to_a.each do |account|
      @imported_calendars.clear

      sync_account(account)
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

      job_class = Gws::Schedule::Remote::EventSyncJob.bind(site: site.id, user: user.id)
      job_class.perform_now(calendar.id.to_s)
      @imported_calendars << calendar.id
    end
  ensure
    account.update(google_access_token: accessor.access_token) if account.google_access_token != accessor.access_token
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
