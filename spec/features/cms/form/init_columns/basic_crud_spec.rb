require 'spec_helper'

describe Cms::Form::InitColumnsController, type: :feature, dbscope: :example, js: true do
  let(:site) { cms_site }
  let(:form) { create(:cms_form, cur_site: site, sub_type: 'entry') }
  let!(:column) { create(:cms_column_text_field, cur_form: form, cur_site: site) }

  before { login_cms_user }

  context 'basic crud' do
    it do
      #
      # Create
      #
      visit cms_form_path(site, form)
      click_on I18n.t('cms.buttons.manage_init_columns')
      wait_for_event_fired("ss:dropdownOpened") { click_on I18n.t('ss.links.new') }
      within ".cms-dropdown-menu" do
        click_on column.name
      end

      within 'form#item-form' do
        fill_in 'item[order]', with: 1
        click_on I18n.t('ss.buttons.save')
      end
      wait_for_notice I18n.t('ss.notice.saved')
      expect(Cms::InitColumn.form(form).count).to eq 1
      Cms::InitColumn.form(form).first.tap do |item|
        expect(item.order).to eq 1
      end

      #
      # Read & Update
      #
      visit cms_form_init_columns_path(site, form)
      within 'ul.list-items' do
        click_on column.name
      end
      click_on I18n.t('ss.links.edit')
      within 'form#item-form' do
        fill_in 'item[order]', with: 2
        click_on I18n.t('ss.buttons.save')
      end
      wait_for_notice I18n.t('ss.notice.saved')
      expect(Cms::InitColumn.form(form).count).to eq 1
      Cms::InitColumn.form(form).first.tap do |item|
        expect(item.order).to eq 2
      end

      #
      # Delete
      #
      visit cms_form_init_columns_path(site, form)
      within 'ul.list-items' do
        click_on column.name
      end
      click_on I18n.t('ss.links.delete')
      within 'form' do
        click_on I18n.t('ss.buttons.delete')
      end
      wait_for_notice I18n.t('ss.notice.deleted')
      expect(Cms::InitColumn.form(form).count).to eq 0
    end
  end

  context 'when column is destroyed' do
    it do
      visit cms_form_path(site, form)
      click_on I18n.t('cms.buttons.manage_init_columns')
      wait_for_event_fired("ss:dropdownOpened") { click_on I18n.t('ss.links.new') }
      within ".cms-dropdown-menu" do
        click_on column.name
      end

      within 'form#item-form' do
        fill_in 'item[order]', with: 1
        click_on I18n.t('ss.buttons.save')
      end
      wait_for_notice I18n.t('ss.notice.saved')
      expect(Cms::InitColumn.form(form).count).to eq 1
      Cms::InitColumn.form(form).first.tap do |item|
        expect(item.order).to eq 1
      end

      column.destroy

      visit cms_form_init_columns_path(site, form)
      expect(page).to have_no_css('a.title', text: column.name)
    end
  end

  context 'when column is unset' do
    it do
      visit cms_form_path(site, form)
      click_on I18n.t('cms.buttons.manage_init_columns')
      wait_for_event_fired("ss:dropdownOpened") { click_on I18n.t('ss.links.new') }
      within ".cms-dropdown-menu" do
        click_on column.name
      end

      within 'form#item-form' do
        fill_in 'item[order]', with: 1
        click_on I18n.t('ss.buttons.save')
      end
      wait_for_notice I18n.t('ss.notice.saved')
      expect(Cms::InitColumn.form(form).count).to eq 1
      Cms::InitColumn.form(form).first.tap do |item|
        expect(item.order).to eq 1
      end

      Cms::InitColumn.form(form).first.unset(:column_id)

      visit cms_form_init_columns_path(site, form)
      within 'ul.list-items' do
        page.first('a.title').click
      end
      click_on I18n.t('ss.links.edit')
      within 'form#item-form' do
        fill_in 'item[order]', with: 2
        click_on I18n.t('ss.buttons.save')
      end
      expect(page).to have_css("div#errorExplanation")
      expect(Cms::InitColumn.form(form).count).to eq 1
      Cms::InitColumn.form(form).first.tap do |item|
        expect(item.order).to eq 1
      end

      visit cms_form_init_columns_path(site, form)
      within 'ul.list-items' do
        page.first('a.title').click
      end
      click_on I18n.t('ss.links.delete')
      within 'form' do
        click_on I18n.t('ss.buttons.delete')
      end
      wait_for_notice I18n.t('ss.notice.deleted')
      expect(Cms::InitColumn.form(form).count).to eq 0
    end
  end
end
