class Sys::Test::Shot::Config
  include SS::Model::Task
  include Sys::Permission

  set_permission_name "sys_users", :edit

  default_scope ->{ where(name: "sys::test::shot") }

  field :config_name, type: String
  field :seeds, type: SS::Extensions::Lines
  field :allows, type: SS::Extensions::Lines
  field :denies, type: SS::Extensions::Lines
  field :timeout, type: Integer, default: 60
  field :max_count, type: Integer
  field :strip_query_part, type: String, default: "enabled"

  has_many :pages, class_name: 'Sys::Test::Shot::Page', dependent: :destroy, inverse_of: :config
  has_many :queues, class_name: 'Sys::Test::Shot::Queue', dependent: :destroy, inverse_of: :config
  permit_params :config_name, :seeds, :allows, :denies, :timeout, :max_count, :strip_query_part

  validates :config_name, presence: true, length: { maximum: 80 }
  validates :timeout, numericality: { greater_than_or_equal_to: 1, allow_blank: true }
  validates :max_count, numericality: { greater_than_or_equal_to: 1, allow_blank: true }
  validates :strip_query_part, inclusion: { in: %w(enabled disabled), allow_blank: true }

  def strip_query_part_options
    %w(enabled disabled).map { |v| [ I18n.t("ss.options.state.#{v}"), v ] }
  end

  def strip_query_part?
    strip_query_part.blank? || strip_query_part == "enabled"
  end

  def visited?(url)
    url_hash = Sys::Test::Shot::Page.gen_url_hash(url)
    Sys::Test::Shot::Page.where(config_id: id, url: url, url_hash: url_hash).present?
  end
end
