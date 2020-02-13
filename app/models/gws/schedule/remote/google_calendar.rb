class Gws::Schedule::Remote::GoogleCalendar
  include ActiveModel::Model

  NS = {
    "D" => "DAV:",
    "caldav" => "urn:ietf:params:xml:ns:caldav",
    "cs" => "http://calendarserver.org/ns/",
    "ical" => "http://apple.com/ns/ical/"
  }.freeze

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

  CALENDAR_DESCRIPTION_REQUEST = <<~END_CALENDAR_DESCRIPTION_REQUEST.freeze
    <?xml version="1.0" encoding="UTF-8"?>
    <A:propfind xmlns:A="DAV:">
      <A:prop>
        <A:add-member/>
        <C:allowed-sharing-modes xmlns:C="http://calendarserver.org/ns/"/>
        <D:autoprovisioned xmlns:D="http://apple.com/ns/ical/"/>
        <E:bulk-requests xmlns:E="http://me.com/_namespace/"/>
        <B:calendar-alarm xmlns:B="urn:ietf:params:xml:ns:caldav"/>
        <D:calendar-color xmlns:D="http://apple.com/ns/ical/"/>
        <B:calendar-description xmlns:B="urn:ietf:params:xml:ns:caldav"/>
        <B:calendar-free-busy-set xmlns:B="urn:ietf:params:xml:ns:caldav"/>
        <D:calendar-order xmlns:D="http://apple.com/ns/ical/"/>
        <B:calendar-timezone xmlns:B="urn:ietf:params:xml:ns:caldav"/>
        <A:current-user-privilege-set/>
        <B:default-alarm-vevent-date xmlns:B="urn:ietf:params:xml:ns:caldav"/>
        <B:default-alarm-vevent-datetime xmlns:B="urn:ietf:params:xml:ns:caldav"/>
        <A:displayname/>
        <C:getctag xmlns:C="http://calendarserver.org/ns/"/>
        <C:invite xmlns:C="http://calendarserver.org/ns/"/>
        <D:language-code xmlns:D="http://apple.com/ns/ical/"/>
        <D:location-code xmlns:D="http://apple.com/ns/ical/"/>
        <B:max-attendees-per-instance xmlns:B="urn:ietf:params:xml:ns:caldav"/>
        <A:owner/>
        <C:pre-publish-url xmlns:C="http://calendarserver.org/ns/"/>
        <C:publish-url xmlns:C="http://calendarserver.org/ns/"/>
        <C:push-transports xmlns:C="http://calendarserver.org/ns/"/>
        <C:pushkey xmlns:C="http://calendarserver.org/ns/"/>
        <A:quota-available-bytes/>
        <A:quota-used-bytes/>
        <D:refreshrate xmlns:D="http://apple.com/ns/ical/"/>
        <A:resource-id/>
        <A:resourcetype/>
        <B:schedule-calendar-transp xmlns:B="urn:ietf:params:xml:ns:caldav"/>
        <B:schedule-default-calendar-URL xmlns:B="urn:ietf:params:xml:ns:caldav"/>
        <C:source xmlns:C="http://calendarserver.org/ns/"/>
        <C:subscribed-strip-alarms xmlns:C="http://calendarserver.org/ns/"/>
        <C:subscribed-strip-attachments xmlns:C="http://calendarserver.org/ns/"/>
        <C:subscribed-strip-todos xmlns:C="http://calendarserver.org/ns/"/>
        <B:supported-calendar-component-set xmlns:B="urn:ietf:params:xml:ns:caldav"/>
        <B:supported-calendar-component-sets xmlns:B="urn:ietf:params:xml:ns:caldav"/>
        <A:supported-report-set/>
        <A:sync-token/>
      </A:prop>
    </A:propfind>
  END_CALENDAR_DESCRIPTION_REQUEST

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

    current_user_principal_hrefs = doc.xpath("//D:current-user-principal/D:href", NS)
    if current_user_principal_hrefs.present?
      return URI.join("https://apidata.googleusercontent.com/caldav/v2", current_user_principal_hrefs[0].text).to_s
    end

    principal_url_hrefs = doc.xpath("//D:principal-URL/D:href", NS)
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
    calendar_home_set_hrefs = doc.xpath("//caldav:calendar-home-set/D:href", NS)
    if calendar_home_set_hrefs.present?
      ret[:calendar_home_set] = URI.join(principal_url, calendar_home_set_hrefs.first.text).to_s
    end

    display_names = doc.xpath("//D:displayname", NS)
    if display_names.present?
      ret[:display_name] = display_names.first.text
    end

    ret
  end

  def calendar_collection(calendar_home_set_url)
    response = run_propfind(calendar_home_set_url, CALENDAR_DESCRIPTION_REQUEST, depth: 1)
    return unless response.success?

    doc = Nokogiri::XML(response.body)
    ret = []

    doc.xpath("//D:response", NS).each do |response_node|
      href = extract_text(response_node.xpath("D:href", NS).first)
      next if href.blank?

      calendar_info = { url: URI.join(calendar_home_set_url, href).to_s }
      response_node.xpath("D:propstat", NS).each do |prop_stat_node|
        status = extract_text(prop_stat_node.xpath("D:status", NS))
        next if !status.include?("200")

        privilege_nodes = prop_stat_node.xpath("D:prop/D:current-user-privilege-set/D:privilege/*", NS)
        privileges = extract_privileges(privilege_nodes)
        calendar_info[:privileges] = privileges if privileges.present?

        display_name = extract_text(prop_stat_node.xpath("D:prop/D:displayname", NS).first)
        calendar_info[:display_name] = display_name if display_name.present?

        owner_href = extract_text(prop_stat_node.xpath("D:prop/D:owner/D:href", NS).first)
        calendar_info[:owner_url] = URI.join(calendar_home_set_url, owner_href).to_s if owner_href.present?

        resource_types = extract_resource_types(prop_stat_node.xpath("D:prop/D:resourcetype", NS))
        calendar_info[:resource_types] = resource_types if resource_types.present?

        calendar_color = extract_text(prop_stat_node.xpath("D:prop/ical:calendar-color", NS))
        calendar_info[:calendar_color] = calendar_color if calendar_color.present?

        calendar_description = extract_text(prop_stat_node.xpath("D:prop/caldav:calendar-description", NS))
        calendar_info[:calendar_description] = calendar_description if calendar_description.present?

        calendar_order = extract_text(prop_stat_node.xpath("D:prop/ical:calendar-order", NS))
        calendar_info[:calendar_order] = calendar_order if calendar_order.present?

        ctag = extract_text(prop_stat_node.xpath("D:prop/cs:getctag", NS))
        calendar_info[:ctag] = ctag if ctag.present?

        calendar_components = prop_stat_node.xpath("D:prop/caldav:supported-calendar-component-set/caldav:comp", NS)
        calendar_components = extract_supported_calendar_components(calendar_components)
        calendar_info[:calendar_components] = calendar_components if calendar_components.present?
      end

      ret << calendar_info
    end

    ret
  end

  def query_events(calendar_url, options = nil)
    response = run_report(calendar_url, query_events_request(options), depth: 1)
    return unless response.success?

    puts response.body
    doc = Nokogiri::XML(response.body)
    ret = []
    doc.xpath("//D:response", NS).each do |response_node|
      href = extract_text(response_node.xpath("D:href", NS).first)
      next if href.blank?

      event_info = {}
      response_node.xpath("D:propstat", NS).each do |prop_stat_node|
        status = extract_text(prop_stat_node.xpath("D:status", NS))
        next if !status.include?("200")

        etag = extract_text(prop_stat_node.xpath("D:prop/D:getetag", NS).first)
        event_info[:etag] = etag if etag.present?

        calendar_data = extract_text(prop_stat_node.xpath("D:prop/caldav:calendar-data", NS).first)
        event_info[:calendar_data] = calendar_data if calendar_data.present?
      end

      ret << event_info
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

  def run_report(url, body, depth: nil)
    http_client = create_http_client(url)
    count = 0
    response = nil
    while count < 2
      response = http_client.run_request(:report, nil, nil, nil) do |request|
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
      "",
      refresh_token: refresh_token, client_id: client_id, client_secret: client_secret, grant_type: "refresh_token"
    )
    return false unless response.success?

    token_info = JSON.parse(response.body)
    @access_token = token_info["access_token"]
    true
  end

  def extract_text(node)
    return if node.blank?

    node.text
  end

  def extract_privileges(nodes)
    ret = []
    return ret if nodes.blank?

    nodes.each do |node|
      next if node.node_type != 1

      # ret << [ node.namespace.try(:href), node.name ].compact.join(":")
      ret << node.name
    end
    ret
  end

  def extract_resource_types(nodes)
    ret = []
    return ret if nodes.blank?

    nodes.each do |node|
      next if node.node_type != 1

      # ret << [ node.namespace.try(:href), node.name ].compact.join(":")
      ret << node.name
    end
    ret
  end

  def extract_supported_calendar_components(nodes)
    ret = []
    return ret if nodes.blank?

    nodes.each do |node|
      next if node.node_type != 1

      name_attr = node.attributes["name"]
      next if name_attr.blank?

      ret << name_attr.value
    end
    ret
  end

  def query_events_request(options)
    now = Time.zone.now.beginning_of_day

    start_at = options && options[:start]
    start_at ||= now - 1.year

    end_at = options && options[:end]
    end_at ||= now + 1.year

    query = <<~END_QUERY
      <?xml version="1.0" encoding="UTF-8"?>
      <caldav:calendar-query xmlns:D="DAV:" xmlns:caldav="urn:ietf:params:xml:ns:caldav">
        <D:prop>
          <D:getetag/>
          <caldav:calendar-data/>
        </D:prop>
        <caldav:filter>
          <caldav:comp-filter name="VCALENDAR">
            <caldav:comp-filter name="VEVENT">
              <caldav:time-range start="#{start_at.utc.strftime("%Y%m%dT%H%M%SZ")}" end="#{end_at.utc.strftime("%Y%m%dT%H%M%SZ")}"/>
            </caldav:comp-filter>
          </caldav:comp-filter>
        </caldav:filter>
      </caldav:calendar-query>
    END_QUERY

    query
  end
end
