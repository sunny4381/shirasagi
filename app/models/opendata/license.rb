class Opendata::License
  include SS::Document
  include SS::Reference::User
  include SS::Reference::Site
  include SS::Relation::File
  include Opendata::Addon::Harvest::License
  include Opendata::Addon::Metadata::License
  include Cms::Addon::GroupPermission
  include Fs::FilePreviewable

  set_permission_name :opendata_datasets

  seqid :id
  field :state, type: String, default: "public"
  field :name, type: String
  field :related_url, type: String
  field :order, type: Integer, default: 0
  field :default_state, type: String

  belongs_to_file :file

  permit_params :state, :name, :related_url, :order, :default_state
  permit_params file_ids: []

  validates :state, presence: true, inclusion: { in: %w(public closed), allow_blank: true }
  validates :name, presence: true, length: { maximum: 80 }
  validates :file_id, presence: true
  validates :default_state, inclusion: { in: %w(none default), allow_blank: true }

  scope :and_default, -> { where(default_state: 'default') }

  def state_options
    %w(public closed).map do |v|
      [ I18n.t("opendata.state_options.#{v}"), v ]
    end
  end

  def default_state_options
    %w(default).map do |v|
      [ I18n.t("opendata.default_state_options.#{v}"), v ]
    end
  end

  def file_previewable?(file, site:, user:, member:)
    state == "public"
  end

  class << self
    def and_public(_date = nil)
      where(state: "public")
    end

    def search(params)
      criteria = self.where({})
      return criteria if params.blank?

      criteria = criteria.keyword_in params[:keyword], :name if params[:keyword].present?
      criteria
    end
  end
end
