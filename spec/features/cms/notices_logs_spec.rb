require 'spec_helper'

describe "cms_notices", type: :feature, dbscope: :example, js: true do
  let(:site) { cms_site }
  let(:item) { create(:cms_notice, site: site) }
  let(:index_path) { cms_notices_path site.id }
  let(:new_path) { new_cms_notice_path site.id }
  let(:edit_path) { edit_cms_notice_path site.id, item }
  subject(:logs_path) { history_cms_logs_path site.id }

  context "history_logs" do
    before { login_cms_user }

    it "#new" do
      visit new_path
      fill_in "item[name]", with: "name-#{unique_id}"
      click_button I18n.t('ss.buttons.save')
      wait_for_notice I18n.t('ss.notice.saved')

      visit edit_path
      ensure_addon_opened("#addon-cms-agents-addons-file")
      within "#addon-cms-agents-addons-file" do
        wait_for_cbox_opened do
          click_on I18n.t("ss.buttons.upload")
        end
      end

      within_cbox do
        attach_file "item[in_files][]", "#{Rails.root}/spec/fixtures/ss/file/keyvisual.jpg"
        click_button I18n.t("ss.buttons.save")
        expect(page).to have_css(".file-view", text: "keyvisual.jpg")

        attach_file "item[in_files][]", "#{Rails.root}/spec/fixtures/ss/file/keyvisual.jpg"
        wait_for_cbox_closed do
          click_button I18n.t("ss.buttons.attach")
        end
      end
      within "#addon-cms-agents-addons-file" do
        expect(page).to have_css(".file-view", text: "keyvisual.jpg")
      end
      click_on I18n.t("ss.buttons.save")

      wait_for_notice I18n.t('ss.notice.saved')
      expect(page).to have_text('keyvisual.jpg')

      visit logs_path
      expect(page).to have_css('.list-item', count: 4)
    end
  end
end
