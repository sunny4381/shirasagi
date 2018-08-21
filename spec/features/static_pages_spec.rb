require 'spec_helper'

describe StaticPagesController, type: :feature do
  describe "#home" do
    it "should get home" do
      visit static_pages_home_path
      expect(status_code).to eq(200)
      expect(page).to have_selector("title", text: "Home | Ruby on Rails Tutorial Sample App")
    end
  end

  describe "#help" do
    it "should get help" do
      visit static_pages_help_path
      expect(status_code).to eq(200)
      expect(page).to have_selector("title", text: "Help | Ruby on Rails Tutorial Sample App")
    end
  end

  describe "#about" do
    it "should get about" do
      visit static_pages_about_path
      expect(status_code).to eq(200)
      expect(page).to have_selector("title", text: "About | Ruby on Rails Tutorial Sample App")
    end
  end
end
