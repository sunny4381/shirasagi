require 'spec_helper'

describe StaticPagesController, type: :controller do
  describe "#home" do
    it "should get home" do
      get :home
      expect(response.status).to eq(200)
    end
  end

  describe "#help" do
    it "should get help" do
      get :help
      expect(response.status).to eq(200)
    end
  end
end
