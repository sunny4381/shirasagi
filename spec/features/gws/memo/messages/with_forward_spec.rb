require 'spec_helper'

describe 'gws_memo_messages', type: :feature, dbscope: :example, js: true do
  context 'when a message save as draft with a recipient enabled forward setting' do
    let(:site) { gws_site }
    let!(:recipient) do
      create(:gws_user, cur_site: site, email: nil, group_ids: gws_user.group_ids, gws_role_ids: gws_user.gws_role_ids)
    end
    let(:subject) { "subject-#{unique_id}" }
    let(:texts) { Array.new(rand(2..3)) { "text-#{unique_id}" } }
    let(:forward_email1) { "#{unique_id}@example.jp" }
    let(:forward_email2) { "#{unique_id}@example.jp" }
    let(:forward_subject) { "[#{I18n.t("gws/memo/message.message")}]#{I18n.t("gws/memo/forward.subject")}:#{gws_user.name}" }

    shared_examples "save as draft and send" do
      before do
        ActionMailer::Base.deliveries.clear

        Gws::Memo::Forward.create!(
          cur_site: site, cur_user: recipient,
          default: "enabled", emails: [ forward_email1, forward_email2 ]
        )

        login_gws_user
      end

      after do
        ActionMailer::Base.deliveries.clear
      end

      it do
        visit gws_memo_messages_path(site)
        click_on I18n.t('ss.links.new')
        wait_for_js_ready

        within 'form#item-form' do
          click_on I18n.t("webmail.links.show_cc_bcc")

          wait_for_cbox_opened do
            within 'dl.see.all' do
              click_on I18n.t('gws.organization_addresses')
            end
          end
        end

        within_cbox do
          expect(page).to have_content(recipient.name)
          check "#{target}_ids#{recipient.id}"
          wait_for_cbox_closed { click_on I18n.t('ss.links.select') }
        end

        within 'form#item-form' do
          within "dl.see.#{target}" do
            expect(page).to have_css(".index", text: recipient.name)
          end
          fill_in 'item[subject]', with: subject
          fill_in 'item[text]', with: texts.join("\n")

          click_on I18n.t('ss.buttons.draft_save')
        end
        wait_for_notice I18n.t("ss.notice.saved")

        # do not send forward mail
        expect(ActionMailer::Base.deliveries).to have(0).items

        # send message
        visit gws_memo_messages_path(site)
        within ".gws-memo-folder" do
          click_on I18n.t("gws/memo/folder.inbox_draft")
        end
        click_on subject
        click_on I18n.t("ss.links.edit")
        wait_for_js_ready
        within 'form#item-form' do
          page.accept_confirm do
            click_on I18n.t("ss.buttons.send")
          end
        end
        wait_for_notice I18n.t("ss.notice.sent")

        expect(Gws::Memo::Message.count).to eq 1
        message = Gws::Memo::Message.first
        expect(message.subject).to eq subject
        expect(message.text).to eq texts.join("\r\n")

        # send forward mail
        expect(ActionMailer::Base.deliveries).to have(1).items
        ActionMailer::Base.deliveries.first.tap do |mail|
          expect(mail.from.first).to eq site.sender_address
          expect(mail.bcc.first).to eq forward_email1
          expect(mail.bcc.second).to eq forward_email2
          expect(mail.mime_type).to eq "text/plain"
          expect(mail.subject).to eq forward_subject
          expect(mail.body.multipart?).to be_falsey
          expect(mail.body.raw_source).to include(subject)
          expect(mail.body.raw_source).to include(texts.join("\r\n"))
          url = "#{SS.config.gws.canonical_scheme}://#{SS.config.gws.canonical_domain}"
          url += "/.g#{site.id}/memo/messages/REDIRECT/#{message.id}"
          expect(mail.body.raw_source).to include(url)

          if target != 'bcc'
            expect(mail.body.raw_source).to include(recipient.name + "\r\n")
          end
          expect(mail.message_id).to end_with("@#{SS.config.gws.canonical_domain}.mail")
        end
      end
    end

    context "when to is given" do
      let(:target) { 'to' }
      it_behaves_like "save as draft and send"
    end

    context "when cc is given" do
      let(:target) { 'cc' }
      it_behaves_like "save as draft and send"
    end

    context "when bcc is given" do
      let(:target) { 'bcc' }
      it_behaves_like "save as draft and send"
    end
  end

  context 'message is created in text format, then message is updated in html format' do
    let(:site) { gws_site }
    let!(:recipient) do
      create(:gws_user, cur_site: site, email: nil, group_ids: gws_user.group_ids, gws_role_ids: gws_user.gws_role_ids)
    end
    let(:subject) { "subject-#{unique_id}" }
    let(:texts) { Array.new(rand(2..3)) { "text-#{unique_id}" } }
    let(:html) do
      <<~HTML.strip
        <p>html-#{unique_id}</p>
        <p>html-#{unique_id}</p>
      HTML
    end
    let(:forward_email1) { "#{unique_id}@example.jp" }
    let(:forward_email2) { "#{unique_id}@example.jp" }
    let(:forward_subject) { "[#{I18n.t("gws/memo/message.message")}]#{I18n.t("gws/memo/forward.subject")}:#{gws_user.name}" }

    shared_examples "save as draft and send #2" do
      before do
        ActionMailer::Base.deliveries.clear

        Gws::Memo::Forward.create!(
          cur_site: site, cur_user: recipient,
          default: "enabled", emails: [ forward_email1, forward_email2 ]
        )

        login_gws_user
      end

      after do
        ActionMailer::Base.deliveries.clear
      end

      it do
        #
        # create a message in text format
        #
        visit gws_memo_messages_path(site)
        click_on I18n.t('ss.links.new')
        wait_for_js_ready

        within 'form#item-form' do
          click_on I18n.t("webmail.links.show_cc_bcc")

          wait_for_cbox_opened do
            within 'dl.see.all' do
              click_on I18n.t('gws.organization_addresses')
            end
          end
        end

        within_cbox do
          expect(page).to have_content(recipient.name)
          check "#{target}_ids#{recipient.id}"
          wait_for_cbox_closed { click_on I18n.t('ss.links.select') }
        end

        within 'form#item-form' do
          within "dl.see.#{target}" do
            expect(page).to have_css(".index", text: recipient.name)
          end
          fill_in 'item[subject]', with: subject
          fill_in 'item[text]', with: texts.join("\n")

          click_on I18n.t('ss.buttons.draft_save')
        end
        wait_for_notice I18n.t("ss.notice.saved")

        # do not send forward mail at this time
        expect(ActionMailer::Base.deliveries).to have(0).items

        expect(Gws::Memo::Message.all.count).to eq 1
        Gws::Memo::Message.all.first.tap do |message|
          expect(message.subject).to eq subject
          expect(message.format).to eq "text"
          expect(message.text).to eq texts.join("\r\n")
          expect(message.html).to be_blank
          expect(message.user_settings).to include({ 'user_id' => recipient.id, 'path' => 'INBOX' })
          if target == 'to'
            expect(message.to_member_name).to eq recipient.long_name
          else
            expect(message.to_member_name).to be_blank
          end
          expect(message.from_member_name).to eq gws_user.long_name
          expect(message.member_ids).to eq [ recipient.id ]
        end

        #
        # update a message in html format
        #
        visit gws_memo_messages_path(site)
        within ".gws-memo-folder" do
          click_on I18n.t("gws/memo/folder.inbox_draft")
        end
        click_on subject
        click_on I18n.t("ss.links.edit")
        wait_for_js_ready
        within 'form#item-form' do
          select "HTML", from: "item[format]"
          wait_for_all_ckeditors_ready

          fill_in_ckeditor "item[html]", with: html
          click_on I18n.t('ss.buttons.draft_save')
        end
        wait_for_notice I18n.t("ss.notice.saved")

        # do not send forward mail at this time
        expect(ActionMailer::Base.deliveries).to have(0).items

        expect(Gws::Memo::Message.all.count).to eq 1
        Gws::Memo::Message.all.first.tap do |message|
          expect(message.subject).to eq subject
          expect(message.format).to eq "html"
          expect(message.text).to eq texts.join("\r\n")
          expect(message.html).to eq html.gsub("\n", "\r\n\r\n")
          expect(message.user_settings).to include({ 'user_id' => recipient.id, 'path' => 'INBOX' })
          if target == 'to'
            expect(message.to_member_name).to eq recipient.long_name
          else
            expect(message.to_member_name).to be_blank
          end
          expect(message.from_member_name).to eq gws_user.long_name
          expect(message.member_ids).to eq [ recipient.id ]
        end

        # send message
        visit gws_memo_messages_path(site)
        within ".gws-memo-folder" do
          click_on I18n.t("gws/memo/folder.inbox_draft")
        end
        click_on subject
        click_on I18n.t("ss.links.edit")
        wait_for_js_ready
        within 'form#item-form' do
          page.accept_confirm do
            click_on I18n.t("ss.buttons.send")
          end
        end
        wait_for_notice I18n.t("ss.notice.sent")

        expect(Gws::Memo::Message.count).to eq 1
        message = Gws::Memo::Message.first
        expect(message.subject).to eq subject
        expect(message.format).to eq "html"
        expect(message.text).to eq texts.join("\r\n")
        expect(message.html).to eq html.gsub("\n", "\r\n\r\n")
        expect(message.user_settings).to include({ 'user_id' => recipient.id, 'path' => 'INBOX' })
        if target == 'to'
          expect(message.to_member_name).to eq recipient.long_name
        else
          expect(message.to_member_name).to be_blank
        end
        expect(message.from_member_name).to eq gws_user.long_name
        expect(message.member_ids).to eq [ recipient.id ]

        # send forward mail
        expect(ActionMailer::Base.deliveries).to have(1).items
        ActionMailer::Base.deliveries.first.tap do |mail|
          expect(mail.from.first).to eq site.sender_address
          expect(mail.bcc.first).to eq forward_email1
          expect(mail.bcc.second).to eq forward_email2
          expect(mail.mime_type).to eq "text/html"
          expect(mail.subject).to eq forward_subject
          expect(mail.body.multipart?).to be_falsey
          mail.body.raw_source.tap do |body|
            expect(body).to include(subject)
            expect(body).to include(html.gsub("\n", "\r\n\r\n"))
            url = "#{SS.config.gws.canonical_scheme}://#{SS.config.gws.canonical_domain}"
            url += "/.g#{site.id}/memo/messages/REDIRECT/#{message.id}"
            expect(body).to include(url)
            expect(body).to include(gws_user.name)
            if target != 'bcc'
              expect(body).to include(recipient.name)
            end
          end
          expect(mail.message_id).to end_with("@#{SS.config.gws.canonical_domain}.mail")
        end
      end
    end

    context "when to is given" do
      let(:target) { 'to' }
      it_behaves_like "save as draft and send #2"
    end

    context "when cc is given" do
      let(:target) { 'cc' }
      it_behaves_like "save as draft and send #2"
    end

    context "when bcc is given" do
      let(:target) { 'bcc' }
      it_behaves_like "save as draft and send #2"
    end
  end
end
