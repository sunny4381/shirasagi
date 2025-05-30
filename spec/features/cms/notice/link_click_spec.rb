require 'spec_helper'

# chrome=133.0.6943.53 で PDF を開くと、モデルスペックであっても失敗するようになるので `js: true` を削除
describe "cms_notices", type: :feature, dbscope: :example do
  let(:site) { cms_site }
  let(:user) { cms_user }
  let(:file) { tmp_ss_file(user: user, contents: "#{Rails.root}/spec/fixtures/ss/shirasagi.pdf") }
  let(:html) do
    "<p><a class=\"icon-pdf\" href=\"#{file.url}\">#{file.humanized_name}</a></p>"
  end
  let!(:item) { create(:cms_notice, site: site, cur_user: user, html: html, file_ids: [ file.id ]) }

  context "when <a> is clicked" do
    before { login_cms_user }

    it do
      visit cms_public_notice_path(site: site, id: item)

      within ".ss-notice-wrap" do
        click_on file.humanized_name
      end

      expect(page).to have_css("body")
    end
  end
end
