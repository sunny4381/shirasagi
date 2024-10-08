class Opendata::Dataset::UrlResourcesController < ApplicationController
  include Cms::BaseFilter
  include Cms::CrudFilter

  model Opendata::UrlResource

  navi_view "opendata/main/navi"

  before_action :set_dataset

  private

  def dataset
    @dataset ||= Opendata::Dataset.site(@cur_site).node(@cur_node).find params[:dataset_id]
  end

  def set_dataset
    raise "403" unless dataset.allowed?(:edit, @cur_user, site: @cur_site, node: @cur_node)
    @crumbs << [@dataset.name, opendata_dataset_path(id: @dataset)]
  end

  def set_item
    @item = dataset.url_resources.find params[:id]
  end

  def fix_params
    { cur_user: @cur_user }
  end

  public

  def index
    @items = @dataset.url_resources.
      allow(:read, @cur_user, site: @cur_site, node: @cur_node, owned: true).
      search(params[:s]).
      order_by(name: 1).
      page(params[:page]).per(50)
  end

  def new
    @item = @model.new pre_params.merge(fix_params)
    raise "403" unless @item.allowed?(:edit, @cur_user, site: @cur_site, node: @cur_node, owned: true)
  end

  def create
    @item = @dataset.url_resources.new get_params
    render_create @item.save
  end

  def download
    @item = @dataset.url_resources.find params[:url_resource_id]
    send_file @item.file.path, type: @item.content_type, filename: File.basename(@item.filename),
      disposition: :attachment, x_sendfile: true
  end

  def content
    @item = @dataset.url_resources.find params[:url_resource_id]
    @data = @item.parse_tsv
  end
end

