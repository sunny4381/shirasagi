class Gws::Chat::RoomsController < ApplicationController
  include Gws::BaseFilter
  include Gws::CrudFilter

  model Gws::Chat::Room

  private

  def set_crumbs
    @crumbs << [t('modules.gws/chat'), gws_chat_main_path]
  end

  def fix_params
    { cur_user: @cur_user, cur_site: @cur_site }
  end
end
