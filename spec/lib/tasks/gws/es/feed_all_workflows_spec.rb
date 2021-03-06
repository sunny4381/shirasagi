require 'spec_helper'

describe Tasks::Gws::Es, dbscope: :example do
  let(:es_host) { unique_domain }
  let(:es_url) { "http://#{es_host}" }
  let(:requests) { [] }

  before do
    @save = {}
    ENV.each do |key, value|
      @save[key.dup] = value.dup
    end
  end

  after do
    ENV.clear
    @save.each do |key, value|
      ENV[key] = value
    end
  end

  describe ".feed_all_workflows" do
    let!(:site) { create :gws_group, menu_elasticsearch_state: "show", elasticsearch_hosts: es_url }
    let!(:user) { create(:gws_user, group_ids: [ site.id ], gws_role_ids: gws_user.gws_role_ids) }
    let!(:file) do
      tmp_ss_file(user: user, contents: "#{Rails.root}/spec/fixtures/ss/logo.png", binary: true, content_type: 'image/png')
    end
    let!(:workflow) { create(:gws_workflow_file, cur_site: site, cur_user: user, file_ids: [file.id]) }

    before do
      WebMock.reset!

      stub_request(:any, /#{::Regexp.escape(es_host)}/).to_return do |request|
        requests << request.as_json.dup
        { body: '{}', status: 200, headers: { 'Content-Type' => 'application/json; charset=UTF-8' } }
      end

      ENV['site'] = site.name
    end

    after do
      WebMock.reset!
    end

    it do
      expect { described_class.feed_all_workflows }.to output(include("- #{workflow.name}\n")).to_stdout
    end
  end
end
