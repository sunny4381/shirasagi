require 'spec_helper'

describe "history_cms_backups restore", type: :feature, dbscope: :example do
  let(:site) { cms_site }
  let(:node) { create_once :article_node_page, filename: "docs", name: "article" }
  let(:file) { create :ss_file, user_id: cms_user.id }
  let(:page_item) do
    page_item = create(:article_page, cur_node: node)
    Timecop.travel(1.day.from_now) do
      page_item.name = "first update"
      page_item.state = "public"
      page_item.file_ids = [file.id]
      page_item.update
    end
    Timecop.travel(2.days.from_now) do
      page_item.name = "second update"
      page_item.state = "closed"
      page_item.file_ids = []
      page_item.index_name = "second index_name"
      page_item.update
    end
    page_item
  end
  let(:backup_item) { page_item.backups.find { |item| item.data["name"] == "first update" } }
  let(:page_path) { article_page_path site.id, node, page_item }
  let(:show_path) do
    source = ERB::Util.url_encode(page_path)
    history_cms_backup_path site.id, source, backup_item._id
  end
  let(:restore_path) do
    source = ERB::Util.url_encode(page_path)
    history_cms_restore_path site.id, source, backup_item._id
  end

  context "with auth" do
    before { login_cms_user }

    it "#show" do
      visit show_path
      expect(current_path).not_to eq sns_login_path

      click_link I18n.t("ss.links.show")
      expect(current_path).to eq page_path
    end

    it "#restore" do
      visit page_path

      basic_values = page.all("#addon-basic dd").map(&:text)
      expect(basic_values.index("second update")).to be_truthy
      expect(basic_values.include?("second index_name")).to be_truthy
      expect(page).to have_no_css('div.file-view', text: file.name)

      click_link I18n.l(backup_item.created, format: :picker)
      expect(current_path).not_to eq sns_login_path

      click_link I18n.t("history.restore")
      expect(current_path).to eq restore_path

      click_button I18n.t("history.buttons.restore")
      expect(current_path).to eq show_path

      expect(Job::Log.count).to eq 1
      Job::Log.first.tap do |log|
        expect(log.logs).to include(/INFO -- : .* Started Job/)
        expect(log.logs).to include(/INFO -- : .* Completed Job/)
        expect(log.class_name).to eq "History::Backup::RestoreJob"
        expect(log.args.first).to eq backup_item.id.to_s
      end

      expect(SS::Task.count).to eq 1
      SS::Task.first.tap do |task|
        expect(task.name).to eq "cms_pages:#{page_item.id}"
        expect(task.state).to eq "completed"
      end

      click_link I18n.t("ss.links.show")
      expect(current_path).to eq page_path

      basic_values = page.all("#addon-basic dd").map(&:text)
      expect(basic_values.index("first update")).to be_truthy
      expect(basic_values.include?("second index_name")).not_to be_truthy
      expect(page).to have_css('div.file-view', text: file.name)
    end
  end
end
