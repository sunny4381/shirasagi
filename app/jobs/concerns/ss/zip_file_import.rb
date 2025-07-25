module SS::ZipFileImport
  extend ActiveSupport::Concern

  def perform(temp_file_id)
    @cur_file = SS::File.find(temp_file_id)
    Rails.logger.tagged(@cur_file.filename) do
      import_file
    end
  ensure
    if @cur_file && @cur_file.model == 'ss/temp_file'
      @cur_file.destroy
    end
  end

  module ClassMethods
    def import_from_zip(file, bindings = {})
      require 'zip'
      require 'nkf'
      Zip::File.open(file) do |archive|
        archive.each do |entry|
          uploaded_file = ::Fs::UploadedFile.new("ss_file")
          begin
            uploaded_file.binmode
            uploaded_file.write(entry.get_input_stream.read)
            uploaded_file.rewind
            uploaded_file.original_filename = SS::Zip.safe_zip_entry_name(entry)
            uploaded_file.content_type = 'text/csv'

            temp_file = SS::TempFile.new
            temp_file.in_file = uploaded_file
            temp_file.save!
          ensure
            uploaded_file.close
          end

          self.bind(bindings).perform_now(temp_file.id)
        end
      end
    end
  end

  private

  def import_file
    # sub class must override this method
    raise NotImplementedError
  end
end
