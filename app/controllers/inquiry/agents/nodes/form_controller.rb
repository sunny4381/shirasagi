class Inquiry::Agents::Nodes::FormController < ApplicationController
  include Cms::NodeFilter::View
  include Cms::ForMemberFilter::Node
  include SS::CaptchaFilter
  helper Inquiry::FormHelper

  before_action :check_release_state, only: [:new, :confirm, :create, :sent, :results], if: ->{ !@preview }
  before_action :check_reception_state, only: [:new, :confirm, :create, :sent], if: ->{ !@preview }
  before_action :check_aggregation_state, only: :results, if: ->{ !@preview }
  before_action :set_columns, only: [:new, :confirm, :create, :sent, :results]
  before_action :set_answer, only: [:new, :confirm, :create]

  private

  def protect_csrf?
    false
  end

  def check_release_state
    raise SS::NotFoundError unless @cur_node.public?
  end

  def check_reception_state
    raise SS::NotFoundError unless @cur_node.reception_enabled?
  end

  def check_aggregation_state
    raise SS::NotFoundError unless @cur_node.aggregation_enabled?
  end

  def set_columns
    @columns = Inquiry::Column.site(@cur_site).
      where(node_id: @cur_node.id, state: "public").
      order_by(order: 1)
  end

  def set_answer
    set_group
    set_page

    @items = []
    @data = {}
    @to = @cur_node.notice_emails.to_a
    @columns.each do |column|
      param = params.to_unsafe_h[:item].try(:[], column.id.to_s)
      if column.input_type == "upload_file" &&
         !param.blank? &&
         !param.kind_of?(ActionDispatch::Http::UploadedFile)

        client_name = Inquiry::Answer.persistence_context.send(:client_name)
        param = SS::File.with(client: client_name) do |model|
          model.find(param)
        end
      end
      if column.input_type == "date_field" && param.present?
        param = Date.parse(param).iso8601 rescue nil
      end
      if column.input_type == "datetime_field" && param.present?
        param = DateTime.parse(param).strftime('%FT%H:%M') rescue nil
      end
      @items << [column, param]
      @data[column.id] = [param]
      if (column.input_type == 'text_field' || column.input_type == 'text_area') && column.transfers.present? && param.present?
        column.transfers.each do |transfer|
          next if transfer[:email].blank? || transfer[:keyword].blank?
          @to.push(transfer[:email]) if param.include?(transfer[:keyword])
        end
      end
      if column.input_confirm == "enabled"
        @items.last << params[:item].try(:[], "#{column.id}_confirm")
        @data[column.id] << params[:item].try(:[], "#{column.id}_confirm")
      end
    end
    @to = @to.uniq.compact.sort
    @answer = Inquiry::Answer.new(cur_site: @cur_site, cur_node: @cur_node)
    @answer.remote_addr = remote_addr
    @answer.user_agent = request.user_agent
    @answer.member = @cur_member
    @answer.source_url = params[:item].try(:[], :source_url)
    @answer.set_data(@data)
    @answer.group_ids = @group ? [ @group.id ] : @cur_node.group_ids
    if @page
      @answer.inquiry_page_url = @page.url
      @answer.inquiry_page_name = @page.name
    end
  end

  def set_group
    return if params[:group].blank?

    @group = Cms::Group.site(@cur_site).active.where(id: params[:group]).first
    raise SS::NotFoundError if @group.blank?
    raise SS::NotFoundError if @cur_node.notify_mail_enabled? && @group.contact_email.blank?
  end

  def set_page
    return if params[:page].blank?

    @page = Cms::Page.site(@cur_site).and_public(@cur_date).where(id: params[:page]).first
    raise SS::NotFoundError if @page.blank?
  end

  def set_saved_params
    return if !@cur_node.show_sent_data?
    @saved_params = Inquiry::SavedParams.get(session[saved_params_key])
  end

  def saved_params_key
    "inquiry_saved_params_#{@cur_node.id}"
  end

  public

  def new
    if @group || @page
      raise SS::NotFoundError if @cur_site.inquiry_form != @cur_node
    end
    if @group && @page
      raise SS::NotFoundError if @page.contact_group_id != @group.id
    end
  end

  def confirm
    if !@answer.valid?
      render action: :new
    end
  end

  def create
    if !@answer.valid? || params[:submit].blank?
      render action: :new
      return
    end

    if @cur_node.captcha_enabled? && !captcha_valid?(@answer)
      render action: :confirm
      return
    end

    unless @answer.save
      render action: :new
      return
    end

    if @cur_node.notify_mail_enabled?
      if @group.present? && @group.contact_email.present?
        email = @group.contact_email
        Inquiry::Mailer.notify_mail(@cur_site, @cur_node, @answer, email).deliver_now if email.present?
      else
        @to.each { |email| Inquiry::Mailer.notify_mail(@cur_site, @cur_node, @answer, email).deliver_now }
      end
    end

    if @cur_node.reply_mail_enabled?
      # `try` method doesn't work as you think because mail is an instance of Delegator.
      # see: http://tech.misoca.jp/entry/2015/12/04/110000
      mail = Inquiry::Mailer.reply_mail(@cur_site, @cur_node, @answer)
      mail.deliver_now if mail.present?
    end

    if @cur_node.try(:kintone_app_enabled?)
      @answer.update_kintone_record
    end

    # create saved_params
    if @cur_node.show_sent_data?
      data = {}
      @data.each do |column_id, values|
        value = values[0]
        if value.is_a?(String)
          data[column_id] = value
        elsif value.is_a?(Hash)
          data[column_id] = value.values.join("\n")
        elsif value.respond_to?(:original_filename)
          data[column_id] = value.original_filename
        elsif value.respond_to?(:filename)
          data[column_id] = value.filename
        end
      end
      session[saved_params_key] = Inquiry::SavedParams.apply(data)
    end

    query = {}
    if @answer.source_url.present?
      if params[:preview]
        query[:ref] = view_context.cms_preview_path(site: @cur_site, path: @answer.source_content.url[1..-1])
      else
        query[:ref] = @answer.source_url
      end
    end
    query[:group] = @group.id if @group

    url = "#{@cur_node.url}sent.html"
    url = "#{url}?#{query.to_query}" if query.present?
    redirect_to url
  end

  def sent
    set_group
    set_saved_params
    render action: :sent
  end

  def results
    @cur_node.name = "#{@cur_node.name} #{I18n.t("inquiry.result")}"
    @aggregation = @cur_node.aggregate_select_columns
    render action: :results
  end
end
