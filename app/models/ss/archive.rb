class SS::Archive
  class << self
    def open(path)
      instance = new path
      begin
        yield instance
      ensure
        instance.close
      end
    end
  end

  def initialize(path)
    @path = path
    @zip = Zip::File.open(@path)
  end

  def close
    @zip.close
  end

  def [](name)
    entry = @zip.find_entry(name)
    return if entry.blank?

    @zip.get_input_stream(entry) do |f|
      f.read
    end
  end
end
