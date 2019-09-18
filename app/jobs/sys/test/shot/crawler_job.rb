require "webdrivers"
require "selenium-webdriver"
require 'nokogiri'

class Sys::Test::Shot::CrawlerJob < SS::ApplicationJob
  def perform(*args)
    @options = args.extract_options!
    @options = @options.with_indifferent_access
    @config = Sys::Test::Shot::Config.find(args.shift)

    @config.images.destroy_all

    @seq = 0
    @visited = []
    @pool = @config.seeds.dup
    @last_reported_at = Time.zone.now
    loop do
      break if @pool.blank?

      url = @pool.shift
      next if url.blank?

      try_count = 0
      captured_exception = nil
      while try_count < 3
        begin
          process(url)
          captured_exception = nil
          break
        rescue => e
          captured_exception ||= e
          try_count += 1
          sleep 5
        end
      end

      if captured_exception
        base_message = "#{captured_exception.class} (#{captured_exception.message}):"
        back_trace = "  #{captured_exception.backtrace.join("\n  ")}"
        Rails.logger.error("#{base_message}:\n#{back_trace}")
      end

      if @last_reported_at + 5.minutes <= Time.zone.now
        Rails.logger.info("there are #{@pool.count.to_s(:delimited)} urls waiting to crawl")
        @last_reported_at = Time.zone.now
      end

      break if @options["max_count"].numeric? && @visited.count >= @options["max_count"].to_i
    end

    Rails.logger.info("done #{@visited.count.to_s(:delimited)} urls")
  ensure
    @driver.quit if @driver
  end

  private

  def driver
    @driver ||= begin
      options = Selenium::WebDriver::Chrome::Options.new
      options.add_preference('download.prompt_for_download', false)
      options.add_preference('download.default_directory', Rails.root.join("tmp").to_s)
      options.add_argument('window-size=1680,1050')
      options.add_argument('--headless')
      options.add_argument('disable-gpu')
      options.add_argument('no-sandbox')

      driver = Selenium::WebDriver.for(:chrome, options: options)
      driver.manage.timeouts.implicit_wait = @options["timeout"].presence || 60
      driver
    end
  end

  def allowed?(url)
    @compiled_allows ||= @config.allows.map { |allow| compile(allow) }
    @compiled_denies ||= @config.denies.map { |deny| compile(deny) }

    return false if @compiled_allows.none? { |allow| allow.match?(url) }
    return false if @compiled_denies.any? { |deny| deny.match?(url) }

    true
  end

  def compile(pattern)
    if pattern.start_with?("regex:")
      /#{pattern.sub("regex:", "")}/
    else
      /#{::Regexp.escape(pattern)}/
    end
  end

  def process(url)
    if @visited.include?(url)
      Rails.logger.debug("#{url}: already took")
      return
    end

    Rails.logger.debug("#{url}: visiting")
    time = Benchmark.realtime do
      driver.get(url)
    end
    Rails.logger.info("#{url}: visited (#{time * 1000} ms)")

    time = Benchmark.realtime do
      save_screen_shot
    end
    Rails.logger.info("#{url}: saved screen shot (#{time * 1000} ms)")

    time = Benchmark.realtime do
      extract_urls_and_enqueue
    end
    Rails.logger.info("#{url}: extracted links (#{time * 1000} ms)")

    current_url = URI.parse(driver.current_url).to_s
    @visited << current_url
    if url != current_url
      @visited << url
    end

    if login_form?
      time = Benchmark.realtime do
        login
      end
      Rails.logger.info("#{url}: logged in (#{time * 1000} ms)")

      time = Benchmark.realtime do
        save_screen_shot
      end
      Rails.logger.info("#{url}: saved screen shot (#{time * 1000} ms)")

      time = Benchmark.realtime do
        extract_urls_and_enqueue
      end
      Rails.logger.info("#{url}: extracted links (#{time * 1000} ms)")

      current_url = URI.parse(driver.current_url).to_s
      @visited << current_url
    end
  end

  def save_screen_shot
    current_url = URI.parse(driver.current_url)
    file = SS::File.create_empty!(
      cur_user: user, name: "#{@seq}.png", filename: "#{@seq}.png",
      content_type: "image/png", model: 'ss/file'
    ) do |file|
      dir = ::File.dirname(file.path)
      base = ::File.basename(file.path)
      driver.save_screenshot("#{dir}/.#{base}.png")
      ::FileUtils.mv("#{dir}/.#{base}.png", file.path, force: true)
    end
    @seq += 1

    Sys::Test::Shot::Image.create!(config: @config, url: current_url.to_s, title: driver.title, file: file)
  end

  def extract_urls_and_enqueue
    html = driver.page_source.to_s
    return if html.blank?

    current_url = URI.parse(driver.current_url)

    # nokogiri を利用して高速化
    doc = Nokogiri::HTML.parse(html) rescue nil
    return if doc.blank?

    anchors = doc.css('a')
    return if anchors.blank?

    anchors.each do |anchor|
      rel = anchor.attribute("rel")
      next if rel.present? && rel.value == "nofollow"

      href = anchor.attribute("href")
      next if href.blank?

      href = href.value.to_s.strip
      next if href.blank? || href.start_with?("#") || href.start_with?("javascript:")

      url = URI.join(current_url, href).to_s rescue nil
      next if url.blank?
      next if !url.start_with?("http:") && !url.start_with?("https:")

      Rails.logger.info("#{current_url} refers to #{url}")

      if !allowed?(url)
        Rails.logger.debug("#{url}: not allowed")
        next
      end

      url = normalize_url(url)
      next if url.blank?

      if @visited.include?(url)
        Rails.logger.debug("#{url}: already took")
        next
      end

      if !@pool.include?(url)
        @pool << url
      end
    end
  end

  def normalize_url(url)
    parsed_url = URI.parse(url)
    return if !parsed_url.respond_to?(:query=)
    return if !parsed_url.respond_to?(:fragment=)

    parsed_url.query = nil
    parsed_url.fragment = nil
    parsed_url.to_s
  end

  def login_form?
    html = driver.page_source.to_s
    html.include?('<input type="submit" name="commit" value="ログイン" class="btn-primary">')
  end

  def login
    driver.find_element(:name, "item[email]").send_keys("sys")
    driver.find_element(:name, "item[password]").send_keys("pass")
    driver.find_element(:name, "commit").click

    sleep 2
  end
end
