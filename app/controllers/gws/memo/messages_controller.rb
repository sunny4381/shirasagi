class Gws::Memo::MessagesController < ApplicationController
  include Gws::BaseFilter
  include Gws::CrudFilter
  helper Gws::Memo::MessageHelper

  model Gws::Memo::Message

  before_action :deny_with_auth

  before_action :set_item, only: [:show, :edit, :update, :send_mdn, :ignore_mdn, :print, :trash, :delete, :destroy,
                                  :set_star, :unset_star]
  before_action :set_selected_items, only: [:trash_all, :destroy_all, :set_seen_all, :unset_seen_all,
                                            :set_star_all, :unset_star_all, :move_all]
  before_action :set_folders, only: [:index, :recent]
  before_action :set_cur_folder, only: [:index]

  helper_method :move_to_prev_tag, :move_to_next_tag

  navi_view "gws/memo/messages/navi"

  private

  def deny_with_auth
    raise "403" unless @model.allowed?(:edit, @cur_user, site: @cur_site)
  end

  def set_item
    super
    if params[:folder] == 'REDIRECT' && request.get?
      redirect_to_appropriate_folder
      return
    end
    raise "404" unless @item.readable?(@cur_user, site: @cur_site)
  end

  def fix_params
    { cur_user: @cur_user, cur_site: @cur_site }
  end

  def set_crumbs
    return if params[:folder] == 'REDIRECT'

    set_cur_folder
    @crumbs << [@cur_site.menu_memo_label || t('mongoid.models.gws/memo/message'), gws_memo_messages_path ]
    if @cur_folder.folder_path != 'INBOX'
      @cur_folder.ancestor_or_self.each do |folder|
        @crumbs << [folder.current_name, gws_memo_messages_path(folder: folder.folder_path)]
      end
    end
  end

  def set_cur_folder
    @cur_folder ||= begin
      if Gws::Memo::Folder::STATIC_FOLDER_NAMES.include?(params[:folder])
        Gws::Memo::Folder.static_items(@cur_user, @cur_site).find { |dir| dir.folder_path == params[:folder] }
      else
        Gws::Memo::Folder.user(@cur_user).site(@cur_site).find_by(id: params[:folder])
      end
    end
  end

  def set_folders
    @folders = Gws::Memo::Folder.static_items(@cur_user, @cur_site) +
               Gws::Memo::Folder.user(@cur_user).site(@cur_site).tree_sort.map.to_a
    @folders.each { |folder| folder.site = @cur_site }
  end

  def send_forward_mails
    return if @item.draft?

    forward_emails = Gws::Memo::Forward.site(@cur_site).
      in(user_id: @item.member_ids).
      where(default: "enabled").
      pluck(:emails)
    forward_emails = forward_emails.flatten.select{ |email| email.present? && @cur_site.email_domain_allowed?(email) }
    return if forward_emails.blank?

    Gws::Memo::Mailer.forward_mail(@item, forward_emails).deliver_now
  end

  def redirect_to_appropriate_folder
    path = @item.path(@cur_user)
    if path.present?
      redirect_to({ folder: path })
    elsif (@cur_user.id == @item.user_id) && @item.deleted["sent"].nil?
      redirect_to({ folder: "INBOX.Sent" })
    elsif @item.list_message? && @item.to_list_message.list.allowed?(:read, @cur_user, site: @cur_site)
      redirect_to gws_memo_list_message_path(list_id: @item.to_list_message.list, id: @item)
    else
      raise '404'
    end
  end

  def move_to_prev_tag
    prev_path = @prev_id ? url_for(action: :show, id: @prev_id) : "#"
    css_classes = %w(prev)
    unless @prev_id
      css_classes << "inactive"
    end

    view_context.tag.div(class: css_classes) do
      view_context.link_to(prev_path, title: t('gws/memo/message.links.prev')) do
        view_context.md_icons.outlined("arrow_circle_left")
      end
    end
  end

  def move_to_next_tag
    next_path = @next_id ? url_for(action: :show, id: @next_id) : "#"
    css_classes = %w(next)
    unless @next_id
      css_classes << "inactive"
    end

    view_context.tag.div(class: css_classes) do
      view_context.link_to(next_path, title: t('gws/memo/message.links.next')) do
        view_context.md_icons.outlined("arrow_circle_right")
      end
    end
  end

  public

  def index
    @sort_hash = @cur_user.memo_message_sort_hash(@cur_folder, params[:sort], params[:order])
    @items = @model.folder(@cur_folder, @cur_user).
      site(@cur_site).
      search(params[:s]).
      reorder(@sort_hash).
      page(params[:page]).per(50)

    id_list = []
    @items.each do |item|
      id_list << item.id.to_s
    end
    gws_memo_id_list_session = {}
    gws_memo_id_list_session['id_list'] = id_list
    if params[:s]
      gws_memo_id_list_session['search'] = params[:s].to_unsafe_h
    else
      gws_memo_id_list_session['search'] = nil
    end
    gws_memo_id_list_session['page'] = params[:page]
    session[:gws_memo_id_list] = gws_memo_id_list_session
  end

  def recent
    @items = @model.member(@cur_user).site(@cur_site).and_public.
      search(params[:s]).
      limit(5)

    render :recent, layout: false
  end

  def new
    @item = @model.new pre_params.merge(fix_params)
    @item.new_memo(to: params[:to])
  end

  def create
    @item = @model.new get_params
    if params['commit'] == t('gws/memo/message.commit_params_check')
      @item.state = "public"
      @item.in_validate_presence_member = true
      notice = t("ss.notice.sent")
    else
      @item.state = "closed"
      notice = t("ss.notice.saved")
    end

    if @item.save
      send_forward_mails
      render_create true, location: { action: :index }, notice: notice
    else
      render_create false, location: { action: :index }, notice: notice
    end
  end

  def show
    @item.set_seen(@cur_user).update if @item.state == "public"

    # 念の為初期化する（本アクションで設定するメンバー変数一覧を明示的に示す意図もある）
    @id_list = nil
    @id_index = nil
    @search = nil
    @page = nil
    @prev_id = nil
    @next_id = nil
    gws_memo_id_list_session = session[:gws_memo_id_list]
    return if gws_memo_id_list_session.blank?

    @id_list = gws_memo_id_list_session['id_list']
    @search = gws_memo_id_list_session['search']
    @page = gws_memo_id_list_session['page']
    return if @id_list.blank?

    @id_index = @id_list.index(@item.id.to_s)
    return if @id_index.blank?

    if @id_index > 0
      @prev_id = @id_list[@id_index - 1]
    end
    if @id_index < @id_list.size
      @next_id = @id_list[@id_index + 1]
    end
  end

  def edit
    raise "404" unless @item.editable?(@cur_user, @cur_site)

    render
  end

  def update
    @item.attributes = get_params
    raise "404" unless @item.editable?(@cur_user, @cur_site)

    @item.in_updated = params[:_updated] if @item.respond_to?(:in_updated)
    if params['commit'] == t('gws/memo/message.commit_params_check')
      @item.state = "public"
      @item.in_validate_presence_member = true
      notice = t("ss.notice.sent")
    else
      @item.state = "closed"
      notice = t("ss.notice.saved")
    end

    if @item.update
      send_forward_mails
      render_update true, location: { action: :index }, notice: notice
    else
      render_update false, location: { action: :index }, notice: notice
    end
  end

  def delete
    render
  end

  def destroy
    render_destroy @item.destroy_from_folder(@cur_user, @cur_folder, unsend: params[:unsend])
  end

  def destroy_all
    entries = @items.entries
    @items = []

    entries.each do |item|
      if @cur_user.id == item.user_id || item.member?(@cur_user)
        next if item.destroy_from_folder(@cur_user, @cur_folder)
      else
        item.errors.add :base, :auth_error
      end
      @items << item
    end
    render_confirmed_all(entries.size != @items.size)
  end

  def reply
    item_reply = @model.site(@cur_site).find(params[:id])
    @item = @model.new_reply(item_reply, cur_site: @cur_site, cur_user: @cur_user)
  end

  def reply_all
    item_reply = @model.site(@cur_site).find(params[:id])
    @item = @model.new_reply(item_reply, cur_site: @cur_site, cur_user: @cur_user, respond_to: :all)
  end

  def forward
    item_forward = @model.site(@cur_site).find(params[:id])
    @item = @model.new_forward(item_forward, cur_site: @cur_site, cur_user: @cur_user)
  end

  def ref
    @item = @model.new pre_params.merge(fix_params)
    @ref = @model.site(@cur_site).find(params[:id]) rescue nil

    @item.new_memo(ref: @ref)
    @item.ref_file_ids = @ref.file_ids
    render :new
  end

  def send_mdn
    item_mdn = @model.new fix_params
    item_mdn.in_to_members = [@item.user_id]
    item_mdn.subject = I18n.t("gws/memo/message.mdn.subject", subject: @item.subject)
    date = I18n.l(Time.zone.now, format: :picker)
    item_mdn.text = I18n.t("gws/memo/message.mdn.confirmed", name: @cur_user.long_name, date: date)
    item_mdn.format = "text"
    item_mdn.state = "public"
    item_mdn.in_validate_presence_member = true
    result = item_mdn.save

    if result
      @item.request_mdn_ids = @item.request_mdn_ids - [@cur_user.id]
      @item.update
    else
      SS::Model.copy_errors(item_mdn, @item)
    end

    render_change result, :send_mdn, redirect: { action: :show }
  end

  def ignore_mdn
    @item.request_mdn_ids = @item.request_mdn_ids - [@cur_user.id]
    render_change @item.update, :ignore_mdn, redirect: { action: :show }
  end

  def print
    render :print, layout: 'ss/print'
  end

  def trash
    render_destroy @item.move(@cur_user, 'INBOX.Trash').update
  end

  def trash_all
    @items.each do |item|
      raise "404" unless item.readable?(@cur_user, site: @cur_site)

      item.move(@cur_user, 'INBOX.Trash').update
    end
    render_confirmed_all(true)
  end

  def move_all
    @items.each do |item|
      raise "404" unless item.readable?(@cur_user, site: @cur_site)

      item.move(@cur_user, params[:path]).update
    end
    render_change_all
  end

  def set_seen_all
    @items.each do |item|
      raise "404" unless item.readable?(@cur_user, site: @cur_site)

      item.set_seen(@cur_user).update
    end
    render_change_all
  end

  def unset_seen_all
    @items.each do |item|
      raise "404" unless item.readable?(@cur_user, site: @cur_site)

      item.unset_seen(@cur_user).update
    end
    render_change_all
  end

  def set_seen_from_popup
    @items = Gws::Memo::Message.unseens(@cur_user, @cur_site).to_a
    @items.each do |item|
      next unless item.readable?(@cur_user, site: @cur_site)
      item.set_seen(@cur_user).update
    end
    flash[:notice] = I18n.t("ss.notice.set_seen")
    respond_to do |format|
      format.html { redirect_to(action: :index) }
      format.json { head :no_content }
    end
  end

  def set_star
    render_change @item.set_star(@cur_user).save, params[:action], location: { action: params[:location] }
  end

  def unset_star
    render_change @item.unset_star(@cur_user).save, params[:action], location: { action: params[:location] }
  end

  def set_star_all
    @items.each do |item|
      raise "404" unless item.readable?(@cur_user, site: @cur_site)

      item.set_star(@cur_user).update
    end
    render_change_all
  end

  def unset_star_all
    @items.each do |item|
      raise "404" unless item.readable?(@cur_user, site: @cur_site)

      item.unset_star(@cur_user).update
    end
    render_change_all
  end

  def render_change(result, action, opts = {})
    location = params[:redirect].presence || opts[:redirect] || { action: :index }

    if result
      notice = opts[:notice].presence
      notice ||= I18n.t("gws/memo/message.notice.#{action}", default: nil)
      notice ||= I18n.t("ss.notice.#{action}", default: nil)
      notice ||= I18n.t("ss.notice.saved")

      respond_to do |format|
        format.html { redirect_to location, notice: notice }
        format.json { render json: { action: action, notice: notice } }
      end
    else
      respond_to do |format|
        format.html { redirect_to location, notice: @item.errors.full_messages.join("\n") }
        format.json { render json: @item.errors.full_messages, status: :unprocessable_entity, content_type: json_content_type }
      end
    end
  end

  def render_change_all(opts = {})
    location = params[:redirect].presence || opts[:redirect] || { action: :index }
    action = opts[:action] || params[:action]
    notice = opts[:notice].presence
    notice ||= I18n.t("gws/memo/message.notice.#{action}", default: nil)
    notice ||= I18n.t("ss.notice.#{action}", default: nil)
    notice ||= I18n.t("ss.notice.saved")
    errors = @items.select { |item| item.errors.present? }.map { |item| [ item.id.to_s, item.errors.full_messages ] }

    respond_to do |format|
      format.html { redirect_to location, notice: notice }
      format.json { render json: { action: action, notice: notice, errors: errors } }
    end
  end

  def latest
    @sort_hash = @cur_user.memo_message_sort_hash(@cur_folder, params[:sort], params[:order])

    inbox = Gws::Memo::Folder.new(path: 'INBOX')
    @unseen = @model.folder(inbox, @cur_user).
      site(@cur_site).
      unseen(@cur_user).
      reorder(@sort_hash)

    @items = @model.folder(@cur_folder, @cur_user).
      site(@cur_site).
      reorder(@sort_hash).
      limit(10)

    fix_seen = @cur_folder.unseen? ? nil : true # Sent or Draft

    resp = {
      latest: @unseen.first.try(:send_date),
      unseen: @unseen.size,
      items: @items.map do |item|
        {
          date: item.send_date,
          from: item.user_name,
          to: item.display_to.presence,
          cc: item.display_cc.presence,
          subject: item.subject,
          text: item.text.presence,
          url: gws_memo_message_url(folder: 'INBOX', id: item.id),
          unseen: fix_seen ? false : item.unseen?(@cur_user)
        }
      end
    }
    render json: resp.to_json
  end
end
