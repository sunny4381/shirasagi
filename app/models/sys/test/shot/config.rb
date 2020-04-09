class Sys::Test::Shot::Config
  include SS::Model::Task
  include Sys::Permission

  set_permission_name "sys_users", :edit

  default_scope ->{ where(name: "sys::test::shot") }

  MAX_FORM_COUNT = 3
  MAX_INPUT_COUNT = 3

  field :config_name, type: String
  field :seeds, type: SS::Extensions::Lines
  field :allows, type: SS::Extensions::Lines
  field :denies, type: SS::Extensions::Lines
  field :timeout, type: Integer, default: 60
  field :max_count, type: Integer
  field :strip_query_part, type: String, default: "enabled"
  attr_accessor :in_window_size
  field :window_size_width, type: Integer, default: 1680
  field :window_size_height, type: Integer, default: 1050
  field :capture_size, type: String, default: "visible"
  field :image_quality, type: Integer, default: 30
  field :basic_auth_user, type: String
  attr_accessor :in_basic_auth_password
  field :basic_auth_password, type: String

  MAX_FORM_COUNT.times do |i|
    field "form#{i}_check_css_selector", type: String
    MAX_INPUT_COUNT.times do |j|
      field "form#{i}_input#{j}_css_selector", type: String
      field "form#{i}_input#{j}_value", type: String
    end
  end

  has_many :pages, class_name: 'Sys::Test::Shot::Page', dependent: :destroy, inverse_of: :config
  has_many :queues, class_name: 'Sys::Test::Shot::Queue', dependent: :destroy, inverse_of: :config

  permit_params :config_name, :seeds, :allows, :denies, :timeout, :max_count, :strip_query_part
  permit_params :in_window_size, :window_size_width, :window_size_height
  permit_params :capture_size, :image_quality, :basic_auth_user, :in_basic_auth_password
  MAX_FORM_COUNT.times do |i|
    permit_params "form#{i}_check_css_selector".to_sym
    MAX_INPUT_COUNT.times do |j|
      permit_params "form#{i}_input#{j}_css_selector".to_sym, "form#{i}_input#{j}_value".to_sym
    end
  end

  before_validation :set_window_size
  before_validation :set_basic_auth_password

  validates :config_name, presence: true, length: { maximum: 80 }
  validates :timeout, numericality: { greater_than_or_equal_to: 1, allow_blank: true }
  validates :max_count, numericality: { greater_than_or_equal_to: 1, allow_blank: true }
  validates :strip_query_part, inclusion: { in: %w(enabled disabled), allow_blank: true }
  validates :capture_size, inclusion: { in: %w(visible full), allow_blank: true }
  validates :image_quality, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100, allow_blank: true }

  def strip_query_part_options
    %w(enabled disabled).map { |v| [ I18n.t("ss.options.state.#{v}"), v ] }
  end

  def window_size
    "#{window_size_width}x#{window_size_height}"
  end

  def window_size_options
    [
      [ "640x960 (iPhone 4)", "640x960" ],
      [ "750x1334 (iPhone 6,7,8)", "750x1334" ],
      [ "1024x768 (XGA)", "1024x768" ],
      [ "1280x800 (WXGA)", "1280x800" ],
      [ "1280x1024 (SXGA)", "1280x1024" ],
      [ "1366x768 (FWXGA)", "1366x768" ],
      [ "1680x1050 (WSXGA+)", "1680x1050" ],
      [ "1920x1080 (2K; Full-HD)", "1920x1080" ],
      [ "2560x1440 (WQHD)", "2560x1440" ],
      [ "2560x1440 (4K)", "3840x2160" ]
    ]
  end

  def capture_size_options
    %w[visible full]
  end

  def strip_query_part?
    strip_query_part.blank? || strip_query_part == "enabled"
  end

  def visited?(url)
    url_hash = Sys::Test::Shot::Page.gen_url_hash(url)
    Sys::Test::Shot::Page.where(config_id: id, url: url, url_hash: url_hash).present?
  end

  def capture_full?
    capture_size == "full"
  end

  def basic_auth?
    basic_auth_user.present? && basic_auth_password.present?
  end

  def basic_auth_token
    Base64.strict_encode64("#{basic_auth_user}:#{SS::Crypt.decrypt(basic_auth_password)}")
  end

  private

  def set_window_size
    return if in_window_size.blank?

    width, height = in_window_size.split("x", 2)
    return if !width.numeric? || !height.numeric?

    self.window_size_width = width.to_i
    self.window_size_height = height.to_i
  end

  def set_basic_auth_password
    return if in_basic_auth_password.blank?
    self.basic_auth_password = SS::Crypt.encrypt(in_basic_auth_password)
  end
end
