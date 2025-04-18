require 'spec_helper'

describe "gws_schedule_categories", type: :feature, dbscope: :example, js: true do
  let(:site) { gws_site }
  let(:item) { create :gws_schedule_category }
  let(:index_path) { gws_schedule_categories_path site }
  let(:new_path) { new_gws_schedule_category_path site }
  let(:show_path) { gws_schedule_category_path site, item }
  let(:edit_path) { edit_gws_schedule_category_path site, item }
  let(:delete_path) { delete_gws_schedule_category_path site, item }

  context "with auth" do
    before { login_gws_user }

    it "#index" do
      visit index_path
      expect(current_path).not_to eq sns_login_path
    end

    it "#new" do
      visit new_path
      wait_for_all_color_pickers_ready
      within "form#item-form" do
        fill_in "item[name]", with: "name"
        fill_in_color "item[color]", with: "#000000"
        click_button I18n.t('ss.buttons.save')
      end
      wait_for_notice I18n.t("ss.notice.saved")
      expect(current_path).not_to eq new_path
      expect(page).to have_no_css("form#item-form")
    end

    it "#show" do
      visit show_path
      expect(current_path).not_to eq sns_login_path
    end

    it "#edit" do
      visit edit_path
      wait_for_all_color_pickers_ready
      within "form#item-form" do
        fill_in "item[name]", with: "modify"
        fill_in_color "item[color]", with: "#ffffff"
        click_button I18n.t('ss.buttons.save')
      end
      wait_for_notice I18n.t("ss.notice.saved")
      expect(current_path).not_to eq sns_login_path
      expect(page).to have_no_css("form#item-form")
    end

    it "#delete" do
      visit delete_path
      within "form#item-form" do
        click_button I18n.t('ss.buttons.delete')
      end
      wait_for_notice I18n.t("ss.notice.deleted")
      expect(current_path).to eq index_path
    end
  end
end
