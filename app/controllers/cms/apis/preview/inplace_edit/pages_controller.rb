class Cms::Apis::Preview::InplaceEdit::PagesController < ApplicationController
  include Cms::ApiFilter

  model Cms::Page

  layout "ss/ajax_in_iframe"

  before_action :set_inplace_mode

  private

  def set_inplace_mode
    @inplace_mode = true
  end
end
