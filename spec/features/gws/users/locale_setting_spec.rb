require 'spec_helper'

describe "gws_users", type: :feature, dbscope: :example, js: true do
  let(:site) { gws_site }
  let!(:item) { create :gws_user, group_ids: [gws_user.group_ids.first], lang: nil, timezone: nil }
  let(:lang) { %w(en ja).sample }
  let(:lang_label) { I18n.t("ss.options.lang.#{lang}") }
  let(:timezone) { ActiveSupport::TimeZone.all.sample }

  before { login_gws_user }

  context "with ss/addon/locale_setting" do
    it do
      visit gws_users_path(site: site)
      click_on item.name
      click_on I18n.t("ss.links.edit")

      within "form#item-form" do
        select lang_label, from: "item[lang]"
        select timezone.to_s, from: "item[timezone]"

        click_on I18n.t("ss.buttons.save")
      end
      wait_for_notice I18n.t("ss.notice.saved")

      item.reload
      expect(item.lang).to eq lang
      expect(item.timezone).to eq timezone.name
    end
  end
end
