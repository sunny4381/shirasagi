module Fs
  if SS.config.env.storage == "grid_fs"
    include ::Fs::GridFs
  else
    include ::Fs::File
  end

  def self.write_if_modified(path, data)
    updated = true
    if Fs.exists?(path)
      updated = false if data == Fs.read(path)
    end
    return unless updated

    Fs.write(path, data)
  end
end
