module Cms::AgentFilter
  extend ActiveSupport::Concern
  include Cms::PublicFilter::Agent

  included do
    before_action :inherit_variables
    before_action :prepend_current_view_path
  end

  private

  def inherit_variables
    return if @cur_context.blank?

    @cur_site = @cur_context.site
    @cur_node = @cur_context.node
    @cur_page = @cur_context.page
    @cur_part = @cur_context.part
    @cur_path = @cur_context.path
    @cur_main_path = @cur_context.main_path
    @task = @cur_context.task
  end

  def prepend_current_view_path
    prepend_view_path "app/views/#{params[:controller]}"
  end
end
