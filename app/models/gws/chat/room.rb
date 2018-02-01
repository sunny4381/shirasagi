class Gws::Chat::Room
  extend SS::Translation
  include SS::Document
  include Gws::Reference::Site
  include Gws::Addon::Member
  include Gws::Addon::ReadableSetting
  include Gws::Addon::History
  include Gws::Addon::GroupPermission

  # set_permission_name "gws_chat_rooms"
  RECENT_HOURS = 1

  attr_accessor :cur_user
  field :name, type: String
  field :version, type: Integer, default: 0
  has_many :posts, inverse_of: :room, class_name: 'Gws::Chat::Post', dependent: :destroy

  permit_params :name

  validates :name, presence: true, length: { maximum: 80 }

  after_save :increment_version
  after_save :generate_recent_cache

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

  def increment_version
    self.inc(version: 1)
  end

  def cache_key
    "#{model_key}/#{id}-#{version}"
  end

  def generate_recent_cache
    filepath = recent_cache_filepath
    parent_dir = ::File.dirname(filepath)
    if !::Dir.exist?(parent_dir)
      ::FileUtils.mkdir_p(parent_dir)
    end

    tmp_filepath = "#{parent_dir}/.#{::File.basename(filepath)}.tmp"
    open(tmp_filepath, 'w') do |f|
      f.puts encode_recent_posts_to_json
    end

    ::FileUtils.mv(tmp_filepath, filepath, force: true)
  end

  def recent_cache_filepath
    @recent_cache_filepath ||= begin
      time_part = id.to_s[0..7]
      significant_part = time_part[-4..-1]
      "#{SS::File.root}/gws_chat_rooms/#{significant_part.split(//).join('/')}/_/#{id}"
    end
  end

  private

  def recent_posts
    posts.gte(created: RECENT_HOURS.hours.ago).reorder(created: 1)
  end

  def encode_recent_posts_to_json
    Jbuilder.encode do |json|
      json.name name
      json.version version
      json.created created.to_i
      json.updated updated.to_i
      json.items(recent_posts) do |item|
        json.id item.id.to_s
        json.text item.text
        item.file.tap do |file|
          if file.present?
            json.file do
              json.name file.name
              json.basename file.basename
              json.is_image file.image? ? true : false
              json.content_type file.content_type
              json.url file.url
              json.extname file.extname
              if file.image?
                json.thumb_url file.thumb.url
              end
            end
          end
        end
        item.user.tap do |user|
          json.user do
            json.id user.id
            json.name user.name
            json.long_name user.long_name
            json.avatar do
              json.url Rails.application.routes.url_helpers.avatar_gws_user_path(site: item.site, id: user)
            end
          end
        end
        json.created item.created.to_i
        json.updated item.updated.to_i
      end
    end
  end
end
