class Gws::Chat::Post
  extend SS::Translation
  include SS::Document
  include Gws::Reference::User
  include Gws::Reference::Site

  attr_accessor :cur_room
  belongs_to :room, class_name: 'Gws::Chat::Room'
  field :text, type: String
  permit_params :text

  before_validation :set_room

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
