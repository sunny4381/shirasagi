require 'spec_helper'

describe Cms::Form::ColumnsController, type: :feature, dbscope: :example, js: true do
  let(:site) { cms_site }
  let(:form) { create(:cms_form, cur_site: site, sub_type: 'static') }
  let(:name) { unique_id }

  before { login_cms_user }

  context 'with empty html_tag' do
    it do
      visit cms_form_path(site, form)
      click_on I18n.t('cms.buttons.manage_columns')

      within '.gws-column-list-toolbar[data-placement="top"]' do
        wait_for_event_fired("gws:column:added") { click_on I18n.t('cms.columns.cms/url_field') }
      end
      wait_for_notice I18n.t('ss.notice.saved')

      within '.gws-column-form' do
        fill_in 'item[name]', with: name
        click_on I18n.t('ss.buttons.save')
      end
      wait_for_notice I18n.t('ss.notice.saved', wait: 1)
      Cms::Column::Base.site(site).where(form_id: form.id).first.tap do |item|
        expect(item.name).to eq name
        expect(item.required).to eq 'required'
      end

      wait_for_cbox_opened { find('.btn-gws-column-item-detail').click }
      within_dialog do
        find('.save').click
      end
      wait_for_notice I18n.t('ss.notice.saved')
      Cms::Column::Base.site(site).where(form_id: form.id).first.tap do |item|
        expect(item.name).to eq name
      end

      page.accept_confirm do
        find('.btn-gws-column-item-delete').click
      end
      wait_for_notice I18n.t('ss.notice.deleted')
      expect(Cms::Column::Base.site(site).where(form_id: form.id).count).to eq 0
    end
  end
end
