require 'spec_helper'

describe "member_agents_nodes_photo_category", type: :feature, dbscope: :example do
  let(:site) { cms_site }
  let(:layout) { create_cms_layout }
  let(:category) { create :member_node_photo_category, layout_id: layout.id, filename: "category" }
  let(:node) { create :member_node_photo, layout_id: layout.id, filename: "node" }

  context "public" do
    let!(:item) { create :member_photo, cur_node: node, photo_category_ids: [category.id] }

    before do
      Capybara.app_host = "http://#{site.domain}"
    end

    it "#index" do
      visit category.url
      expect(page).to have_css(".member-photos")
      expect(page).to have_css(".member-photos a img")

      first('.member-photos a').click
      expect(current_path).to eq item.url
    end
  end
end
