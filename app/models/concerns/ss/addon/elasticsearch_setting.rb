module SS::Addon::ElasticsearchSetting
  extend ActiveSupport::Concern
  extend SS::Addon

  included do
    field :elasticsearch_state, type: String, default: 'disabled'
    field :elasticsearch_hosts, type: SS::Extensions::Words

    permit_params :elasticsearch_state, :elasticsearch_hosts

    validates :elasticsearch_state, inclusion: { in: %w(disabled enabled), allow_blank: true }
    validates :elasticsearch_hosts, presence: true, if: ->{ elasticsearch_enabled? }
  end

  def elasticsearch_state_options
    %w(disabled enabled).map { |k| [I18n.t("ss.options.state.#{k}"), k] }
  end

  def elasticsearch_enabled?
    elasticsearch_state == 'enabled'
  end

  def elasticsearch_client
    return unless elasticsearch_enabled?
    @elasticsearch_client ||= Elasticsearch::Client.new(hosts: elasticsearch_hosts, logger: Rails.logger)
  end

  def elasticsearch_index_name
    "s#{id}"
  end
end
