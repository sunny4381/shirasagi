require 'spec_helper'

RSpec.describe Ckan::Part::Status, type: :model, dbscope: :example do
  describe "validation" do
    subject { @status.valid? }

    before { @status = build :ckan_part_status }
    it { is_expected.to be_truthy }

    describe "ckan_url" do
      context "valid format http" do
        before { @status.ckan_url = 'http://example.com' }
        it { is_expected.to be_truthy }
      end

      context "valid format https" do
        before { @status.ckan_url = 'https://example.com' }
        it { is_expected.to be_truthy }
      end

      context "invalid format" do
        before { @status.ckan_url = 'ftp://example.com' }
        it { is_expected.to be_falsy }
      end
    end

    describe "ckan_status" do
      %w(dataset tag group related_item).each do |e|
        context "valid status of \"#{e}\"" do
          before { @status.ckan_status = e }
          it { is_expected.to be_truthy }
        end
      end

      context "invalid status" do
        before { @status.ckan_status = 'fake_status' }
        it { is_expected.to be_falsy }
      end
    end
  end

  # NOTE: Skip tests with WebMock now.
  describe '#value' do
    before { WebMock.reset! }
    after { WebMock.reset! }

    let(:status) { build :ckan_part_status }

    before do
      stub_request(:get, "#{status.ckan_url}/api/3/action/package_list").
        with(headers: {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent'=>'Ruby'}).
        to_return(status: http_status, body: body, headers: {})
    end

    subject { status.value }

    context "ok" do
      let(:http_status) { 200 }
      let(:body) { "{\"success\":true,\"result\":[{},{},{},{},{}]}" }
      it { is_expected.to eq 5 }

      describe "ckan_value_cache update" do
        let(:status) { create :ckan_part_status, ckan_value_cache: 4 }

        it "updates ckan_value_cache" do
          expect { subject }.to change {
            described_class.find(status.id).ckan_value_cache
          }.from(4).to(5)
        end
      end
    end

    context "HTTP error" do
      let(:http_status) { 500 }
      let(:body) { "" }

      context "no cache value is stored" do
        before { status.ckan_value_cache = nil }
        it { is_expected.to eq 'NaN' }
      end

      context "a cache value is stored" do
        before { status.ckan_value_cache = 1 }
        it { is_expected.to eq 1 }
      end
    end

    context "failure" do
      let(:http_status) { 200 }
      let(:body) { "{\"success\":false}" }

      context "no cache value is stored" do
        before { status.ckan_value_cache = nil }
        it { is_expected.to eq 'NaN' }
      end

      context "a cache value is stored" do
        before { status.ckan_value_cache = 1 }
        it { is_expected.to eq 1 }
      end
    end
  end
end
