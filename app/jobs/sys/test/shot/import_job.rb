class Sys::Test::Shot::ImportJob < SS::ApplicationJob

  NULL_DEVICE = "/dev/null".freeze

  def perform(*args)
    @options = args.extract_options!
    @options = @options.with_indifferent_access
    @archive_file = SS::TempFile.where(id: args.shift).first
    @request_url = @options[:request_url].try { |url| URI.parse(url) rescue nil }

    prepare_import
    import_config
    import_pages
    finalize_import
  rescue => e
    Rails.logger.error("#{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")}")
  ensure
    if @archive_file.present?
      @archive_file.destroy rescue nil
    end
    @archive_file = nil
  end

  private

  def prepare_import
    @zip = Zip::File.open(@archive_file.path)
  end

  def finalize_import
    if @zip.present?
      @zip.close rescue nil
    end
    @zip = nil

    if @config.present?
      url = Rails.application.routes.url_helpers.sys_test_shot_path(id: @config)
      if @request_url
        url = ::URI.join(@request_url, url).to_s
      end

      Rails.logger.info("imported #{url}")

      message = SS::Notification.new
      message.cur_user      = user
      message.member_ids    = [user.id]
      message.send_date     = Time.zone.now
      message.subject       = "[Screenshot] インポートしました。"
      message.format        = 'text'
      message.text          = url
      message.save!
    end
  end

  def import_config
    config_entry = @zip.get_entry(".config.json")
    config_json = JSON.parse(config_entry.get_input_stream.read)
    attrs = config_json.except("_id", "updated", "created", "deleted", "state", "started", "closed", "interrupt", "current_count")
    attrs["config_name"] = "[複製] #{attrs["config_name"]}"

    @config = Sys::Test::Shot::Config.create!(attrs)
  end

  def import_pages
    meta_entry = @zip.get_entry(".meta.json")
    meta_array = []
    meta_entry.get_input_stream.each_line do |line|
      meta_array << JSON.parse(line.strip)
    end

    find_meta = proc do |entry_name|
      meta_array.find { |meta| meta["path"] == entry_name }
    end

    @zip.each do |entry|
      next unless entry.name.end_with?(".png")

      meta = find_meta.call(entry.name)
      if meta.blank?
        Rails.logger.warn("#{entry.name}: unable to find meta")
        next
      end

      page = Sys::Test::Shot::Page.new(meta.except("id", "path"))
      page.config = @config
      page.url_hash = Sys::Test::Shot::Page.gen_url_hash(page.url)
      result = page.save
      unless result
        Rails.logger.warn("failed to create page")
        Rails.logger.warn(page.errors.full_messages.join("¥n"))
        next
      end

      file_path = page.image_path
      dir = ::File.dirname(file_path)

      ::FileUtils.mkdir_p(dir) if !::Dir.exists?(dir)
      ::IO.copy_stream(entry.get_input_stream, file_path)

      tmp_path_thumb = page.temp_path(width: Sys::Test::Shot::Page::THUMBNAIL_SIZE)
      file_path_thumb = page.image_path(width: Sys::Test::Shot::Page::THUMBNAIL_SIZE)

      ::FileUtils.rm_f(tmp_path_thumb)
      pid = spawn({}, "convert", file_path, "-resize", "#{Sys::Test::Shot::Page::THUMBNAIL_SIZE}x", tmp_path_thumb, in: NULL_DEVICE, out: NULL_DEVICE, err: NULL_DEVICE)
      _, status = Process.waitpid2(pid)
      if status.exitstatus == 0 && ::File.exists?(tmp_path_thumb)
        ::FileUtils.mv(tmp_path_thumb, file_path_thumb, force: true)
      end
    end
  end
end
