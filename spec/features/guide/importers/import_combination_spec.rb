require 'spec_helper'

describe "guide_import_transitions", type: :feature, dbscope: :example, js: true do
  let(:site) { cms_site }
  let(:node) { create :guide_node_guide, filename: "guide" }

  context "basic crud" do
    let(:download1_file) { tmpfile(extname: ".csv") }
    let(:download2_file) { tmpfile(extname: ".csv") }
    let(:download3_file) { tmpfile(extname: ".csv") }

    before { login_cms_user }

    it "#index" do
      ## upload 3 files

      visit import_procedures_guide_importers_path(site, node)
      within "form#task-form" do
        attach_file "item[in_file]", "#{Rails.root}/spec/fixtures/guide/templates/procedures.csv"
        page.accept_confirm(I18n.t("ss.confirm.import")) do
          click_on I18n.t('ss.buttons.import')
        end
      end
      wait_for_notice I18n.t("ss.notice.saved")

      visit import_questions_guide_importers_path(site, node)
      within "form#task-form" do
        attach_file "item[in_file]", "#{Rails.root}/spec/fixtures/guide/templates/questions.csv"
        page.accept_confirm(I18n.t("ss.confirm.import")) do
          click_on I18n.t('ss.buttons.import')
        end
      end
      wait_for_notice I18n.t("ss.notice.saved")

      visit import_transitions_guide_importers_path(site, node)
      within "form#task-form" do
        attach_file "item[in_file]", "#{Rails.root}/spec/fixtures/guide/templates/transitions.csv"
        page.accept_confirm(I18n.t("ss.confirm.import")) do
          click_on I18n.t('ss.buttons.import')
        end
      end
      wait_for_notice I18n.t("ss.notice.saved")

      expect(Guide::Procedure.all.size).to eq 8
      Guide::Procedure.all.each do |item|
        expect(item.id_name).to be_present
        expect(item.name).to be_present
        expect(item.procedure_location).to be_present
        expect(item.remarks).to be_present
      end

      expect(Guide::Question.all.size).to eq 4
      Guide::Question.all.each_with_index do |item, idx|
        expect(item.id_name).to be_present
        expect(item.name).to be_present
        expect(item.question_type).to be_present
        expect(item.check_type).to be_present
      end

      ## upload 1 file

      clear_downloads
      visit download_combinations_guide_importers_path(site, node)
      wait_for_download
      ::FileUtils.cp(downloads[0], download1_file)
      download1_hash = Digest::SHA256.file(download1_file).hexdigest

      visit import_combinations_guide_importers_path(site, node)
      within "form#task-form" do
        attach_file "item[in_file]", download1_file
        page.accept_confirm(I18n.t("ss.confirm.import")) do
          click_on I18n.t('ss.buttons.import')
        end
      end
      wait_for_notice I18n.t("ss.notice.saved")

      clear_downloads
      visit download_combinations_guide_importers_path(site, node)
      wait_for_download
      ::FileUtils.cp(downloads[0], download2_file)
      download2_hash = Digest::SHA256.file(download2_file).hexdigest

      ## upload 1 file

      Guide::Procedure.all.destroy_all
      Guide::Question.all.destroy_all
      expect(Guide::Procedure.all.size).to eq 0
      expect(Guide::Question.all.size).to eq 0

      visit import_combinations_guide_importers_path(site, node)
      within "form#task-form" do
        attach_file "item[in_file]", download1_file
        page.accept_confirm(I18n.t("ss.confirm.import")) do
          click_on I18n.t('ss.buttons.import')
        end
      end
      wait_for_notice I18n.t("ss.notice.saved")

      clear_downloads
      visit download_combinations_guide_importers_path(site, node)
      wait_for_download
      ::FileUtils.cp(downloads[0], download3_file)
      download3_hash = Digest::SHA256.file(download3_file).hexdigest

      expect(download1_hash).to eq download2_hash
      expect(download1_hash).to eq download3_hash
    end
  end

  context "questions_relation" do
    let(:download1_file) { tmpfile(extname: ".csv") }
    let(:download2_file) { tmpfile(extname: ".csv") }

    before { login_cms_user }

    it "#import_combinations" do
      visit import_combinations_guide_importers_path(site, node)
      within "form#task-form" do
        attach_file "item[in_file]", "#{Rails.root}/spec/fixtures/guide/csv/guide000_0000000000.csv"
        page.accept_confirm(I18n.t("ss.confirm.import")) do
          click_on I18n.t('ss.buttons.import')
        end
      end
      wait_for_notice I18n.t("ss.notice.saved")

      clear_downloads
      visit download_combinations_guide_importers_path(site, node)
      wait_for_download
      ::FileUtils.cp(downloads[0], download1_file)
      download1_hash = Digest::SHA256.file(download1_file).hexdigest

      expect(Guide::Procedure.all.size).to eq 2
      expect(Guide::Question.all.size).to eq 2

      visit import_combinations_guide_importers_path(site, node)
      within "form#task-form" do
        attach_file "item[in_file]", "#{Rails.root}/spec/fixtures/guide/csv/guide000_0000000000.csv"
        page.accept_confirm(I18n.t("ss.confirm.import")) do
          click_on I18n.t('ss.buttons.import')
        end
      end
      wait_for_notice I18n.t("ss.notice.saved")

      clear_downloads
      visit download_combinations_guide_importers_path(site, node)
      wait_for_download
      ::FileUtils.cp(downloads[0], download2_file)
      download2_hash = Digest::SHA256.file(download2_file).hexdigest

      expect(download1_hash).to eq download2_hash
    end
  end
end
