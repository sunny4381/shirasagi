require 'spec_helper'

describe "faq_pages", type: :feature, dbscope: :example, js: true do
  let(:site) { cms_site }
  let(:group) { cms_group }
  let(:name) { unique_id }

  let(:faq_node) { create(:faq_node_page, group_ids: [group.id]) }
  let(:faq_item) { create(:faq_page, cur_node: faq_node) }
  let(:faq_index_path) { faq_pages_path site.id, faq_node }
  let(:faq_new_path) { new_faq_page_path site.id, faq_node }
  let(:faq_edit_path) { edit_faq_page_path site.id, faq_node, faq_item }
  let(:faq_show_path) { faq_page_path site.id, faq_node, faq_item }

  before { login_cms_user }

  context "auto save" do
    context "new" do
      it do
        visit faq_new_path
        wait_for_all_ckeditors_ready
        wait_for_all_turbo_frames
        within "form#item-form" do
          fill_in "item[name]", with: name
          ensure_addon_opened "#addon-cms-agents-addons-file"
          ss_upload_file "#{Rails.root}/spec/fixtures/ss/file/keyvisual.jpg"
        end
        click_on I18n.t("ss.links.back_to_index")

        visit faq_index_path
        page.accept_confirm(I18n.t("ss.confirm.resume_editing")) do
          click_on I18n.t("ss.links.new")
        end
        wait_for_form_restored
        wait_for_all_ckeditors_ready
        wait_for_all_turbo_frames

        within "form#item-form" do
          within '.file-view' do
            expect(page).to have_css('.name', text: 'keyvisual.jpg')
          end
          click_on I18n.t('ss.buttons.publish_save')
        end
        wait_for_notice I18n.t("ss.notice.saved")
        wait_for_all_ckeditors_ready
        wait_for_all_turbo_frames

        expect(page).to have_content(name)
        expect(page).to have_content('keyvisual')
        expect(Faq::Page.count).to eq 1
        Faq::Page.all.first.tap do |faq_page|
          expect(faq_page.name).to eq name
          expect(faq_page.file_ids.length).to eq 1
          expect(faq_page.files.first.name).to eq 'keyvisual.jpg'
        end
      end
    end

    context "edit" do
      it do
        visit faq_edit_path
        wait_for_all_ckeditors_ready
        wait_for_all_turbo_frames
        within "form#item-form" do
          fill_in "item[name]", with: name
          ensure_addon_opened "#addon-cms-agents-addons-file"
          ss_upload_file "#{Rails.root}/spec/fixtures/ss/file/keyvisual.jpg"
        end
        click_on I18n.t("ss.links.back_to_show")
        wait_for_all_ckeditors_ready
        wait_for_all_turbo_frames
        expect(page).to have_css("#workflow_route", text: I18n.t("mongoid.attributes.workflow/model/route.my_group"))

        visit faq_show_path
        wait_for_all_ckeditors_ready
        wait_for_all_turbo_frames
        expect(page).to have_css("#workflow_route", text: I18n.t("mongoid.attributes.workflow/model/route.my_group"))
        page.accept_confirm(I18n.t("ss.confirm.resume_editing")) do
          click_on I18n.t("ss.links.edit")
        end
        wait_for_form_restored
        wait_for_all_ckeditors_ready
        wait_for_all_turbo_frames

        within "form#item-form" do
          within '.file-view' do
            expect(page).to have_css('.name', text: 'keyvisual.jpg')
          end
          click_on I18n.t('ss.buttons.publish_save')
        end
        wait_for_notice I18n.t("ss.notice.saved")
        wait_for_all_ckeditors_ready
        wait_for_all_turbo_frames

        expect(page).to have_content(name)
        expect(page).to have_content('keyvisual')
        expect(Faq::Page.count).to eq 1
        Faq::Page.all.first.tap do |faq_page|
          expect(faq_page.name).to eq name
          expect(faq_page.file_ids.length).to eq 1
          expect(faq_page.files.first.name).to eq 'keyvisual.jpg'
        end
      end
    end
  end
end
