class Opendata::Metadata::Importer::CategorySettingsController < ApplicationController
  include Cms::BaseFilter
  include Cms::CrudFilter

  model Opendata::Metadata::Importer::CategorySetting

  before_action :set_importer
  before_action :set_crumbs

  navi_view "opendata/main/navi"

  private

  def set_crumbs
    @crumbs << [t('opendata.metadata'), opendata_metadata_importers_path]
    @crumbs << [@category.name, { action: :index }] if @category
  end

  public

  def fix_params
    set_importer
    { cur_user: @cur_user, cur_site: @cur_site, importer: @importer }
  end

  def set_importer
    @importer = Opendata::Metadata::Importer.site(@cur_site).node(@cur_node).find(params[:importer_id])
    if params[:category_id] != '-'
      @category = Opendata::Node::Category.site(@cur_site).find(params[:category_id])
    end
  end

  def index
    @items = @importer.category_settings.where(category_id: @category.id)
  end

  def download
    csv = @model.where(importer_id: @importer.id).to_csv
    send_data csv.encode("SJIS", invalid: :replace, undef: :replace), filename: "metadata_category_#{Time.zone.now.to_i}.csv"
  end

  def import
    return if request.get? || request.head?

    @item = @model.new(get_params)
    result = @item.import
    flash.now[:notice] = t("ss.notice.saved") if result
    render_create result, location: { action: :import }, render: { template: "import" }
  end
end
