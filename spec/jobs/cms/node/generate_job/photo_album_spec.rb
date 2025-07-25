require 'spec_helper'

describe Cms::Node::GenerateJob, dbscope: :example do
  let(:now) { Time.zone.now.change(usec: 0) }
  let!(:site) { cms_site }
  let!(:user) { cms_user }
  let!(:layout) { create_cms_layout }
  let!(:article_node) { create :article_node_page, cur_site: site, layout: layout }
  let!(:photo_album_node) do
    create(
      :cms_node_photo_album, cur_site: site, cur_node: article_node, layout: layout,
      conditions: article_node.filename)
  end

  before do
    Cms::Task.create!(site_id: site.id, node_id: nil, name: 'cms:generate_nodes', state: 'ready')
  end

  describe "#perform" do
    context "with pages and files" do
      let(:attachment_path) { "#{Rails.root}/spec/fixtures/ss/logo.png" }
      let!(:page1) do
        Timecop.freeze(now - 1.hour) do
          file = tmp_ss_file(site: site, user: user, contents: attachment_path, basename: 'logo.png')
          page = create(
            :article_page, cur_site: site, cur_user: user, cur_node: article_node, layout: layout,
            file_ids: [ file.id ], state: 'public')

          file.reload
          expect(file.owner_item_id).to eq page.id
          page
        end
      end
      let!(:page2) do
        Timecop.freeze(now - 2.hours) do
          file = tmp_ss_file(site: site, user: user, contents: attachment_path, basename: 'logo.png')
          page = create(
            :article_page, cur_site: site, cur_user: user, cur_node: article_node, layout: layout,
            file_ids: [ file.id ], state: 'public')

          file.reload
          expect(file.owner_item_id).to eq page.id
          page
        end
      end

      before do
        expect do
          described_class.bind(site_id: site.id).perform_now
        end.to output(include("/#{photo_album_node.filename}/index.html")).to_stdout
      end

      it do
        expect(File.exist?("#{photo_album_node.path}/index.html")).to be_truthy
        # cms/photo には RSS を応答する公開アクションはないので rss.xml が作成されていないことを確認する
        expect(File.exist?("#{photo_album_node.path}/rss.xml")).to be_falsey

        expect(Cms::Task.count).to eq 1
        Cms::Task.where(site_id: site.id, node_id: nil, name: 'cms:generate_nodes').first.tap do |task|
          expect(task.state).to eq 'completed'
          expect(task.started).not_to be_nil
          expect(task.closed).not_to be_nil
          expect(task.total_count).to eq 0
          expect(task.current_count).to eq 0
          expect(task.logs).to include(include("#{photo_album_node.url}index.html"))
          expect(task.node_id).to be_nil
          # logs are saved in a file
          expect(::File.exist?(task.log_file_path)).to be_truthy
          # and there are no `logs` field
          expect(task[:logs]).to be_nil
          # performance logs are saved
          expect(::File.exist?(task.perf_log_file_path)).to be_truthy
        end

        expect(Job::Log.count).to eq 1
        Job::Log.first.tap do |log|
          expect(log.logs).to include(/INFO -- : .* Started Job/)
          expect(log.logs).to include(/INFO -- : .* Completed Job/)
        end

        html = File.read("#{photo_album_node.path}/index.html")
        html = Nokogiri::HTML5::Document.parse(html)
        html.css(".photos .photo").tap do |photos|
          expect(photos).to have(2).items
          expect(photos[0].css(".title").text.strip).to eq page1.name
          expect(photos[1].css(".title").text.strip).to eq page2.name
        end
      end
    end

    context "without pages and files" do
      before do
        expect do
          described_class.bind(site_id: site.id).perform_now
        end.to output(include("/#{photo_album_node.filename}/index.html")).to_stdout
      end

      it do
        expect(File.exist?("#{photo_album_node.path}/index.html")).to be_truthy
        # cms/photo には RSS を応答する公開アクションはないので rss.xml が作成されていないことを確認する
        expect(File.exist?("#{photo_album_node.path}/rss.xml")).to be_falsey

        expect(Cms::Task.count).to eq 1
        Cms::Task.where(site_id: site.id, node_id: nil, name: 'cms:generate_nodes').first.tap do |task|
          expect(task.state).to eq 'completed'
          expect(task.started).not_to be_nil
          expect(task.closed).not_to be_nil
          expect(task.total_count).to eq 0
          expect(task.current_count).to eq 0
          expect(task.logs).to include(include("#{photo_album_node.url}index.html"))
          expect(task.node_id).to be_nil
          # logs are saved in a file
          expect(::File.exist?(task.log_file_path)).to be_truthy
          # and there are no `logs` field
          expect(task[:logs]).to be_nil
          # performance logs are saved
          expect(::File.exist?(task.perf_log_file_path)).to be_truthy
        end

        expect(Job::Log.count).to eq 1
        Job::Log.first.tap do |log|
          expect(log.logs).to include(/INFO -- : .* Started Job/)
          expect(log.logs).to include(/INFO -- : .* Completed Job/)
        end

        html = File.read("#{photo_album_node.path}/index.html")
        html = Nokogiri::HTML5::Document.parse(html)
        html.css(".photos .photo").tap do |photos|
          expect(photos).to be_blank
        end
      end
    end

    context "with feedback part" do
      let!(:inquiry_node) { create :inquiry_node_form, cur_site: site }
      let!(:feedback_part) { create :inquiry_part_feedback, cur_site: site, cur_node: inquiry_node }
      let!(:layout) { create_cms_layout feedback_part }

      before do
        inquiry_node.update!(layout: layout)

        ::FileUtils.rm_rf(photo_album_node.path)
      end

      it do
        expect do
          described_class.bind(site_id: site.id).perform_now
        end.to output(include("/#{photo_album_node.filename}/index.html")).to_stdout

        expect(Job::Log.count).to eq 1
        Job::Log.first.tap do |log|
          expect(log.logs).to include(/INFO -- : .* Started Job/)
          expect(log.logs).to include(/INFO -- : .* Completed Job/)
        end

        expect(File.size("#{photo_album_node.path}/index.html")).to be > 0

        html = File.read("#{photo_album_node.path}/index.html")
        html = Nokogiri::HTML.fragment(html)
        expect(html.css(".inquiry-form")).to have(1).items
        expect(html.css(".member-photos")).to have(1).items
      end
    end
  end
end
