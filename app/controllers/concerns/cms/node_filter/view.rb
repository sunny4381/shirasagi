module Cms::NodeFilter::View
  extend ActiveSupport::Concern
  include Cms::AgentFilter
  include Cms::FeedFilter

  included do
    helper Map::MapHelper
    cattr_accessor :model_class
    before_action :set_model
  end

  module ClassMethods
    def model(cls)
      self.model_class = cls if cls
    end
  end

  private
    def set_model
      @model = self.class.model_class
      controller.instance_variable_set :@model, @model
    end

    def init_cur_layout
      @cur_layout = @cur_node.layout
      if @cur_layout.present?
        @cur_layout.keywords    = @cur_node.keywords if @cur_node.respond_to?(:keywords)
        @cur_layout.description = @cur_node.description if @cur_node.respond_to?(:description)
      end
    end

    def render_with_pagination(items)
      raise "404" if params[:page].to_i > 1 && items.empty?
      render
    end
end
