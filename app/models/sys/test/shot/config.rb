class Sys::Test::Shot::Config
  include SS::Model::Task
  include Sys::Permission

  set_permission_name "sys_users", :edit

  default_scope ->{ where(name: "sys::test::shot") }

  field :config_name, type: String
  field :seeds, type: SS::Extensions::Lines
  field :allows, type: SS::Extensions::Lines
  field :denies, type: SS::Extensions::Lines

  has_many :images, class_name: 'Sys::Test::Shot::Image', dependent: :destroy, inverse_of: :config

  permit_params :config_name, :seeds, :allows, :denies

  validates :config_name, presence: true, length: { maximum: 80 }
end
