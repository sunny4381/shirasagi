class Sys::Test::Shot::ArchiveJob < SS::ApplicationJob
  def perform(*args)
    @options = args.extract_options!
    @options = @options.with_indifferent_access
    @config = Sys::Test::Shot::Config.find(args.shift)

    prepare_archive
    create_archive
    finalize_archive
  end

  private

  def prepare_archive
    @output_zip = SS::ZipCreator.new("sys-test-shot.zip", user)
    @output_meta = ::Tempfile.new("meta", Rails.root.join("tmp").to_s)
    @archived_items = 0
  end

  def create_archive
    each_page do |page|
      add_page_to_archive(page)
    end
  end

  def each_page
    all_ids = @config.pages.pluck(:id).map(&:to_s)
    all_ids.each_slice(100) do |ids|
      @config.pages.in(id: ids).to_a.each do |page|
        yield page
      end
    end
  end

  def add_page_to_archive(page)
    entry_name = nil
    if ::File.exists?(page.image_path)
      dir = @archived_items / 1_000
      dir = dir.to_s.rjust(4, "0")
      name = page.id.to_s
      entry_name = "#{dir}/#{name}.png"
      @output_zip.create_entry(entry_name) do |f|
        ::File.open(page.image_path, "rb") do |data|
          ::FileUtils.copy_stream(data, f)
        end
      end
    end

    meta = {
      id: page.id.to_s, url: page.url, title: page.title, redirect_to: page.redirect_to, links: page.links, path: entry_name
    }
    @output_meta.write(meta.to_json)
    @output_meta.write("\n")

    @archived_items += 1
  end

  def finalize_archive
    return unless @output_zip

    @output_meta.flush
    @output_meta.rewind

    @output_zip.create_entry(".meta.json") do |f|
      ::FileUtils.copy_stream(@output_meta, f)
    end

    @output_meta.close
    @output_meta.unlink

    @output_zip.close
    puts "created: #{@output_zip.filename}"
  end
end
