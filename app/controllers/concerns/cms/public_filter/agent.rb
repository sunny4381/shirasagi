module Cms::PublicFilter::Agent
  extend ActiveSupport::Concern

  included do
    before_action :set_cur_context
  end

  private

  def set_cur_context
    @cur_context ||= begin
      context = request.env["ss"]
      if context.blank?
        context = Cms::Agent::Context.new
        request.env["ss"] = context
      end
      context
    end
  end

  def filter_include?(key)
    @cur_context.filter_include?(key)
  end

  def filter_options(key)
    @cur_context.filter_options(key)
  end
end
