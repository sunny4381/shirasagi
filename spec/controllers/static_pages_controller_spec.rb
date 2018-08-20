require 'spec_helper'

describe StaticPagesController, type: :controller do
  render_views

  describe "#home" do
    it "should get home" do
      get :home
      expect(response.status).to eq(200)
      puts page.html
      response.should have_selector("title", text: "Home | Ruby on Rails Tutorial Sample App")
    end
  end

  describe "#help" do
    it "should get help" do
      get :help
      expect(response.status).to eq(200)
      expect(page).to have_selector("title", text: "Help | Ruby on Rails Tutorial Sample App")
    end
  end

  describe "#about" do
    it "should get about" do
      get :about
      expect(response.status).to eq(200)
      expect(page).to have_selector("title", text: "About | Ruby on Rails Tutorial Sample App")
    end
  end
end
