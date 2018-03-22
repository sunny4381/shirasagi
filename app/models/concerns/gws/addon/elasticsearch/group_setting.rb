module Gws::Addon::Elasticsearch::GroupSetting
  extend ActiveSupport::Concern
  extend SS::Addon

  set_addon_type :organization

  included do
    field :elasticsearch_hosts, type: SS::Extensions::Words

    permit_params :elasticsearch_hosts

    validates :elasticsearch_hosts, presence: true, if: ->{ menu_elasticsearch_visible? }
  end

  def elasticsearch_enabled?
    Rails.logger.warn('[DEPRECATION] `elasticsearch_enabled?` is deprecated.  Please use `menu_elasticsearch_visible?` instead.')
    menu_elasticsearch_visible?
  end

  def elasticsearch_client
    return unless menu_elasticsearch_visible?
    @elasticsearch_client ||= Elasticsearch::Client.new(
      hosts: elasticsearch_normalize_urls(elasticsearch_hosts),
      logger: Rails.logger
    )
  end

  private

  def elasticsearch_normalize_urls(urls)
    urls.select(&:present?).map do |url|
      if url.ends_with?('/')
        url = url[0..-2]
      end

      url
    end
  end
end
