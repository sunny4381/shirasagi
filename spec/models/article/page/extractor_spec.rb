require 'spec_helper'

describe Article::Page, dbscope: :example do
  let(:site) { cms_site }
  let(:user) { cms_user }
  let(:node) { create :article_node_page, cur_site: site }
  let(:file_path) { "#{Rails.root}/spec/fixtures/ss/logo.png" }

  context "with basic page" do
    let(:thumb) { tmp_ss_file(site: site, user: user, contents: file_path, basename: "thumb.png") }
    let(:file1) { tmp_ss_file(site: site, user: user, contents: file_path, basename: "logo1.png") }
    let(:file2) { tmp_ss_file(site: site, user: user, contents: file_path, basename: "logo2.png") }
    let(:html) do
      [
        "<p>#{unique_id}</p>",
        "<p><a class=\"icon-png attachment\" href=\"#{file1.url}\">#{file1.humanized_name}</a></p>",
        "<p><a class=\"icon-png attachment\" href=\"#{file2.url}\">#{file2.humanized_name}</a></p>",
      ].join("\r\n\r\n")
    end
    let!(:item) do
      Timecop.freeze(Time.zone.now.change(usec: 0)) do
        create(
          :article_page, cur_site: site, cur_user: user, cur_node: node, thumb: thumb, html: html, file_ids: [ file1.id, file2.id ]
        )
      end
    end
    let(:archive_path) { tmpfile(extname: ".zip") { |_f| } }

    before do
      SS::Archiver.create(path: archive_path, recursive: { only: %i[ss_files] }) do |archiver|
        archiver.add(item)
      end
      expect(::File.size(archive_path)).to be > 0
    end

    it do
      SS::Archive.open(archive_path) do |archive|
        extractor = SS::Extractor.new(site: site, user: user, mode: :deep_copy, archive: archive)

        copied_item = extractor.extract(Cms::Page, item.to_key)
        expect(copied_item.site_id).to eq site.id
        expect(copied_item.name).to eq item.name
        expect(copied_item.filename).to eq item.filename
        expect(copied_item.thumb).not_to eq item.thumb
        expect(copied_item.html).to eq item.html
        expect(copied_item.file_ids).not_to eq item.file_ids
      end
    end
  end
end
