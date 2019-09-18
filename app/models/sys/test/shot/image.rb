class Sys::Test::Shot::Image
  extend SS::Translation
  include SS::Document
  include SS::Relation::File
  include Sys::Permission

  set_permission_name "sys_users", :edit

  belongs_to :config, class_name: "Sys::Test::Shot::Config"
  field :url, type: String
  field :title, type: String
  belongs_to_file :file

  validates :config_id, presence: true
  validates :url, presence: true
end
