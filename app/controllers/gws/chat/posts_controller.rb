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

  def set_search_params
    @s ||= begin
      s = params[:s] || {}
      s.delete_if { |_, v| v.blank? }
    end
  end

  def set_items
    set_search_params
    @items = @model.site(@cur_site).room(@cur_room).
      search(@s).
      order_by(created: -1)
  end

  public

  def index
    raise '403' unless @cur_room.allowed?(:read, @cur_user, site: @cur_site)

    set_items
    @items = @items.page(params[:page]).per(20)

    @post = @model.new pre_params.merge(fix_params)

    if @s.blank? && @items.first_page?
      render_opts = { file: 'index_with_cache' }
    else
      render_opts = { file: 'index' }
    end

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
    version = safe_params[:version].to_i
    timestamp = safe_params[:timestamp].to_i

    if version <= 0 || timestamp <= 0
      head :bad_request
      return
    end

    if @cur_room.version <= version
      head :no_content
      return
    end

    if timestamp <= Gws::Chat::Room::RECENT_HOURS.hours.ago.to_i
      # 新着チェックできるのは Gws::Chat::Room::RECENT_HOURS 時間以内の範囲
      # 指定されたタイムスタンプが古過ぎで新着をチェックできない。
      #
      # 次のようなケースが想定される
      # 1. パソコンがスリープ状態になり、翌日復帰した。
      # 2. スマホがスリープ状態になり、Gws::Chat::Room::RECENT_HOURS 時間以上経過してから復帰した。
      #
      # この場合、ブラウザをリロードすることで復旧させる。
      # （ブラウザをリローする処理は javascript に記述する）
      head :not_acceptable
      return
    end

    if !::File.exist?(@cur_room.recent_cache_filepath)
      @cur_room.generate_recent_cache
    end

    send_file(@cur_room.recent_cache_filepath, content_type: json_content_type)
  end
end
