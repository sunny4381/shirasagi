class Opendata::Agents::Nodes::Mypage::MyProfileController < ApplicationController
  include Cms::NodeFilter::View
  include Member::LoginFilter
  include Opendata::MemberFilter
  helper Opendata::UrlHelper

  before_action :deny_edit, only: [:edit, :update]
  before_action :set_model
  before_action :set_item, only: [:show, :edit, :update, :delete, :destroy]
  helper_method :allow_edit_profile?

  protected

  def set_model
    @model = Opendata::Member
  end

  def set_item
    @item = @cur_member
  end

  def fix_params
    {}
  end

  def pre_params
    {}
  end

  def permit_fields
    @model.permitted_fields
  end

  def get_params
    params.require(:item).permit(permit_fields).merge(fix_params)
  end

  public

  def deny_edit
    raise SS::NotFoundError if !allow_edit_profile?
  end

  def allow_edit_profile?
    return false if @cur_node.edit_profile_state == "restrict_all"

    if @cur_node.edit_profile_state == "restrict_oauth"
      return (@cur_member.oauth_type.blank? && @cur_member.email.present?)
    end

    true
  end

  def show
    render
  end

  def edit
    render
  end

  def update
    @item.attributes = get_params

    if @item.update
      Member::ActivityLog.create(
        cur_site: @cur_site,
        cur_member: @cur_member,
        activity_type: :update_profile,
        remote_addr: remote_addr,
        user_agent: request.user_agent)

      redirect_to @cur_node.url, notice: t("ss.notice.saved")
    else
      render action: :edit
    end
  end

  def delete
    render
  end

  def destroy
    if @cur_member.remove
      redirect_to view_context.mypage_path, notice: t("opendata.notice.deleted_account")
    else
      render action: :delete
    end
  end
end
