class Gws::Chat::Post
  extend SS::Translation
  include SS::Document
  include SS::Relation::File
  include Gws::Reference::User
  include Gws::Reference::Site

  attr_accessor :cur_room
  belongs_to :room, class_name: 'Gws::Chat::Room'
  field :text, type: String
  belongs_to_file :file, resizing: [ 1024, 1024 ]
  permit_params :text

  before_validation :set_room
  validates :text, presence: true, if: ->{ in_file.blank? && file.blank? }
  validates :text, length: { maximum: 400 }

  scope :room, ->(room) { where(room_id: room.id) }

  class << self
    def search(params = {})
      all.search_keyword(params)
    end

    def search_keyword(params)
      return all if params.blank? || params[:keyword].blank?
      all.keyword_in(params[:keyword], :text)
    end
  end

  private

  def set_room
    return if @cur_room.blank?
    self.room = @cur_room
  end
end
