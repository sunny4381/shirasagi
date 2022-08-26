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

    it do
      path = tmpfile(extname: ".zip") { |_f| }
      ::FileUtils.mkdir_p ::File.dirname(path)
      SS::Archiver.create(path: path, recursive: { only: %i[ss_files] }) do |archiver|
        archiver.add(item)
      end

      SS::Archive.open(path) do |archive|
        archive["collections/cms_pages/#{item.id}.json"].tap do |raw|
          json = JSON.parse(raw)
          expect(json["site_id"]).to eq site.id
          expect(json["_id"]).to eq item.id
          expect(json["filename"]).to eq item.filename
          expect(json["name"]).to eq item.name
          expect(json["thumb_id"]).to eq thumb.id
          expect(json["html"]).to eq item.html
          expect(json["file_ids"]).to eq [ file1.id, file2.id ]
          expect(json["updated"]).to eq item.updated.utc.iso8601(3)
          expect(json["created"]).to eq item.created.utc.iso8601(3)
        end
        archive["collections/ss_files/#{thumb.id}.json"].tap do |raw|
          json = JSON.parse(raw)
          expect(json["_id"]).to eq thumb.id
          expect(json["name"]).to eq thumb.name
          expect(json["filename"]).to eq thumb.filename
          expect(json["size"]).to eq thumb.size
          expect(json["content_type"]).to eq thumb.content_type
          expect(json["updated"]).to eq thumb.updated.utc.iso8601(3)
          expect(json["created"]).to eq thumb.created.utc.iso8601(3)
        end
        archive["collections/ss_files/#{file1.id}.json"].tap do |raw|
          json = JSON.parse(raw)
          expect(json["_id"]).to eq file1.id
          expect(json["name"]).to eq file1.name
          expect(json["filename"]).to eq file1.filename
          expect(json["size"]).to eq file1.size
          expect(json["content_type"]).to eq file1.content_type
          expect(json["updated"]).to eq file1.updated.utc.iso8601(3)
          expect(json["created"]).to eq file1.created.utc.iso8601(3)
        end
        archive["collections/ss_files/#{file2.id}.json"].tap do |raw|
          json = JSON.parse(raw)
          expect(json["_id"]).to eq file2.id
          expect(json["name"]).to eq file2.name
          expect(json["filename"]).to eq file2.filename
          expect(json["size"]).to eq file2.size
          expect(json["content_type"]).to eq file2.content_type
          expect(json["updated"]).to eq file2.updated.utc.iso8601(3)
          expect(json["created"]).to eq file2.created.utc.iso8601(3)
        end
        archive["collections/ss_sites/#{site.id}.json"].tap do |raw|
          expect(raw).to be_blank
        end
        archive["files/ss_files/#{thumb.id}"].tap do |raw|
          expect(raw.length).to eq thumb.size
        end
        archive["files/ss_files/#{file1.id}"].tap do |raw|
          expect(raw.length).to eq file1.size
        end
        archive["files/ss_files/#{file2.id}"].tap do |raw|
          expect(raw.length).to eq file2.size
        end
      end
    end
  end

  context "with form page" do
    let!(:form) { create(:cms_form, cur_site: site, state: 'public', sub_type: 'static') }
    let!(:column1) do
      create(:cms_column_file_upload, cur_site: site, cur_form: form, order: 1, file_type: "image")
    end
    let!(:column2) do
      create(:cms_column_free, cur_site: site, cur_form: form, order: 2)
    end
    let!(:file1) { tmp_ss_file(site: site, user: user, contents: file_path, basename: "logo1.png") }
    let!(:file2) { tmp_ss_file(site: site, user: user, contents: file_path, basename: "logo2.png") }
    let!(:file3) { tmp_ss_file(site: site, user: user, contents: file_path, basename: "logo3.png") }
    let!(:html) do
      <<~HTML.freeze
        <p>#{unique_id}</p>
        <p><a class="icon-png attachment" href="#{file2.url}">#{file2.humanized_name}</a></p>
        <p><a class="icon-png attachment" href="#{file3.url}">#{file3.humanized_name}</a></p>
      HTML
    end
    let!(:item) do
      create(
        :article_page, cur_site: site, cur_user: user, cur_node: node, form: form, state: "closed",
        column_values: [
          column1.value_type.new(column: column1, file_id: file1.id, file_label: file1.humanized_name),
          column2.value_type.new(column: column2, value: html, file_ids: [ file2.id, file3.id ])
        ]
      )
    end

    it do
      path = tmpfile(extname: ".zip") { |_f| }
      SS::Archiver.create(path: path, recursive: { only: %i[ss_files] }) do |archiver|
        archiver.add(item)
      end

      SS::Archive.open(path) do |archive|
        archive["collections/cms_pages/#{item.id}.json"].tap do |raw|
          json = JSON.parse(raw)
          expect(json["site_id"]).to eq site.id
          expect(json["_id"]).to eq item.id
          expect(json["filename"]).to eq item.filename
          expect(json["name"]).to eq item.name
          expect(json["column_values"]).to have(2).items
          json["column_values"][0].tap do |column_value|
            expect(column_value["_type"]).to eq column1.value_type.name
            expect(column_value["column_id"]).to eq("$oid" => column1.id.to_s)
            expect(column_value["file_id"]).to eq file1.id
            expect(column_value["file_label"]).to eq file1.humanized_name
          end
          json["column_values"][1].tap do |column_value|
            expect(column_value["_type"]).to eq column2.value_type.name
            expect(column_value["column_id"]).to eq("$oid" => column2.id.to_s)
            expect(column_value["value"]).to eq html.strip
            expect(column_value["file_ids"]).to eq [ file2.id, file3.id ]
          end
        end
        archive["collections/ss_files/#{file1.id}.json"].tap do |raw|
          json = JSON.parse(raw)
          expect(json["_id"]).to eq file1.id
          expect(json["name"]).to eq file1.name
          expect(json["filename"]).to eq file1.filename
          expect(json["size"]).to eq file1.size
          expect(json["content_type"]).to eq file1.content_type
        end
        archive["collections/ss_files/#{file2.id}.json"].tap do |raw|
          json = JSON.parse(raw)
          expect(json["_id"]).to eq file2.id
          expect(json["name"]).to eq file2.name
          expect(json["filename"]).to eq file2.filename
          expect(json["size"]).to eq file2.size
          expect(json["content_type"]).to eq file2.content_type
        end
        archive["collections/ss_files/#{file3.id}.json"].tap do |raw|
          json = JSON.parse(raw)
          expect(json["_id"]).to eq file3.id
          expect(json["name"]).to eq file3.name
          expect(json["filename"]).to eq file3.filename
          expect(json["size"]).to eq file3.size
          expect(json["content_type"]).to eq file3.content_type
        end
        archive["collections/ss_sites/#{site.id}.json"].tap do |raw|
          expect(raw).to be_blank
        end
        archive["files/ss_files/#{file1.id}"].tap do |raw|
          expect(raw.length).to eq file1.size
        end
        archive["files/ss_files/#{file2.id}"].tap do |raw|
          expect(raw.length).to eq file2.size
        end
        archive["files/ss_files/#{file3.id}"].tap do |raw|
          expect(raw.length).to eq file3.size
        end
      end
    end
  end
end
