module Article::Addon
  module FormExport
    extend ActiveSupport::Concern
    extend SS::Addon

    included do
      field :export_columns, type: SS::Extensions::Lines
      field :export_page_name, type: String
      field :export_filename, type: String

      belongs_to :form, class_name: 'Cms::Form'
      belongs_to :node, class_name: 'Article::Node::Page'

      permit_params :export_columns, :export_page_name, :export_filename
      permit_params :form_id, :node_id

      # validates :form_id, presence: true
      validate :validate_export_columns, if: -> { export_columns.present? }
    end

    def form_options
      Cms::Form.where(site_id: @cur_site.id, sub_type: 'static').map { |item| [item.name, item.id] }
    end

    def node_options
      Article::Node::Page.where(site_id: @cur_site.id).map { |item| [item.name, item.id] }
    end

    def resolve_page_name
      export_page_name.presence || Article::Page.t(:name)
    end

    def resolve_filename
      export_filename.presence || name
    end

    def export_csv_url
      "#{full_url}#{resolve_filename}.csv"
    end

    def export_json_url
      "#{full_url}#{resolve_filename}.json"
    end

    def validate_export_columns
      self.export_columns = export_columns.select(&:present?).uniq
    end

    def pages_to_csv(pages)
      csv = I18n.with_locale(I18n.default_locale) do
        CSV.generate do |data|
          pages_to_json(pages).each { |line| data << line }
        end
      end
      (SS::Csv::UTF8_BOM + csv).encode("UTF-8", invalid: :replace, undef: :replace)
    end

    def pages_to_json(pages)
      columns = export_columns.presence
      columns ||= form.columns.order(order: 1).map(&:name) if form
      columns ||= []

      article_url_label = I18n.t("mongoid.attributes.cms/model/page.full_url")
      data = [ [resolve_page_name ] + columns + [article_url_label] ]

      pages.each do |page|
        column_values_hash = page.column_values.map { |cv| [cv.name, cv.export_csv_cell] }.to_h
        values = columns.map { |col| column_values_hash[col].to_s }
        article_url_value = page.full_url || ""
        data << [page.name] + values + [article_url_value]
      end

      data
    end
  end
end
