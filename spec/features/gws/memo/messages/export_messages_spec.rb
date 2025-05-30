require 'spec_helper'

describe 'gws_memo_messages', type: :feature, dbscope: :example, js: true do
  let(:site) { gws_site }
  let(:user) { gws_user }

  before do
    site.canonical_domain = "#{unique_id}.example.jp"
    site.save!
  end

  describe 'export selected message' do
    before { login_gws_user }

    def export_memo(memo, format: nil)
      visit gws_memo_export_messages_path(site)
      within "form#item-form" do
        choose "item_export_filter_selected"
        wait_for_cbox_opened { click_on I18n.t("ss.links.select") }
      end
      within_cbox do
        expect(page).to have_css(".list-item", text: memo.subject)
        wait_for_cbox_closed { click_on memo.subject }
      end
      within "form#item-form" do
        expect(page).to have_content(memo.subject)
      end
      perform_enqueued_jobs do
        within "form#item-form" do
          click_on I18n.t("ss.export")
        end
        wait_for_notice I18n.t("gws/memo/message.notice.start_export")
      end
      within '#addon-basic' do
        expect(page).to have_content(I18n.t("gws/memo/message.export.start_message").split("\n").first)
      end

      expect(Job::Log.count).to eq 1
      Job::Log.first.tap do |log|
        expect(log.logs).to include(/INFO -- : .* Started Job/)
        expect(log.logs).to include(/INFO -- : .* Completed Job/)
      end

      clear_notice

      within "nav.user" do
        first(".gws-memo-notice.popup-notice-container a").click
        wait_for_js_ready

        within ".popup-notice-items .list-item.unseen" do
          click_on I18n.t("gws/memo/message.export.subject", locale: I18n.default_locale)
        end
        wait_for_js_ready
      end

      within ".gws-memo-notices .body" do
        message = I18n.t("gws/memo/message.export.notify_message", link: "", locale: I18n.default_locale).split("\n").first
        expect(page).to have_content(message)
        expect(page).to have_link(href: /\.zip$/)
        first("a").click
      end
      wait_for_js_ready

      wait_for_download

      exported = {}
      Zip::File.open(downloads.first) do |zip_file|
        zip_file.each do |entry|
          name = NKF.nkf("-w", entry.name)
          mail = ::Mail.read_from_string(entry.get_input_stream.read)

          exported[name] = mail
        end
      end

      exported
    end

    context "with unseen message" do
      let!(:memo) do
        create(:gws_memo_message, user: user, site: site, subject: ss_japanese_text, text: ss_japanese_text)
      end

      it do
        exported = export_memo(memo)

        expect(exported).to have(1).items
        filename = memo.subject.encode('cp932', invalid: :replace, undef: :replace, replace: "_")
        filename = filename.encode("UTF-8")
        expect(exported.keys).to include(include(filename))
        exported.values.first.tap do |mail|
          expect(mail.message_id.to_s).to eq "#{memo.id}@#{site.canonical_domain}"
          expect(mail.sender).to be_nil
          expect(mail.date.to_s).to eq memo.created.to_s
          expect(mail[:from].to_s).to eq "#{memo.from.name} <#{memo.from.email}>"
          expect(mail[:to].to_s).to eq memo.to_members.map { |u| "#{u.name} <#{u.email}>" }.join(", ")
          expect(mail[:cc]).to be_nil
          expect(mail[:bcc]).to be_nil
          expect(mail[:reply_to]).to be_nil
          expect(mail["X-Shirasagi-Status"].decoded).to eq "未読"
          expect(mail["X-Shirasagi-Version"].decoded).to eq SS.version
          expect(mail["X-Shirasagi-Exported"].decoded).to be_present
          expect(mail.in_reply_to).to be_nil
          expect(mail.references).to be_nil
          expect(mail.subject).to eq memo.subject
          expect(mail.mime_type).to eq "text/plain"
          expect(mail.multipart?).to be_falsey
          expect(mail.parts).to be_blank
          body = mail.body.decoded
          body.force_encoding("UTF-8")
          expect(body).to include(memo.text)
        end
      end
    end

    context "with seen message" do
      let!(:memo) do
        create(:gws_memo_message, user: user, site: site, subject: ss_japanese_text, text: ss_japanese_text)
      end

      before do
        memo.set_seen(gws_user).save!
      end

      it do
        exported = export_memo(memo)

        expect(exported).to have(1).items
        filename = memo.subject.encode('cp932', invalid: :replace, undef: :replace, replace: "_")
        filename = filename.encode("UTF-8")
        expect(exported.keys).to include(include(filename))
        exported.values.first.tap do |mail|
          expect(mail.message_id.to_s).to eq "#{memo.id}@#{site.canonical_domain}"
          expect(mail.sender).to be_nil
          expect(mail.date.to_s).to eq memo.created.to_s
          expect(mail[:from].to_s).to eq "#{memo.from.name} <#{memo.from.email}>"
          expect(mail[:to].to_s).to eq memo.to_members.map { |u| "#{u.name} <#{u.email}>" }.join(", ")
          expect(mail[:cc]).to be_nil
          expect(mail[:bcc]).to be_nil
          expect(mail[:reply_to]).to be_nil
          expect(mail["X-Shirasagi-Status"].decoded).to eq "既読"
          expect(mail["X-Shirasagi-Version"].decoded).to eq SS.version
          expect(mail["X-Shirasagi-Exported"].decoded).to be_present
          expect(mail.in_reply_to).to be_nil
          expect(mail.references).to be_nil
          expect(mail.subject).to eq memo.subject
          expect(mail.mime_type).to eq "text/plain"
          expect(mail.multipart?).to be_falsey
          expect(mail.parts).to be_blank
          body = mail.body.decoded
          body.force_encoding("UTF-8")
          expect(body).to include(memo.text)
        end
      end
    end

    context "with message which has star" do
      let!(:memo) do
        create(:gws_memo_message, user: user, site: site, subject: ss_japanese_text, text: ss_japanese_text)
      end

      before do
        memo.set_star(gws_user).save!
      end

      it do
        exported = export_memo(memo)

        expect(exported).to have(1).items
        filename = memo.subject.encode('cp932', invalid: :replace, undef: :replace, replace: "_")
        filename = filename.encode("UTF-8")
        expect(exported.keys).to include(include(filename))
        exported.values.first.tap do |mail|
          expect(mail.message_id.to_s).to eq "#{memo.id}@#{site.canonical_domain}"
          expect(mail.sender).to be_nil
          expect(mail.date.to_s).to eq memo.created.to_s
          expect(mail[:from].to_s).to eq "#{memo.from.name} <#{memo.from.email}>"
          expect(mail[:to].to_s).to eq memo.to_members.map { |u| "#{u.name} <#{u.email}>" }.join(", ")
          expect(mail[:cc]).to be_nil
          expect(mail[:bcc]).to be_nil
          expect(mail[:reply_to]).to be_nil
          expect(mail["X-Shirasagi-Status"].decoded).to eq "未読, スター"
          expect(mail["X-Shirasagi-Version"].decoded).to eq SS.version
          expect(mail["X-Shirasagi-Exported"].decoded).to be_present
          expect(mail.in_reply_to).to be_nil
          expect(mail.references).to be_nil
          expect(mail.subject).to eq memo.subject
          expect(mail.mime_type).to eq "text/plain"
          expect(mail.multipart?).to be_falsey
          expect(mail.parts).to be_blank
          body = mail.body.decoded
          body.force_encoding("UTF-8")
          expect(body).to include(memo.text)
        end
      end
    end

    context "with html message" do
      let!(:memo) do
        create(
          :gws_memo_message, user: user, site: site, format: "html",
          subject: ss_japanese_text, html: "<p>#{ss_japanese_text}</p>"
        )
      end

      it do
        exported = export_memo(memo)

        expect(exported).to have(1).items
        filename = memo.subject.encode('cp932', invalid: :replace, undef: :replace, replace: "_")
        filename = filename.encode("UTF-8")
        expect(exported.keys).to include(include(filename))
        exported.values.first.tap do |mail|
          expect(mail.message_id.to_s).to eq "#{memo.id}@#{site.canonical_domain}"
          expect(mail.sender).to be_nil
          expect(mail.date.to_s).to eq memo.created.to_s
          expect(mail[:from].to_s).to eq "#{memo.from.name} <#{memo.from.email}>"
          expect(mail[:to].to_s).to eq memo.to_members.map { |u| "#{u.name} <#{u.email}>" }.join(", ")
          expect(mail[:cc]).to be_nil
          expect(mail[:bcc]).to be_nil
          expect(mail[:reply_to]).to be_nil
          expect(mail["X-Shirasagi-Status"].decoded).to eq "未読"
          expect(mail["X-Shirasagi-Version"].decoded).to eq SS.version
          expect(mail["X-Shirasagi-Exported"].decoded).to be_present
          expect(mail.in_reply_to).to be_nil
          expect(mail.references).to be_nil
          expect(mail.subject).to eq memo.subject
          expect(mail.mime_type).to eq "text/html"
          expect(mail.multipart?).to be_falsey
          expect(mail.parts).to be_blank
          body = mail.body.decoded
          body.force_encoding("UTF-8")
          expect(body).to include(memo.html)
        end
      end
    end

    context "with list message" do
      let!(:list) { create :gws_memo_list, cur_site: site }

      context "with public" do
        let!(:memo) do
          create(
            :gws_memo_list_message, cur_user: user, cur_site: site,
            list: list, from_member_name: list.sender_name, member_ids: list.overall_members.map(&:id),
            in_validate_presence_member: true, in_append_signature: true, in_skip_validates_sender_quota: true,
            subject: ss_japanese_text, text: ss_japanese_text, state: "public"
          )
        end

        it do
          expect(memo.from_member_name).to eq list.sender_name
          exported = export_memo(memo)

          expect(exported).to have(1).items
          filename = memo.subject.encode('cp932', invalid: :replace, undef: :replace, replace: "_")
          filename = filename.encode("UTF-8")
          expect(exported.keys).to include(include(filename))
          exported.values.first.tap do |mail|
            expect(mail.message_id.to_s).to eq "#{memo.id}@#{site.canonical_domain}"
            expect(mail.sender).to be_nil
            expect(mail.date.to_s).to eq memo.created.to_s
            expect(mail[:from].to_s).to include list.sender_name
            expect(mail[:to].to_s).to eq "#{list.name} <#{list.name}@lists.#{site.canonical_domain}>"
            expect(mail[:cc]).to be_nil
            expect(mail[:bcc]).to be_nil
            expect(mail[:reply_to]).to be_nil
            expect(mail["X-Shirasagi-Status"].decoded).to eq "未読"
            expect(mail["X-Shirasagi-Version"].decoded).to eq SS.version
            expect(mail["X-Shirasagi-Exported"].decoded).to be_present
            expect(mail.in_reply_to).to be_nil
            expect(mail.references).to be_nil
            expect(mail.subject).to eq memo.subject
            expect(mail.mime_type).to eq "text/plain"
            expect(mail.multipart?).to be_falsey
            expect(mail.parts).to be_blank
            body = mail.body.decoded
            body.force_encoding("UTF-8")
            expect(body).to include(memo.text)
          end
        end
      end
    end
  end

  describe 'export empty message' do
    before { login_gws_user }

    it do
      visit gws_memo_export_messages_path(site)
      within "form#item-form" do
        choose "item_export_filter_all"
        wait_for_js_ready

        perform_enqueued_jobs do
          click_on I18n.t("ss.export")
        end
      end

      wait_for_notice I18n.t("gws/memo/message.notice.start_export")
      within '#addon-basic' do
        expect(page).to have_content(I18n.t("gws/memo/message.export.start_message").split("\n").first)
      end

      expect(Job::Log.count).to eq 1
      Job::Log.first.tap do |log|
        expect(log.logs).to include(/INFO -- : .* Started Job/)
        expect(log.logs).to include(/INFO -- : .* Completed Job/)
      end

      clear_notice

      within "nav.user" do
        first(".gws-memo-notice.popup-notice-container a").click
        wait_for_js_ready

        I18n.t("gws/memo/message.export_failed.subject", locale: I18n.default_locale).tap do |title|
          expect(page).to have_css('.popup-notice-items .list-item.unseen', text: /#{::Regexp.escape(title)}/)
          click_on title
        end
        wait_for_js_ready
      end

      within ".gws-memo-notices .body" do
        message = I18n.t("gws/memo/message.export_failed.notify_message", locale: I18n.default_locale).split("\n").first
        expect(page).to have_content(message)
      end
    end
  end

  describe 'export all message' do
    let(:user1) { create :gws_user, email: nil, gws_role_ids: gws_user.gws_role_ids }
    let(:file) { create :ss_file, cur_user: gws_user }
    let!(:folder1) { create(:gws_memo_folder, user: user, site: site, name: ss_japanese_text) }
    let!(:folder2) { create(:gws_memo_folder, user: user, site: site, name: "#{folder1.name}/#{ss_japanese_text}") }
    let!(:memo1) do
      create(
        :gws_memo_message, user: user, site: site, subject: ss_japanese_text, text: ss_japanese_text,
        in_cc_members: [user1.id.to_s]
      )
    end
    let!(:memo2) do
      create(
        :gws_memo_message, user: user, site: site, subject: ss_japanese_text, text: ss_japanese_text,
        in_bcc_members: [user1.id.to_s]
      )
    end
    let!(:memo3) do
      create(
        :gws_memo_message, user: user, site: site, subject: ss_japanese_text, text: ss_japanese_text,
        in_path: { user.id.to_s => folder2.folder_path }, file_ids: [file.id]
      )
    end
    let!(:memo4) do
      create(
        :gws_memo_message, user: user, site: site, subject: ss_japanese_text, text: ss_japanese_text,
        in_to_members: [user1.id.to_s]
      )
    end

    before { login_gws_user }

    it do
      visit gws_memo_export_messages_path(site)
      within "form#item-form" do
        choose "item_export_filter_all"
        wait_for_js_ready

        perform_enqueued_jobs do
          click_on I18n.t("ss.export")
        end
      end

      wait_for_notice I18n.t("gws/memo/message.notice.start_export")
      within '#addon-basic' do
        expect(page).to have_content(I18n.t("gws/memo/message.export.start_message").split("\n").first)
      end

      expect(Job::Log.count).to eq 1
      Job::Log.first.tap do |log|
        expect(log.logs).to include(/INFO -- : .* Started Job/)
        expect(log.logs).to include(/INFO -- : .* Completed Job/)
      end

      clear_notice

      within "nav.user" do
        first(".gws-memo-notice.popup-notice-container a").click
        wait_for_js_ready

        within ".popup-notice-items .list-item.unseen" do
          click_on I18n.t("gws/memo/message.export.subject", locale: I18n.default_locale)
        end
        wait_for_js_ready
      end

      within ".gws-memo-notices .body" do
        message = I18n.t("gws/memo/message.export.notify_message", link: "", locale: I18n.default_locale).split("\n").first
        expect(page).to have_content(message)
        expect(page).to have_link(href: /\.zip$/)
        first("a").click
      end
      wait_for_js_ready

      wait_for_download

      exported = {}
      Zip::File.open(downloads.first) do |zip_file|
        zip_file.each do |entry|
          name = NKF.nkf("-w", entry.name)
          mail = ::Mail.read_from_string(entry.get_input_stream.read)

          exported[name] = mail
        end
      end

      expect(exported.keys).to have(4).items
      expect(exported.keys).to include(include("#{folder2.name}/"))
      memo1.subject.tap do |subject|
        filename = subject.encode('cp932', invalid: :replace, undef: :replace, replace: "_")
        filename = filename.encode("UTF-8")
        expect(exported.keys).to include(include(filename))
      end
      memo2.subject.tap do |subject|
        filename = subject.encode('cp932', invalid: :replace, undef: :replace, replace: "_")
        filename = filename.encode("UTF-8")
        expect(exported.keys).to include(include(filename))
      end
      memo3.subject.tap do |subject|
        filename = subject.encode('cp932', invalid: :replace, undef: :replace, replace: "_")
        filename = filename.encode("UTF-8")
        expect(exported.keys).to include(include(filename))
      end
    end
  end

  describe 'export json format' do
    let(:user1) { create :gws_user, gws_role_ids: gws_user.gws_role_ids }
    let!(:memo1) { create(:gws_memo_message, user: user, site: site, subject: ss_japanese_text, text: ss_japanese_text) }

    before { login_gws_user }

    it do
      visit gws_memo_export_messages_path(site)
      within "form#item-form" do
        choose "item_export_filter_all"
        wait_for_js_ready

        perform_enqueued_jobs do
          click_on I18n.t("ss.export")
        end
      end

      wait_for_notice I18n.t("gws/memo/message.notice.start_export")
      within '#addon-basic' do
        expect(page).to have_content(I18n.t("gws/memo/message.export.start_message").split("\n").first)
      end

      expect(Job::Log.count).to eq 1
      Job::Log.first.tap do |log|
        expect(log.logs).to include(/INFO -- : .* Started Job/)
        expect(log.logs).to include(/INFO -- : .* Completed Job/)
      end

      clear_notice

      within "nav.user" do
        first(".gws-memo-notice.popup-notice-container a").click
        wait_for_js_ready

        within ".popup-notice-items .list-item.unseen" do
          click_on I18n.t("gws/memo/message.export.subject", locale: I18n.default_locale)
        end
        wait_for_js_ready
      end

      within ".gws-memo-notices .body" do
        message = I18n.t("gws/memo/message.export.notify_message", link: "", locale: I18n.default_locale).split("\n").first
        expect(page).to have_content(message)
        expect(page).to have_link(href: /\.zip$/)
        first("a").click
      end
      wait_for_js_ready

      wait_for_download

      exported = {}
      Zip::File.open(downloads.first) do |zip_file|
        zip_file.each do |entry|
          name = NKF.nkf("-w", entry.name)
          mail = ::Mail.read_from_string(entry.get_input_stream.read)

          exported[name] = mail
        end
      end

      expect(exported.keys).to have(1).items
      memo1.subject.tap do |subject|
        filename = subject.encode('cp932', invalid: :replace, undef: :replace, replace: "_")
        filename = filename.encode("UTF-8")
        expect(exported.keys).to include(include(filename))
      end
    end
  end

  context "export messages are only allowed at once per user" do
    let!(:memo) { create(:gws_memo_message, user: user, site: site) }

    before do
      args = [{}]
      Job::Task.create!(
        user_id: gws_user.id, name: SecureRandom.uuid, class_name: "Gws::Memo::MessageExportJob", app_type: "sys",
        pool: "default", args: args, active_job: {
          "job_class" => "Gws::Memo::MessageExportJob", "job_id" => SecureRandom.uuid, "provider_job_id" => nil,
          "queue_name" => "default", "priority" => nil, "arguments" => args
        }
      )

      login_gws_user
    end

    it do
      visit gws_memo_export_messages_path(site)
      within "form#item-form" do
        wait_for_cbox_opened { click_on I18n.t("ss.links.select") }
      end
      within_cbox do
        expect(page).to have_css(".list-item", text: memo.subject)
        wait_for_cbox_closed { click_on memo.subject }
      end
      within "form#item-form" do
        expect(page).to have_content(memo.subject)
        click_on I18n.t("ss.export")
      end

      wait_for_error I18n.t("job.notice.size_limit_exceeded")

      # export again
      within "form#item-form" do
        wait_for_cbox_opened { click_on I18n.t("ss.links.select") }
      end
      within_cbox do
        expect(page).to have_css(".list-item", text: memo.subject)
        wait_for_cbox_closed { click_on memo.subject }
      end
      within "form#item-form" do
        expect(page).to have_content(memo.subject)
        click_on I18n.t("ss.export")
      end

      wait_for_error I18n.t("job.notice.size_limit_exceeded")
    end
  end
end
