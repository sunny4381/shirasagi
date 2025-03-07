require 'spec_helper'

describe Cms::User do
  let(:model) { Cms::User }
  let(:group1) { create(:cms_group, name: unique_id) }
  let(:group2) { create(:cms_group, name: unique_id) }
  let(:site1) { create(:cms_site, host: unique_id, domains: "#{unique_id}.example.jp", group_ids: [ group1.id ]) }
  let(:site2) { create(:cms_site, host: unique_id, domains: "#{unique_id}.example.jp", group_ids: [ group2.id ]) }

  describe "#save" do
    context "when sns user is given" do
      subject { attributes_for(:cms_user_base, :cms_user_rand_name, :cms_user_email, group: group1) }
      it "save and find successfully" do
        expect { model.new(subject).save! }.not_to raise_error
        expect(model.where(email: subject[:email]).first).not_to be_nil
        # uid can be nil if email.presents
        expect(model.where(email: subject[:email]).first.uid).to be_nil
        expect(model.where(email: subject[:email]).first.has_attribute?(:uid)).to be_falsey
      end
    end

    context "when ldap user is given" do
      subject { attributes_for(:cms_ldap_user, email: nil, group: group1) }
      it "save and find successfully" do
        expect { model.new(subject).save! }.not_to raise_error
        expect(model.where(uid: subject[:uid]).first).not_to be_nil
        # email can be nil if uid.presents
        expect(model.where(uid: subject[:uid]).first.email).to be_nil
        expect(model.where(uid: subject[:uid]).first.has_attribute?(:email)).to be_falsey
      end
    end

    context "when no email/uid is given" do
      subject { attributes_for(:cms_user_base, :cms_user_rand_name, group: group1) }
      it "save failed" do
        expect { model.new(subject).save! }.to raise_error Mongoid::Errors::Validations
      end
    end
  end

  describe "#long_name" do
    context "when email(sns user) is given" do
      subject { create(:cms_user_base, :cms_user_rand_name, :cms_user_email, group: group1) }
      it { expect(subject.long_name).to eq "#{subject.name} (#{subject.email.split("@")[0]})" }
    end

    context "when uid(ldap user) is given" do
      subject { create(:cms_user_base, :cms_user_rand_name, :cms_user_uid, group: group1) }
      it { expect(subject.long_name).to eq "#{subject.name} (#{subject.uid})" }
    end
  end

  context "shirasagi-424" do
    let(:role1) { create(:cms_role_admin, name: unique_id) }
    let(:role2) { create(:cms_role_admin, name: unique_id) }
    subject { create(:cms_user_base, :cms_user_rand_name, :cms_user_email, group: group1, cms_role_ids: [ role1.id, role2.id ]) }

    its(:cms_role_permissions) { is_expected.to be_a(Hash) }
    its(:cms_role_permissions) { is_expected.to include("edit_private_article_pages_#{cms_site.id}") }
  end

  describe "#cms_role_permissions" do
    let(:permission) { Cms::Role.permission_names.sample }
    let!(:role) { create(:cms_role, cur_site: site2, name: unique_id, permissions: [ permission ]) }
    let!(:user) { create(:cms_user_base, :cms_user_rand_name, :cms_user_email, group: group2, cms_role_ids: [ role.id ]) }

    before do
      @save_current_token = SS.current_token
    end

    after do
      SS.current_token = @save_current_token
    end

    it do
      expect(user.cms_role_permissions.length).to eq 1
      expect(user.cms_role_permissions).to include("#{permission}_#{site2.id}")

      # for oauth2's scope
      SS.current_token = OpenStruct.new(scopes: [ (Cms::Role.permission_names - [ permission ]).sample ])
      user1 = Cms::User.find(user.id)
      expect(user1.cms_role_permissions.length).to eq 0
    end
  end
end
