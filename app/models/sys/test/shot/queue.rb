class Sys::Test::Shot::Queue
  extend SS::Translation
  include SS::Document
  include Voice::Lockable

  index({ config_id: 1, url_hash: 1 })

  belongs_to :config, class_name: "Sys::Test::Shot::Config"
  field :url, type: String
  field :url_hash, type: Integer

  validates :config_id, presence: true
  validates :url, presence: true
  validates :url_hash, presence: true

  class << self
    def enqueue!(config, url)
      url_hash = Sys::Test::Shot::Page.gen_url_hash(url)
      all.unscoped.where(config_id: config.id, url: url, url_hash: url_hash).first_or_create!
    end

    def dequeue(now = Time.zone.now)
      lock_timeout ||= now + 5.minutes

      criteria = all.lt(lock_until: now)
      criteria.find_one_and_update({ '$set' => { lock_until: lock_timeout }}, return_document: :after)
    end

    def search(params = {})
      all.search_keyword(params)
    end

    def search_keyword(params = {})
      return all if params.blank? || params[:keyword].blank?

      all.keyword_in(params[:keyword], :url)
    end
  end
end
