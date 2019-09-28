class Sys::Test::Shot::Page
  extend SS::Translation
  include SS::Document
  include Sys::Permission

  set_permission_name "sys_users", :edit

  index({ config_id: 1, url_hash: 1 })

  belongs_to :config, class_name: "Sys::Test::Shot::Config"
  field :url, type: String
  field :url_hash, type: Integer
  field :title, type: String
  field :redirect_to, type: String

  validates :config_id, presence: true
  validates :url, presence: true
  validates :url_hash, presence: true

  SALT = "c92b1f9e2b812e8d88141aaaec4570ddcbdcd0fb9c86feb8aa03c9479fbf2171e9179a00fc7f4edf91a8c54bcb6b064fd84d01036aa63647ecb389fa9c29ff5b".freeze

  class << self
    def gen_url_hash(url)
      digest = Digest::MD5.hexdigest(url.to_s + SALT)
      # divided by 2 means right 1bit shift. so this value is safe as signed integer
      [ digest ].pack("H*").unpack("N").first / 2
    end
  end

  def path
    dir_part = id.to_s.chars.each_slice(6).to_a.last(2).map(&:join).join("/")
    "#{SS::File.root}/sys_test_shot_pages/#{dir_part}/_/#{id}"
  end

  def image_path
    "#{path}/#{url_hash.to_s(16)}.png"
  end

  def temp_path
    "#{path}/.#{url_hash.to_s(16)}.png"
  end
end
