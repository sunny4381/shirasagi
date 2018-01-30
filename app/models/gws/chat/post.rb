class Gws::Chat::Post
  extend SS::Translation
  include SS::Document
  include Gws::Reference::User
  include Gws::Reference::Site

  belongs_to :room, class_name: 'Gws::Chat::Room'
  field :text, type: String
end
