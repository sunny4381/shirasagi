require 'spec_helper'

describe Article::Agents::Pages::PageIndexingJob, dbscope: :example do
  let(:site) { cms_site }
  let(:layout) { create_cms_layout }
  let(:node) { create(:article_node_page, cur_site: site, layout_id: layout.id) }
  let(:html) { "<div>#{unique_id}</div>" }
  let!(:page) { create(:article_page, cur_site: site, cur_node: node, layout_id: layout.id, html: html) }
  let(:es_host) { "#{unique_id}.example.jp" }
  let(:es_url) { "http://#{es_host}" }
  let(:es_requests) { [] }

  before do
    # enable elastic search
    site.elasticsearch_state = 'enabled'
    site.elasticsearch_hosts = es_url
    site.save!
  end

  before do
    stub_request(:any, /#{Regexp.escape(es_host)}/).to_return do |request|
      # examine request later
      es_requests << request.as_json.dup
      { body: '{}', status: 200, headers: { 'Content-Type' => 'application/json; charset=UTF-8' } }
    end
  end

  after do
    WebMock.reset!
  end

  it do
    job = described_class.bind(site_id: site.id, node_id: node.id)
    job.perform_now(action: 'index', id: page.id)

    expect(Job::Log.count).to eq 1
    Job::Log.first.tap do |log|
      expect(log.logs).to include(include("INFO -- : Started Job"))
      expect(log.logs).to include(include("INFO -- : Completed Job"))
    end

    expect(es_requests.length).to eq 1
    es_requests.first.tap do |request|
      expect(request['method']).to eq 'put'
      expect(request['uri']['path']).to eq "/s#{site.id}/contents/page-#{page.id}"
      body = JSON.parse(request['body'])
      expect(body['url']).to eq page.url
      expect(body['name']).to eq page.name
      expect(body['html']).to eq html
      expect(body['cate_categories']).to eq []
      expect(body['member_permissions']).to be_nil
    end
  end
end
