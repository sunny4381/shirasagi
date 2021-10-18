class Uploader::JobFile
  extend SS::Translation
  include SS::Document
  include SS::SanitizerJobFile
  include SS::Reference::User
  include Cms::Reference::Site

  seqid :id
  field :path, type: String

  def basename
    path.to_s.sub(/.*\//, "")
  end

  def extname
    return "" unless path.to_s.include?('.')
    path.to_s.sub(/.*\W/, "")
  end

  def sanitizer_input_path
    time = created.to_i
    extension = ::File.extname(path)
    "#{Rails.root}/#{SS.config.ss.sanitizer_input}/uploader_#{id}_#{time}#{extension}"
  end

  def sanitizer_save
    input_path = sanitizer_input_path
    FileUtils.rm_f(input_path) if FileTest.exist?(input_path)
    FileUtils.cp(path, input_path)
  end

  def sanitizer_restore_file(output_path)
    # dir = ::File.dirname(path)
    # FileUtils.mkdir_p(dir) unless ::Dir.exist?(dir)
    FileUtils.mv(output_path, path, force: true)
    ::Uploader::File.auto_compile(path)
  end

  class << self
    def new_job(bindings)
      @job_bindings = bindings
      @job_args = []
      self
    end

    def upload(path)
      uploader = self.new(@job_bindings)
      uploader.path = path.delete_prefix("#{Rails.root}/")
      uploader.save!
      uploader.sanitizer_save
      uploader
    end

    def bind_mkdir(paths)
      @job_args << { mkdir: paths.map { |p| p.delete_prefix("#{Rails.root}/") } }
      self
    end

    def bind_mv(src, dst)
      @job_args << { mv: [src.delete_prefix("#{Rails.root}/"), dst.delete_prefix("#{Rails.root}/")] }
      self
    end

    def bind_rm(paths)
      @job_args << { rm: paths.map { |p| p.delete_prefix("#{Rails.root}/") } }
      self
    end

    def bind_text(path, data)
      @job_args << { text: [path.delete_prefix("#{Rails.root}/"), data] }
      self
    end

    def save_job
      return if @job_args.empty?
      Uploader::FilesJob.bind(@job_bindings).perform_later(@job_args)
    end

    def sanitizer_restore(output_path)
      filename = ::File.basename(output_path)
      return unless /\Auploader_\d+_\d+.*_\d+_marked/.match?(filename)

      id = filename.sub(/\Auploader_(\d+).*/, '\\1').to_i
      job_model = self.find(id) rescue nil
      return unless job_model

      job_model.sanitizer_restore_file(output_path)
      job_model.destroy
      return job_model
    rescue => e
      Rails.logger.error("sanitizer_restore: #{e} (#{output_path})")
      return nil
    end
  end
end
