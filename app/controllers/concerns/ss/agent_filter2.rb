module SS::AgentFilter2
  extend ActiveSupport::Concern
  include Cms::PublicFilter::Layout

  included do
    before_action :inherit_variables
    before_action :prepend_current_view_path
  end

  private

  def inherit_variables
    return if request.env["ss.domain"] != "agent"

    @cur_site = request.env["ss.site"] if request.env["ss.site"].present?
    @cur_node = request.env["ss.node"] if request.env["ss.node"].present?
    @cur_page = request.env["ss.page"] if request.env["ss.page"].present?
    @cur_part = request.env["ss.part"] if request.env["ss.part"].present?
    @task = request.env["ss.task"] if request.env["ss.task"].present?

    @cur_path = request.env["ss.path"] if request.env["ss.path"].present?
    @cur_main_path = request.env["ss.main_path"] if request.env["ss.main_path"].present?
  end

  def prepend_current_view_path
    prepend_view_path "app/views/#{params[:controller]}"
  end
end
