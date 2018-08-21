require 'spec_helper'

describe StaticPagesController, type: :feature do
  let(:base_title) { "Ruby on Rails Tutorial Sample App" }

  describe "#home" do
    it "should get home" do
      visit static_pages_home_path
      expect(status_code).to eq(200)
      expect(page).to have_selector("title", text: "Home | #{base_title}")
    end
  end

  describe "#help" do
    it "should get help" do
      visit static_pages_help_path
      expect(status_code).to eq(200)
      expect(page).to have_selector("title", text: "Help | #{base_title}")
    end
  end

  describe "#about" do
    it "should get about" do
      visit static_pages_about_path
      expect(status_code).to eq(200)
      expect(page).to have_selector("title", text: "About | #{base_title}")
    end
  end
end
