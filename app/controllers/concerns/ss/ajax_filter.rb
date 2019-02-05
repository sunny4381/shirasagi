module SS::AjaxFilter
  extend ActiveSupport::Concern

  included do
    layout :choose_layout
  end

  private

  def choose_layout
    if params[:layout].to_s == "iframe"
      "ss/ajax_in_iframe"
    else
      "ss/ajax"
    end
  end
end
