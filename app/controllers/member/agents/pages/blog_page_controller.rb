class Member::Agents::Pages::BlogPageController < ApplicationController
  include Cms::PageFilter::View

  helper Member::BlogPageHelper

  before_action :deny
  before_action :set_blog_layout, only: :index
  after_action :render_blog_layout

  def deny
    raise "404" unless @cur_page.parent.public?
  end

  def set_blog_layout
    @cur_page.layout = @cur_page.parent.page_layout
  end

  def render_blog_layout
    return if response.content_type != "text/html"

    node = @cur_page.parent.becomes_with_route
    response.body = response.body.gsub(/\#\{(.+?)\}/) do |m|
      name = $1
      view_context.render_blog_template(name, node: node) || m
    end
  end
end
