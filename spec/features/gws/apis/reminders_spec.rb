require 'spec_helper'

describe "gws_apis_reminders", type: :feature, dbscope: :example, js: true do
  let(:site) { gws_site }
  let(:path) { gws_schedule_plan_path site, item }
  let(:now) { Time.zone.now.beginning_of_minute }

  before { login_gws_user }

  context "create" do
    let(:item) do
      create(
        :gws_schedule_plan,
        start_at: now + 1.hour,
        end_at: now + 2.hours
      )
    end

    it do
      expect(Gws::Reminder.where(item_id: item.id).count).to eq 0

      visit path
      within '.gws-addon-reminder' do
        within first('.reminder-conditions tr') do
          select I18n.t('gws/reminder.options.notify_state.mail'), from: 'item[in_reminder_conditions][][state]'
          find('button.action-insert').click
        end
        click_on I18n.t('gws/reminder.buttons.register_reminder')
      end
      wait_for_notice I18n.t('gws/reminder.notification.created')
      expect(Gws::Reminder.where(item_id: item.id).count).to eq 1
    end
  end

  context "remove" do
    let(:reminder_condition) do
      { 'user_id' => gws_user.id, 'state' => 'mail', 'interval' => 10, 'interval_type' => 'minutes' }
    end
    let(:item) do
      create(
        :gws_schedule_plan,
        start_at: now + 1.hour,
        end_at: now + 2.hours,
        in_reminder_conditions: [ reminder_condition ]
      )
    end

    it do
      expect(Gws::Reminder.where(item_id: item.id).count).to eq 1

      visit path
      within '.gws-addon-reminder' do
        within first('.reminder-conditions tr') do
          find('button.action-remove').click
        end
        click_on I18n.t('gws/reminder.buttons.register_reminder')
      end
      wait_for_notice I18n.t('gws/reminder.notification.created')
      expect(Gws::Reminder.where(item_id: item.id).count).to eq 0
    end
  end
end
