require 'spec_helper'

describe Sys::SiteCopyJob, dbscope: :example do
  describe "copy page" do
    let(:site) { cms_site }
    let(:layout) { create :cms_layout, cur_site: site }
    let(:task) { Sys::SiteCopyTask.new }
    let(:target_host_name) { unique_id }
    let(:target_host_host) { unique_id }
    let(:target_host_domain) { "#{unique_id}.example.jp" }

    before do
      task.target_host_name = target_host_name
      task.target_host_host = target_host_host
      task.target_host_domains = [ target_host_domain ]
      task.source_site_id = site.id
      task.copy_contents = ''
      task.save!
    end

    describe "copy cms/page" do
      let!(:page) { create :cms_page, cur_site: site, layout_id: layout.id }

      before do
        page.html = '<div>page</div>'
        page.save!

        perform_enqueued_jobs do
          ss_perform_now Sys::SiteCopyJob
        end
      end

      it do
        dest_site = Cms::Site.find_by(host: target_host_host)
        expect(dest_site.name).to eq target_host_name
        expect(dest_site.domains).to include target_host_domain
        expect(dest_site.group_ids).to eq site.group_ids

        dest_layout = Cms::Layout.site(dest_site).find_by(filename: layout.filename)
        expect(dest_layout.name).to eq layout.name
        expect(dest_layout.user_id).to eq layout.user_id
        expect(dest_layout.html).to eq layout.html

        dest_page = Cms::Page.site(dest_site).find_by(filename: page.filename)
        expect(dest_page.name).to eq page.name
        expect(dest_page.layout_id).to eq dest_layout.id
        expect(dest_page.user_id).to eq page.user_id
        expect(dest_page.html).to eq page.html

        expect(Job::Log.count).to eq 1
        log = Job::Log.first
        expect(log.logs).not_to include(include('WARN'))
        expect(log.logs).not_to include(include('ERROR'))
        expect(log.logs).to include(/INFO -- : .* Completed Job/)
      end
    end

    describe "copy article/page without options" do
      let(:node) { create :article_node_page, cur_site: site, layout_id: layout.id }
      let!(:page) { create :article_page, cur_site: site, cur_node: node, layout_id: layout.id }

      before do
        page.html = '<div>page</div>'
        page.save!

        perform_enqueued_jobs do
          ss_perform_now Sys::SiteCopyJob
        end
      end

      it do
        dest_site = Cms::Site.find_by(host: target_host_host)
        expect(dest_site.name).to eq target_host_name
        expect(dest_site.domains).to include target_host_domain
        expect(dest_site.group_ids).to eq site.group_ids

        dest_layout = Cms::Layout.site(dest_site).find_by(filename: layout.filename)
        expect(dest_layout.name).to eq layout.name
        expect(dest_layout.user_id).to eq layout.user_id
        expect(dest_layout.html).to eq layout.html

        expect { Cms::Page.site(dest_site).find_by(filename: page.filename) }.to \
          raise_error Mongoid::Errors::DocumentNotFound

        expect(Job::Log.count).to eq 1
        log = Job::Log.first
        expect(log.logs).not_to include(include('WARN'))
        expect(log.logs).not_to include(include('ERROR'))
        expect(log.logs).to include(/INFO -- : .* Completed Job/)
      end
    end

    describe "copy article/page with options" do
      let(:node) { create :article_node_page, cur_site: site, layout_id: layout.id }
      let!(:page) { create :article_page, cur_site: site, cur_node: node, layout_id: layout.id }

      before do
        task.copy_contents = 'pages'
        task.save!

        page.html = '<div>page</div>'
        page.save!

        perform_enqueued_jobs do
          ss_perform_now Sys::SiteCopyJob
        end
      end

      it do
        dest_site = Cms::Site.find_by(host: target_host_host)
        expect(dest_site.name).to eq target_host_name
        expect(dest_site.domains).to include target_host_domain
        expect(dest_site.group_ids).to eq site.group_ids

        dest_layout = Cms::Layout.site(dest_site).find_by(filename: layout.filename)
        expect(dest_layout.name).to eq layout.name
        expect(dest_layout.user_id).to eq layout.user_id
        expect(dest_layout.html).to eq layout.html

        dest_page = Cms::Page.site(dest_site).find_by(filename: page.filename)
        expect(dest_page.name).to eq page.name
        expect(dest_page.layout_id).to eq dest_layout.id
        expect(dest_page.user_id).to eq page.user_id
        expect(dest_page.html).to eq page.html

        expect(Job::Log.count).to eq 1
        log = Job::Log.first
        expect(log.logs).not_to include(include('WARN'))
        expect(log.logs).not_to include(include('ERROR'))
        expect(log.logs).to include(/INFO -- : .* Completed Job/)
      end
    end

    describe "copy article/page with files" do
      let(:user) { cms_user }
      let(:node) { create :article_node_page, cur_site: site, cur_user: user, layout_id: layout.id }
      let!(:page) { create :article_page, cur_site: site, cur_node: node, cur_user: user, layout_id: layout.id }

      before do
        task.copy_contents = 'pages'
        task.save!

        file = create :ss_file, site_id: site.id, cur_user: user
        raise if file.errors.count > 0
        page.file_ids = [ file.id ]
        page.html = "<div>#{file.url}</div>"
        page.save!

        perform_enqueued_jobs do
          ss_perform_now Sys::SiteCopyJob
        end
      end

      it do
        dest_site = Cms::Site.find_by(host: target_host_host)
        dest_page = Cms::Page.site(dest_site).find_by(filename: page.filename)

        expect(dest_page.html).to eq page.html.sub(page.files.first.url, dest_page.files.first.url)
        expect(dest_page.files).to have(1).items
        expect(dest_page.files.first.owner_item_id).to eq dest_page.id
        expect(dest_page.files.first.owner_item_type).to eq dest_page.class.name
      end
    end

    describe "copy article/page with categories" do
      let(:user) { cms_user }
      let(:node) { create :article_node_page, cur_site: site, cur_user: user, layout_id: layout.id }
      let!(:page) do
        create(:article_page, cur_site: site, cur_node: node, cur_user: user, layout_id: layout.id,
          category_ids: [cate1.id, cate2.id])
      end
      let!(:cate1) { create :category_node_page, cur_site: site, cur_user: user, layout_id: layout.id }
      let!(:cate2) { create :category_node_page, cur_site: site, cur_user: user, layout_id: layout.id }

      before do
        task.copy_contents = 'pages'
        task.save!

        page.html = '<div>page</div>'
        page.save!

        perform_enqueued_jobs do
          ss_perform_now Sys::SiteCopyJob
        end
      end

      it do
        dest_site = Cms::Site.find_by(host: target_host_host)
        dest_page = Cms::Page.site(dest_site).find_by(filename: page.filename)
        expect(dest_page.name).to eq page.name
        expect(dest_page.html).to eq page.html

        dest_cate1 = Category::Node::Base.site(dest_site).find_by(filename: cate1.filename)
        dest_cate2 = Category::Node::Base.site(dest_site).find_by(filename: cate2.filename)
        expect(dest_page.category_ids).to match_array [dest_cate1.id, dest_cate2.id]

        expect(Job::Log.count).to eq 1
        log = Job::Log.first
        expect(log.logs).not_to include(include('WARN'))
        expect(log.logs).not_to include(include('ERROR'))
        expect(log.logs).to include(/INFO -- : .* Completed Job/)
      end
    end

    describe "copy article/page which contains site url" do
      let(:user) { cms_user }
      let(:node) { create :article_node_page, cur_site: site, layout_id: layout.id }
      let!(:page) { create :article_page, cur_site: site, cur_node: node, layout_id: layout.id }

      before do
        task.copy_contents = 'pages'
        task.save!

        page.html = "<div>#{site.full_url}</div>"
        page.save!

        perform_enqueued_jobs do
          ss_perform_now Sys::SiteCopyJob
        end
      end

      it do
        dest_site = Cms::Site.find_by(host: target_host_host)
        dest_page = Cms::Page.site(dest_site).find_by(filename: page.filename)

        expect(dest_page.html).to eq page.html.sub(site.full_url, dest_site.full_url)
      end
    end

    describe "copy article/page node which contains curcular reference" do
      let(:node) { create :article_node_page, cur_site: site, layout_id: layout.id }
      let!(:page1) { create :article_page, cur_site: site, cur_node: node, layout_id: layout.id }
      let!(:page2) { create :article_page, cur_site: site, cur_node: node, layout_id: layout.id }

      before do
        task.copy_contents = 'pages'
        task.save!

        # page1 refers to page2
        page1.related_page_ids = [ page2.id ]
        page1.save!

        # page2 refers to page1
        page2.related_page_ids = [ page1.id ]
        page2.save!

        perform_enqueued_jobs do
          ss_perform_now Sys::SiteCopyJob
        end
      end

      it do
        dest_site = Cms::Site.find_by(host: target_host_host)
        dest_page1 = Cms::Page.site(dest_site).find_by(filename: page1.filename)
        dest_page2 = Cms::Page.site(dest_site).find_by(filename: page2.filename)

        expect(dest_page1.related_page_ids).to eq [dest_page2.id]
        expect(dest_page2.related_page_ids).to eq [dest_page1.id]
      end
    end

    describe "copy article/page node with too long name page" do
      let(:node) { create :article_node_page, cur_site: site, layout_id: layout.id }
      let!(:page) { create :article_page, cur_site: site, cur_node: node, layout_id: layout.id }

      before do
        site.max_name_length = 0
        site.save!

        page.name = SecureRandom.hex(200)
        page.save!

        task.copy_contents = 'pages'
        task.save!

        perform_enqueued_jobs do
          ss_perform_now Sys::SiteCopyJob
        end
      end

      it do
        dest_site = Cms::Site.find_by(host: target_host_host)

        dest_page = Cms::Page.site(dest_site).find_by(filename: page.filename)

        expect(dest_page).to be_truthy
      end
    end

    describe "copy key_visual/image node" do
      let(:node) { create :key_visual_node_image, cur_site: site, layout_id: layout.id }
      let!(:page) { create :key_visual_image, cur_site: site, cur_node: node }

      before do
        task.copy_contents = 'pages'
        task.save!

        perform_enqueued_jobs do
          ss_perform_now Sys::SiteCopyJob
        end
      end

      it do
        dest_site = Cms::Site.find_by(host: target_host_host)
        dest_page = Cms::Page.site(dest_site).find_by(filename: page.filename)

        expect(dest_page).to be_truthy
        expect(dest_page.file_id).not_to eq page.file_id
        expect(dest_page.file.name).to eq page.file.name
      end
    end

    describe "copy article/page node with workflow request" do
      let(:node) { create :article_node_page, cur_site: site, layout_id: layout.id }
      let(:user) { create :cms_test_user, group: cms_group }
      let!(:page) do
        create :article_page, cur_site: site, cur_node: node, layout_id: layout.id, workflow_state: 'request',
          workflow_user_id: cms_user.id, workflow_approvers: [{ level: 1, user_id: user.id, state: "request" }],
          workflow_required_counts: [ false ]
      end

      before do
        task.copy_contents = 'pages'
        task.save!

        perform_enqueued_jobs do
          ss_perform_now Sys::SiteCopyJob
        end
      end

      it do
        dest_site = Cms::Site.find_by(host: target_host_host)
        dest_page = Cms::Page.site(dest_site).find_by(filename: page.filename)

        expect(dest_page).to be_truthy
        expect(dest_page.workflow_state).to eq 'request'
        expect(dest_page.workflow_user_id).to eq cms_user.id
        expect(dest_page.workflow_approvers).to be_truthy
        expect(dest_page.workflow_required_counts).to eq [ false ]
      end
    end
  end
end
