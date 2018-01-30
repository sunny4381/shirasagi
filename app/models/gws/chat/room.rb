class Gws::Chat::Room
  extend SS::Translation
  include SS::Document
  include Gws::Reference::Site
  include Gws::Addon::Member
  include Gws::Addon::ReadableSetting
  include Gws::Addon::History
  include Gws::Addon::GroupPermission

  # set_permission_name "gws_chat_rooms"

  attr_accessor :cur_user
  field :name, type: String
  permit_params :name
  validates :name, presence: true, length: { maximum: 80 }

  class << self
    def search(params = {})
      criteria = all.search_name(params)
      criteria = criteria.search_keyword(params)
      criteria
    end

    def search_keyword(params)
      return all if params.blank? || params[:keyword].blank?
      all.keyword_in(params[:keyword], :name)
    end

    def search_name(params)
      return all if params.blank? || params[:name].blank?
      all.search_text(params[:name])
    end
  end
end
