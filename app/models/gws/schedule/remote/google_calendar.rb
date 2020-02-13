class Gws::Schedule::Remote::GoogleCalendar
  include ActiveModel::Model

  CURRENT_USER_PRINCIPAL_REQUEST = <<~END_CURRENT_USER_PRINCIPAL_REQUEST.freeze
    <?xml version="1.0" encoding="UTF-8"?>
    <D:propfind xmlns:D="DAV:">
      <D:prop>
        <D:current-user-principal/>
        <D:principal-URL/>
        <D:resourcetype/>
      </D:prop>
    </D:propfind>
  END_CURRENT_USER_PRINCIPAL_REQUEST

  CALENDAR_HOME_SET_REQUEST = <<~END_CALENDAR_HOME_SET_REQUEST.freeze
    <?xml version="1.0" encoding="UTF-8"?>
    <D:propfind xmlns:D="DAV:" xmlns:caldav="urn:ietf:params:xml:ns:caldav" xmlns:cs="http://calendarserver.org/ns/">
      <D:prop>
        <caldav:calendar-home-set/>
        <caldav:calendar-user-address-set/>
        <D:current-user-principal/>
        <D:displayname/>
        <cs:dropbox-home-URL/>
        <cs:email-address-set/>
        <caldav:max-attendees-per-instance/>
        <cs:notification-URL/>
        <D:principal-collection-set/>
        <D:principal-URL/>
        <D:resource-id/>
        <caldav:schedule-inbox-URL/>
        <caldav:schedule-outbox-URL/>
        <D:supported-report-set/>
      </D:prop>
    </D:propfind>
  END_CALENDAR_HOME_SET_REQUEST

  attr_accessor :cur_site, :cur_user, :access_token, :refresh_token
  attr_accessor :client_id, :client_secret

  def initialize(*args)
    super

    @client_id = SS.config.gws.schedule.dig("google_calendar", "client_id")
    @client_secret = SS.config.gws.schedule.dig("google_calendar", "client_secret")
  end

  def principal_url
    response = run_propfind("https://apidata.googleusercontent.com/caldav/v2", CURRENT_USER_PRINCIPAL_REQUEST, depth: 0)
    return unless response.success?

    doc = Nokogiri::XML(response.body)

    current_user_principal_hrefs = doc.xpath("//D:current-user-principal/D:href", "D" => "DAV:")
    if current_user_principal_hrefs.present?
      return URI.join("https://apidata.googleusercontent.com/caldav/v2", current_user_principal_hrefs[0].text).to_s
    end

    principal_url_hrefs = doc.xpath("//D:principal-URL/D:href", "D" => "DAV:")
    if principal_url_hrefs.present?
      return URI.join("https://apidata.googleusercontent.com/caldav/v2", principal_url_hrefs[0].text).to_s
    end

    nil
  end

  def calendar_home_set(principal_url)
    response = run_propfind(principal_url, CALENDAR_HOME_SET_REQUEST, depth: 0)
    return unless response.success?

    doc = Nokogiri::XML(response.body)

    ret = {}
    calendar_home_set_hrefs = doc.xpath("//caldav:calendar-home-set/D:href",
                                        "D" => "DAV:", "caldav" => "urn:ietf:params:xml:ns:caldav")
    if calendar_home_set_hrefs.present?
      ret[:calendar_home_set] = URI.join(principal_url, calendar_home_set_hrefs.first.text).to_s
    end

    display_names = doc.xpath("//D:displayname", "D" => "DAV:")
    if display_names.present?
      ret[:display_name] = display_names.first.text
    end

    ret
  end

  private

  def create_http_client(url)
    Faraday::Connection::METHODS << :propfind if !Faraday::Connection::METHODS.include?(:propfind)
    Faraday::Connection::METHODS << :proppatch if !Faraday::Connection::METHODS.include?(:proppatch)
    Faraday::Connection::METHODS << :report if !Faraday::Connection::METHODS.include?(:report)

    http_client = Faraday.new(url: url) do |builder|
      builder.request  :url_encoded
      builder.response :logger, Rails.logger
      builder.adapter Faraday.default_adapter
    end
    http_client.headers[:user_agent] += " (SHIRASAGI/#{SS.version}; PID/#{Process.pid})"
    http_client
  end

  def run_propfind(url, body, depth: nil)
    http_client = create_http_client(url)
    count = 0
    response = nil
    while count < 2
      response = http_client.run_request(:propfind, nil, nil, nil) do |request|
        request.headers["Content-Type"] = "text/xml"
        request.headers["Depth"] = depth.to_s if depth
        request.headers["Brief"] = "t"
        request.headers["Accept"] = "*/*"
        request.headers["Authorization"] = "Bearer #{access_token}"
        request.body = body
      end

      if response.status == 401
        refresh_access_token
        count += 1
        next
      end

      break
    end

    response
  end

  def refresh_access_token
    http_client = create_http_client("https://www.googleapis.com/oauth2/v4/token")
    response = http_client.post(
      refresh_token: refresh_token, client_id: client_id, client_secret: client_secret, grant_type: "refresh_token"
    )
    return false unless response.success?

    token_info = JSON.parse(response.body)
    @access_token = token_info["access_token"]
    true
  end
end
