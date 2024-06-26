require 'spec_helper'

describe "gws_portal_portlet", type: :feature, dbscope: :example, js: true do
  let(:site) { gws_site }
  let(:user) { gws_user }
  let!(:notice_folder) { create(:gws_notice_folder) }
  let!(:notice_post) { create(:gws_notice_post, severity: 'high', folder: notice_folder) }

  before do
    login_gws_user
  end

  it do
    visit gws_portal_user_path(site: site, user: user)
    click_on I18n.t('gws/portal.links.manage_portlets')
    click_on I18n.t('ss.links.new')
    within '.main-box' do
      click_on I18n.t('gws/portal.portlets.notice.name')
    end
    within 'form#item-form' do
      select I18n.t('gws/notice.options.severity.high')
      select I18n.t('gws/board.options.browsed_state.unread')
      wait_for_cbox_opened { click_link I18n.t('gws/share.apis.folders.index') }
    end
    within_cbox do
      wait_for_cbox_closed { click_link notice_folder.name }
    end
    within 'form#item-form' do
      click_on I18n.t('ss.buttons.save')
    end
    wait_for_notice I18n.t('ss.notice.saved')

    visit gws_portal_user_path(site: site, user: user)
    expect(page).to have_css('.portlets .gws-notices', text: notice_post.name)
  end
end
