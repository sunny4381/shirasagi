require 'spec_helper'

describe "history_cms_logs", type: :feature, dbscope: :example, js: true do
  let!(:site) { cms_site }
  let!(:node) do
    create_once :article_node_page, filename: "docs", name: "article",
                group_ids: [cms_group.id], st_form_ids: [form.id]
  end
  let!(:item) { create :article_page, cur_node: node, group_ids: [cms_group.id] }
  let!(:edit_path) { edit_article_page_path(site: site, cid: node, id: item) }

  let!(:form) { create(:cms_form, cur_site: site, state: 'public', sub_type: 'entry', group_ids: [cms_group.id]) }
  let!(:column1) do
    create(:cms_column_file_upload, cur_site: site, cur_form: form, required: "optional", order: 1, file_type: "image")
  end
  # let!(:column2) { create(:cms_column_free, cur_site: site, cur_form: form, required: "optional", order: 2) }

  let(:logs_path) { history_cms_logs_path site.id }

  context "with entry form file_upload" do
    before { login_cms_user }

    it do
      visit edit_path
      wait_for_all_ckeditors_ready
      wait_for_all_turbo_frames

      within 'form#item-form' do
        wait_for_event_fired("ss:formActivated") do
          page.accept_confirm(I18n.t("cms.confirm.change_form")) do
            select form.name, from: 'in_form_id'
          end
        end
      end
      wait_for_all_ckeditors_ready
      wait_for_all_turbo_frames

      within ".column-value-palette" do
        wait_for_event_fired("ss:columnAdded") do
          click_on column1.name
        end
      end
      wait_for_all_ckeditors_ready
      wait_for_all_turbo_frames

      ss_upload_file "#{Rails.root}/spec/fixtures/ss/file/keyvisual.jpg", addon: ".column-value-cms-column-fileupload"
      within ".column-value-cms-column-fileupload" do
        expect(page).to have_css(".file-view", text: "keyvisual.jpg")
      end

      wait_for_cbox_opened do
        click_on I18n.t("ss.buttons.publish_save")
        expect(page).to have_css("#errorSyntaxChecker", text: I18n.t("cms.column_file_upload.image.file_label_place_holder"))
      end
      within_cbox do
        click_on I18n.t("ss.buttons.ignore_alert")
      end
      wait_for_notice I18n.t("ss.notice.saved")
      wait_for_all_ckeditors_ready
      wait_for_all_turbo_frames

      item.reload
      expect(item.column_values.count).to eq 1
      expect(item.column_values.first.file).to be_present
      file = item.column_values.first.file
      file_url = file.url

      History::Log.all.reorder(created: 1, id: 1).to_a.tap do |histories|
        histories[0].tap do |history|
          expect(history.user_id).to eq cms_user.id
          expect(history.session_id).to be_present
          expect(history.request_id).to be_present
          expect(history.url).to eq sns_login_path
          expect(history.controller).to eq "sns/login"
          expect(history.action).to eq "login"
          expect(history.target_id).to eq cms_user.id.to_s
          expect(history.target_class).to eq "SS::User"
          expect(history.page_url).to be_blank
          expect(history.behavior).to be_blank
          expect(history.ref_coll).to eq "ss_users"
          expect(history.filename).to be_blank
        end
        histories[1].tap do |history|
          expect(history.user_id).to eq cms_user.id
          expect(history.session_id).to eq histories[0].session_id
          expect(history.request_id).to be_present
          expect(history.request_id).not_to eq histories[0].request_id
          expect(history.url).to eq edit_path
          expect(history.controller).to eq "article/pages"
          expect(history.action).to eq "login"
          expect(history.target_id).to eq site.id.to_s
          expect(history.target_class).to eq "Cms::Site"
          expect(history.page_url).to be_blank
          expect(history.behavior).to be_blank
          expect(history.ref_coll).to eq "ss_sites"
          expect(history.filename).to be_blank
        end
        histories[2].tap do |history|
          expect(history.user_id).to eq cms_user.id
          expect(history.session_id).to eq histories[0].session_id
          expect(history.request_id).to be_present
          expect(history.request_id).not_to eq histories[1].request_id
          expect(history.url).to eq file_url
          expect(history.controller).to eq "article/pages"
          expect(history.action).to eq "update"
          expect(history.target_id).to eq file.id.to_s
          expect(history.target_class).to eq file.class.name
          expect(history.page_url).to eq article_page_path(site: site, cid: node, id: item)
          expect(history.behavior).to eq "attachment"
          expect(history.ref_coll).to eq "ss_files"
          expect(history.filename).to be_blank
        end
        histories[3].tap do |history|
          expect(history.user_id).to eq cms_user.id
          expect(history.session_id).to eq histories[0].session_id
          expect(history.request_id).to eq histories[2].request_id
          expect(history.url).to eq article_page_path(site: site, cid: node, id: item)
          expect(history.controller).to eq "article/pages"
          expect(history.action).to eq "update"
          expect(history.target_id).to eq item.id.to_s
          expect(history.target_class).to eq item.class.name
          expect(history.page_url).to be_blank
          expect(history.behavior).to be_blank
          expect(history.ref_coll).to eq "cms_pages"
          expect(history.filename).to be_blank
        end
      end
      expect(History::Log.all.count).to eq 4
      expect(History::Log.where(site_id: site.id).count).to eq 3

      visit logs_path
      expect(page).to have_css('.list-item', count: 3)
    end
  end
end
