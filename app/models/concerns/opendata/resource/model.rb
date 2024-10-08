module Opendata::Resource::Model
  extend ActiveSupport::Concern
  include SS::Relation::File
  include SS::Reference::User
  include Cms::Addon::GroupPermission

  included do
    set_permission_name "opendata_resources"

    seqid :id
    field :state, type: String, default: "public"
    field :name, type: String
    field :filename, type: String
    field :text, type: String
    field :format, type: String
    field :source_url, type: String

    belongs_to :license, class_name: "Opendata::License"
    belongs_to_file :file
    belongs_to_file :tsv

    validates :name, presence: true
    validates :license_id, presence: true

    scope :and_public, -> { where state: "public" }
  end

  def url
    return source_url if source_url.present?
    file.url
  end

  def full_url
    return source_url if source_url.present?
    file.full_url
  end

  def content_url
    return source_url if source_url.present?
    dataset.url.sub(/\.html$/, "") + "#{Addressable::URI.escape(context_path)}/#{id}/content.html"
  end

  def download_url
    n = source_url.present? ? "source-url" : filename
    dataset.url.sub(/\.html$/, "") + "#{Addressable::URI.escape(context_path)}/#{id}/#{Addressable::URI.escape(n)}"
  end

  def download_full_url
    n = source_url.present? ? "source-url" : filename
    dataset.full_url.sub(/\.html$/, "") + "#{Addressable::URI.escape(context_path)}/#{id}/#{Addressable::URI.escape(n)}"
  end

  def path
    file ? file.path : nil
  end

  def content_type
    file ? file.content_type : nil
  end

  def size
    file ? file.size : nil
  end

  def relation_file(name, opts = {})
    file = super(name, opts)
    file.site_id = dataset.site.id rescue nil

    if in_file
      file.filename = file.in_file.original_filename
      file.name = file.in_file.original_filename
    end

    file
  end

  def state_options
    [
      [I18n.t('ss.options.state.public'), 'public'],
      [I18n.t('ss.options.state.closed'), 'closed'],
    ]
  end

  module ClassMethods
    def format_options
      %w(AVI BMP CSV DOC DOCX DOT GIF HTML JPG LZH MOV MP3 MPG ODS
         ODT OTS OTT PDF PNG PPT PPTX RAR RTF RDF TAR TGZ TTL TXT WAV XLS XLT XLSX XML ZIP)
    end

    def search(params)
      criteria = self.where({})
      return criteria if params.blank?

      criteria = criteria.where(name: /#{params[:keyword]}/) if params[:keyword].present?
      criteria = criteria.where(format: params[:format].upcase) if params[:format].present?

      criteria
    end
  end
end
