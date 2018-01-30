module Gws::Addon::Chat::Avatar
  extend ActiveSupport::Concern
  extend SS::Addon
  include SS::Relation::File

  included do
    belongs_to_file :avatar_image, resizing: [ 114, 114 ]
  end
end
