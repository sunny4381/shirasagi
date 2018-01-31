class Gws::Chat::PostsController < ApplicationController
  include Gws::BaseFilter
  include Gws::CrudFilter

  model Gws::Chat::Post

  before_action :set_cur_room
  before_action :set_crumbs

  private

  def set_crumbs
    @crumbs << [t('modules.gws/chat'), gws_chat_main_path]
    @crumbs << [@cur_room.name, gws_chat_room_posts_path(room_id: @cur_room)]
  end

  def set_cur_room
    @cur_room = Gws::Chat::Room.site(@cur_site).find(params[:room_id])
  end

  def fix_params
    { cur_user: @cur_user, cur_site: @cur_site, cur_room: @cur_room }
  end

  def crud_redirect_url
    { action: :index }
  end

  def set_items
    @items = @model.site(@cur_site).room(@cur_room).
      search(params[:s]).
      order_by(created: -1)
  end

  public

  def index
    raise '403' unless @cur_room.allowed?(:read, @cur_user, site: @cur_site)

    set_items
    @items = @items.page(params[:page]).per(20)

    @post = @model.new pre_params.merge(fix_params)

    render_opts = { file: 'index' }
    if request.xhr?
      render_opts[:layout] = false
    end

    render render_opts
  end

  def create
    raise '403' unless @cur_room.allowed?(:edit, @cur_user, site: @cur_site)

    @post = @model.new params.require(:post).permit(permit_fields).merge(fix_params)
    render_create @post.save, render: { file: :index }
  end

  def edit
    raise '403' unless @cur_room.allowed?(:edit, @cur_user, site: @cur_site)
    render
  end

  def update
    raise '403' unless @cur_room.allowed?(:edit, @cur_user, site: @cur_site)

    @item.attributes = get_params
    @item.in_updated = params[:_updated] if @item.respond_to?(:in_updated)
    render_update @item.update
  end

  def delete
    raise '403' unless @cur_room.allowed?(:delete, @cur_user, site: @cur_site)
    render
  end

  def destroy
    raise '403' unless @cur_room.allowed?(:delete, @cur_user, site: @cur_site)
    render_destroy @item.destroy
  end

  def check_updates
    safe_params = params.permit(:version, :timestamp)
    version = Integer(safe_params[:version])
    timestamp = Integer(safe_params[:timestamp])

    if version.blank? || timestamp.blank?
      head :no_content
      return
    end

    if @cur_room.version <= version
      head :no_content
      return
    end

    set_items
    @items = @items.gte(created: Time.zone.at(timestamp)).reorder(created: 1)
    # render file: '_index', layout: false
    respond_to do |format|
      format.html { render file: '_index', layout: false }
      format.json { render file: 'index' }
    end
  end
end
