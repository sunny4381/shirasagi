require 'spec_helper'

describe "member_blogs", type: :feature, dbscope: :example, js: true do
  let(:site) { cms_site }
  let!(:layout) { create(:cms_layout, site: site, name: "blog") }
  let!(:blogs_node) { create_once :member_node_blog, filename: "blogs", name: "blogs", layout: layout }
  let!(:node) { create_once :member_node_blog_page, filename: "blogs/shirasagi-blog", name: "shirasagi-blog", layout: layout }
  let(:item) { create(:member_blog_page, cur_node: node) }
  let(:path) { member_blog_pages_path(site, node) }
  subject(:logs_path) { history_cms_logs_path site.id }

  context "history_logs" do
    before { login_cms_user }

    it "#index" do
      visit path
      within ".list-items" do
        expect(page).to have_css('.list-item .info .up')
      end

      visit "#{path}/new"
      wait_for_all_ckeditors_ready
      wait_for_all_turbo_frames
      within "form#item-form" do
        fill_in "item[name]", with: "sample"
        fill_in_ckeditor "item[html]", with: "sample"
        click_on I18n.t("ss.buttons.draft_save")
      end
      wait_for_notice I18n.t('ss.notice.saved')
      wait_for_all_ckeditors_ready
      wait_for_all_turbo_frames
      expect(page).to have_css("#workflow_route", text: I18n.t("mongoid.attributes.workflow/model/route.my_group"))

      visit "#{path}/#{item.id}/edit"
      wait_for_all_ckeditors_ready
      wait_for_all_turbo_frames
      within "form#item-form" do
        ss_upload_file "#{Rails.root}/spec/fixtures/ss/file/keyvisual.jpg", addon: "#addon-member-agents-addons-file"
        expect(page).to have_css("#addon-member-agents-addons-file .file-view", text: "keyvisual.jpg")
        click_on I18n.t("ss.buttons.publish_save")
      end
      wait_for_notice I18n.t('ss.notice.saved')
      wait_for_all_ckeditors_ready
      wait_for_all_turbo_frames
      expect(page).to have_text('keyvisual.jpg')

      visit logs_path
      expect(page).to have_css('.list-item', count: 4)
    end
  end
end
