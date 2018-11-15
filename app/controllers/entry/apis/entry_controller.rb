class Entry::Apis::EntryController < ApplicationController
  include Cms::ApiFilter

  layout nil

  before_action :set_form
  before_action :set_column

  model Cms::Column

  private

  def set_form
    @cur_form = Cms::Form.site(@cur_site).find(params[:form_id])
  end

  def set_column
    @cur_column = @cur_form.columns.find(params[:column_id])
  end

  public

  def entry_form
  end
end
