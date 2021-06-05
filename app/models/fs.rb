module Fs
  if SS.config.env.storage == "grid_fs"
    include ::Fs::GridFs
  else
    include ::Fs::File
  end

  def self.write_if_modified(dest, data)
    updated = true
    if Fs.exists?(dest)
      updated = false if data == Fs.read(dest)
    end
    return unless updated

    Fs.write(dest, data)
  end
end
