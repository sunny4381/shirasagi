require 'spec_helper'

describe Facility::Image do
  subject(:model) { Facility::Image }
  subject(:factory) { :facility_image }

  it_behaves_like "mongoid#save"
  it_behaves_like "mongoid#find"

  describe "#attributes" do
    subject(:item) { model.last }

    it { expect(item.becomes_with_route).not_to be_nil }
    it { expect(item.dirname).to be_nil }
    it { expect(item.basename).not_to be_nil }
    it { expect(item.path).not_to be_nil }
    it { expect(item.url).not_to be_nil }
    it { expect(item.full_url).not_to be_nil }
    it { expect(item.parent).to be_falsey }
  end
end

describe Facility::Map do
  subject(:model) { Facility::Map }
  subject(:factory) { :facility_map }

  it_behaves_like "mongoid#save"
  it_behaves_like "mongoid#find"

  describe "#attributes" do
    subject(:item) { model.last }

    it { expect(item.becomes_with_route).not_to be_nil }
    it { expect(item.dirname).to be_nil }
    it { expect(item.basename).not_to be_nil }
    it { expect(item.path).not_to be_nil }
    it { expect(item.url).not_to be_nil }
    it { expect(item.full_url).not_to be_nil }
    it { expect(item.parent).to be_falsey }
  end
end
