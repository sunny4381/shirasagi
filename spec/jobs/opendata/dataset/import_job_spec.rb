require 'spec_helper'

describe Opendata::Dataset::ImportJob, dbscope: :example do
  let!(:site) { cms_site }
  let!(:node) { create(:opendata_node_dataset, name: "import") }
  let!(:ss_file) { tmp_ss_file(contents: "#{Rails.root}/spec/fixtures/opendata/dataset_import.zip") }

  describe ".perform_later" do
    before do
      @save_url_type = SS.config.cms.url_type
      SS.config.replace_value_at(:sns, :url_type, 'any')
      Sys::TrustedUrlValidator.send(:clear_trusted_urls)

      perform_enqueued_jobs do
        described_class.bind(site_id: site).perform_later(ss_file.id)
      end
    ensure
      SS.config.replace_value_at(:sns, :url_type, @save_url_type)
      Sys::TrustedUrlValidator.send(:clear_trusted_urls)
    end

    it do
      log = Job::Log.first
      expect(log.logs).to include(/INFO -- : .* Started Job/)
      expect(log.logs).to include(/INFO -- : .* Completed Job/)

      pages = Opendata::Dataset.all
      expect(pages.map(&:name)).to eq %w(サンプルデータ【1】)
    end
  end
end
