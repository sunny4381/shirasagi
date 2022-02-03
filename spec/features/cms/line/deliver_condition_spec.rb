require 'spec_helper'

describe "cms/line/deliver_conditions", type: :feature, dbscope: :example, js: true do
  let(:site) { cms_site }
  let(:item) { create(:cms_line_deliver_condition, lower_year1: 1, upper_year1: 1) }
  let(:name) { unique_id }

  let(:index_path) { cms_line_deliver_conditions_path site }
  let(:new_path) { new_cms_line_deliver_condition_path site }
  let(:show_path) { cms_line_deliver_condition_path site, item }
  let(:edit_path) { edit_cms_line_deliver_condition_path site, item }
  let(:delete_path) { delete_cms_line_deliver_condition_path site, item }

  describe "basic crud" do
    before { login_cms_user }

    it "#new" do
      visit new_path
      within "form#item-form" do
        fill_in "item[name]", with: name
        fill_in "item[lower_year1]", with: 2
        fill_in "item[upper_year1]", with: 3
        click_on I18n.t("ss.buttons.save")
      end
      expect(page).to have_css('#notice', text: I18n.t('ss.notice.saved'))
      expect(page).to have_css("#addon-basic", text: name)
    end

    it "#show" do
      visit show_path
      expect(page).to have_css("#addon-basic", text: item.name)
    end

    it "#edit" do
      visit edit_path
      within "form#item-form" do
        fill_in "item[lower_year2]", with: 4
        fill_in "item[upper_year2]", with: 5
        click_on I18n.t("ss.buttons.save")
      end
      expect(page).to have_css('#notice', text: I18n.t('ss.notice.saved'))
    end

    it "#delete" do
      visit delete_path
      within "form" do
        click_button I18n.t('ss.buttons.delete')
      end
      expect(page).to have_css('#notice', text: I18n.t('ss.notice.deleted'))
    end
  end
end
