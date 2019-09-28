require "webdrivers"
require "selenium-webdriver"
require 'nokogiri'

class Sys::Test::Shot::CrawlerJob < SS::ApplicationJob
  include Job::SS::TaskFilter

  NULL_DEVICE = "/dev/null".freeze

  self.task_class = Sys::Test::Shot::Config
  self.task_name = "sys::test::shot"

  def perform(*args)
    @options = args.extract_options!
    @options = @options.with_indifferent_access

    @max_count = @options["max_count"].numeric? ? @options["max_count"].to_i : task.max_count

    if task.queues.blank? || @options["restart"]
      task.pages.destroy_all
      task.seeds.each do |url|
        Sys::Test::Shot::Queue.enqueue!(task, url)
      end
    end

    @visited_count = 0
    @last_reported_at = Time.zone.now
    loop do
      break if task.queues.blank?

      queue = task.queues.dequeue
      break if queue.blank?

      try_count = 0
      captured_exception = nil
      while try_count < 3
        begin
          process(queue.url)
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
      else
        queue.destroy
      end

      if @last_reported_at + 5.minutes <= Time.zone.now
        Rails.logger.info("there are #{task.queues.count.to_s(:delimited)} urls waiting to crawl")
        @last_reported_at = Time.zone.now
      end

      break if @max_count && @max_count != 0 && @visited_count >= @max_count
    end

    Rails.logger.info("done #{@visited_count.to_s(:delimited)} urls")
  ensure
    @driver.quit if @driver
  end

  private

  def task_cond
    { id: arguments.first }
  end

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
      driver.manage.timeouts.implicit_wait = @options["timeout"].presence || task.timeout || 60
      driver
    end
  end

  def allowed?(url)
    @compiled_allows ||= task.allows.map { |allow| compile(allow) }
    @compiled_denies ||= task.denies.map { |deny| compile(deny) }

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
    @page = nil
    if task.visited?(url)
      Rails.logger.debug("#{url}: already visited")
      return
    end

    Rails.logger.debug("#{url}: visiting")
    time = Benchmark.realtime { driver.get(url) }
    Rails.logger.info("#{url}: visited (#{time * 1000} ms)")

    current_url = URI.parse(driver.current_url).to_s
    @page = Sys::Test::Shot::Page.where(
      config_id: task.id, url: current_url, url_hash: Sys::Test::Shot::Page.gen_url_hash(current_url)
    ).first_or_create
    @page.update(title: driver.title)

    time = Benchmark.realtime { save_screen_shot }
    Rails.logger.info("#{url}: saved screen shot (#{time * 1000} ms)")

    time = Benchmark.realtime { extract_urls_and_enqueue }
    Rails.logger.info("#{url}: extracted links (#{time * 1000} ms)")

    @visited_count += 1
    if url != current_url
      page = Sys::Test::Shot::Page.where(
        config_id: task.id, url: url, url_hash: Sys::Test::Shot::Page.gen_url_hash(url)
      ).first_or_create
      page.update(title: @page.title, redirect_to: current_url)
    end

    task.log(url)
    task.inc(current_count: 1)

    if login_form?
      time = Benchmark.realtime do
        login
      end
      Rails.logger.info("#{url}: logged in (#{time * 1000} ms)")

      current_url = URI.parse(driver.current_url).to_s
      @page = Sys::Test::Shot::Page.where(
        config_id: task.id, url: current_url, url_hash: Sys::Test::Shot::Page.gen_url_hash(current_url)
      ).first_or_create
      @page.update(title: driver.title)

      time = Benchmark.realtime do
        save_screen_shot
      end
      Rails.logger.info("#{url}: saved screen shot (#{time * 1000} ms)")

      time = Benchmark.realtime do
        extract_urls_and_enqueue
      end
      Rails.logger.info("#{url}: extracted links (#{time * 1000} ms)")
    end
  end

  def save_screen_shot
    tmp_path = @page.temp_path
    file_path = @page.image_path
    dir = ::File.dirname(file_path)

    ::FileUtils.mkdir_p(dir) if !::Dir.exists?(dir)
    driver.save_screenshot(tmp_path)
    ::FileUtils.mv(tmp_path, file_path, force: true)

    tmp_path_thumb = @page.temp_path(width: Sys::Test::Shot::Page::THUMBNAIL_SIZE)
    file_path_thumb = @page.image_path(width: Sys::Test::Shot::Page::THUMBNAIL_SIZE)

    ::FileUtils.rm_f(tmp_path_thumb)
    pid = spawn({}, "convert", file_path, "-resize", "240x", tmp_path_thumb, in: NULL_DEVICE, out: NULL_DEVICE, err: NULL_DEVICE)
    _, status = Process.waitpid2(pid)
    if status.exitstatus == 0 && ::File.exists?(tmp_path_thumb)
      ::FileUtils.mv(tmp_path_thumb, file_path_thumb, force: true)
    end
  end

  def extract_urls_and_enqueue
    links = extract_urls
    @page.set(links: links)
    return if links.blank?

    links.each do |url|
      url = normalize_url(url)
      next if url.blank?

      if !allowed?(url)
        Rails.logger.debug("#{url}: not allowed")
        next
      end

      if task.visited?(url)
        Rails.logger.debug("#{url}: already visited")
        next
      end

      Sys::Test::Shot::Queue.enqueue!(task, url)
    end
  end

  def extract_urls
    html = driver.page_source.to_s
    return if html.blank?

    current_url = URI.parse(driver.current_url)

    # nokogiri を利用して高速化
    doc = Nokogiri::HTML.parse(html) rescue nil
    return if doc.blank?

    anchors = doc.css('a')
    return if anchors.blank?

    links = []
    anchors.each do |anchor|
      rel = anchor.attribute("rel")
      next if rel.present? && rel.value == "nofollow"

      href = anchor.attribute("href")
      next if href.blank?

      href = href.value.to_s.strip
      next if href.blank? || href.start_with?("#") || href.start_with?("javascript:")

      url = URI.join(current_url, href).to_s rescue nil
      next if url.blank?
      next unless url.start_with?("http:", "https:")

      Rails.logger.info("#{current_url} refers to #{url}")
      links << url
    end

    links
  end

  def normalize_url(url)
    parsed_url = URI.parse(url)
    return if !parsed_url.respond_to?(:query=)
    return if !parsed_url.respond_to?(:fragment=)

    if task.strip_query_part?
      parsed_url.query = nil
      parsed_url.fragment = nil
    end

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
