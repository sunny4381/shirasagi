require 'spec_helper'

describe Facility::Agents::Nodes::PageIndexingJob, dbscope: :example, tmpdir: true do
  let(:site) { cms_site }
  let(:layout) { create_cms_layout }
  let(:kana) { unique_id }
  let(:node_cate) { create(:facility_node_category, cur_site: site, layout_id: layout.id) }
  let(:node_serv) { create(:facility_node_service, cur_site: site, layout_id: layout.id) }
  let(:node_loc) { create(:facility_node_location, cur_site: site, layout_id: layout.id) }
  let(:node) do
    create(
      :facility_node_page, cur_site: site, layout_id: layout.id, kana: kana,
      category_ids: [ node_cate.id ], service_ids: [ node_serv.id ], location_ids: [ node_loc.id ]
    )
  end
  let(:logo_file) { tmp_ss_file(contents: "#{Rails.root}/spec/fixtures/ss/logo.png", site: site, user: cms_user) }
  let!(:page_map) { create(:facility_map, cur_site: site, cur_node: node, layout_id: layout.id) }
  let!(:page_image) do
    create(:facility_image, cur_site: site, cur_node: node, layout_id: layout.id, image_id: logo_file.id)
  end

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
    job.perform_now(action: 'index', id: node.id)

    expect(Job::Log.count).to eq 1
    Job::Log.first.tap do |log|
      expect(log.logs).to include(include("INFO -- : Started Job"))
      expect(log.logs).to include(include("INFO -- : Completed Job"))
    end

    expect(es_requests.length).to eq 1
    es_requests.first.tap do |request|
      expect(request['method']).to eq 'put'
      expect(request['uri']['path']).to eq "/s#{site.id}/contents/node-#{node.id}"
      body = JSON.parse(request['body'])
      expect(body['url']).to eq node.url
      expect(body['name']).to eq node.name
      expect(body['html']).not_to be_nil
      expect(body['html']).to include(node.kana)
      expect(body['html']).to include(logo_file.url)
      expect(body['html']).to include(page_map.map_points.first['loc'][0].to_s)
      expect(body['cate_categories']).to eq [ node_cate.name ]
      expect(body['cate_services']).to eq [ node_serv.name ]
      expect(body['cate_locations']).to eq [ node_loc.name ]
      expect(body['member_permissions']).to be_nil
    end
  end
end
