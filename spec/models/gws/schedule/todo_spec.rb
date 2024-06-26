require 'spec_helper'

RSpec.describe Gws::Schedule::Todo, type: :model, dbscope: :example do
  context "default params" do
    subject { create :gws_schedule_todo }
    it { expect(subject.errors.size).to eq 0 }
  end

  context "with reminders" do
    let(:reminder_condition) do
      { 'user_id' => gws_user.id, 'state' => 'mail', 'interval' => 10, 'interval_type' => 'minutes' }
    end
    subject { create :gws_schedule_todo, in_reminder_conditions: [ reminder_condition ] }
    it { expect(subject.errors.size).to eq 0 }
    it { expect(Gws::Reminder.where(item_id: subject.id, model: described_class.name.underscore).count).to eq 1 }
  end

  describe "#calendar_format" do
    let(:site) { gws_site }
    let(:user0) { gws_user }
    let(:group0) { user0.groups.first }
    let(:role_todo_editor) { create :gws_role_schedule_todo_editor, cur_site: site }
    let!(:group1) { create :gws_group, name: "#{group0.name}/group-#{unique_id}" }
    let!(:group2) { create :gws_group, name: "#{group0.name}/group-#{unique_id}" }
    let!(:user1) { create :gws_user, group_ids: [ group1.id ], gws_role_ids: [ role_todo_editor.id ] }
    let!(:user2) { create :gws_user, group_ids: [ group2.id ], gws_role_ids: [ role_todo_editor.id ] }
    let!(:cg_by_user) { create :gws_custom_group, member_ids: [ user1.id ], member_group_ids: [] }
    let!(:cg_by_group) { create :gws_custom_group, member_ids: [], member_group_ids: [ group1.id ] }

    subject do
      create(
        :gws_schedule_todo,
        user_ids: [ user0.id ], group_ids: [], custom_group_ids: [],
        readable_setting_range: "private", readable_member_ids: [], readable_group_ids: [], readable_custom_group_ids: [],
        member_ids: [ user0.id ], member_group_ids: [], member_custom_group_ids: []
      )
    end

    it do
      # 無関係のユーザーが指定された場合
      opts = {}
      opts[:cur_user] = user1
      result = subject.calendar_format(user2, site)
      expect(result).to be_present
      expect(result[:readable]).to be_falsey
      expect(result[:editable]).to be_falsey
      expect(result[:title]).to eq I18n.t("gws/schedule.private_plan")
      expect(result[:className]).to include("fc-event-todo")
    end

    context "with user_ids" do
      before do
        subject.user_ids = [ user1.id ]
        subject.save!
      end

      it do
        # 管理者が指定された場合
        opts = {}
        opts[:cur_user] = user1
        result = subject.calendar_format(user1, site)
        expect(result).to be_present
        expect(result[:readable]).to be_truthy
        expect(result[:editable]).to be_truthy
        expect(result[:title]).to eq subject.name
        expect(result[:className]).to include("fc-event-todo")
      end
    end

    context "with group_ids" do
      before do
        subject.user_ids = []
        subject.group_ids = [ group1.id ]
        subject.save!
      end

      it do
        # 管理者が指定された場合
        opts = {}
        opts[:cur_user] = user1
        result = subject.calendar_format(user1, site)
        expect(result).to be_present
        expect(result[:readable]).to be_truthy
        expect(result[:editable]).to be_truthy
        expect(result[:title]).to eq subject.name
        expect(result[:className]).to include("fc-event-todo")
      end
    end

    context "with custom_group_ids contains users" do
      before do
        subject.user_ids = []
        subject.custom_group_ids = [ cg_by_user.id ]
        subject.save!
      end

      it do
        # 管理者が指定された場合
        opts = {}
        opts[:cur_user] = user1
        result = subject.calendar_format(user1, site)
        expect(result).to be_present
        expect(result[:readable]).to be_truthy
        expect(result[:editable]).to be_truthy
        expect(result[:title]).to eq subject.name
        expect(result[:className]).to include("fc-event-todo")
      end
    end

    context "with custom_group_ids contains groups" do
      before do
        subject.user_ids = []
        subject.custom_group_ids = [ cg_by_group.id ]
        subject.save!
      end

      it do
        # 管理者が指定された場合
        opts = {}
        opts[:cur_user] = user1
        result = subject.calendar_format(user1, site)
        expect(result).to be_present
        expect(result[:readable]).to be_truthy
        expect(result[:editable]).to be_truthy
        expect(result[:title]).to eq subject.name
        expect(result[:className]).to include("fc-event-todo")
      end
    end

    context "with readable_member_ids" do
      before do
        subject.readable_setting_range = "select"
        subject.readable_member_ids = [ user1.id ]
        subject.save!
      end

      it do
        # 閲覧者が指定された場合（管理はできない）
        opts = {}
        opts[:cur_user] = user1
        result = subject.calendar_format(user1, site)
        expect(result).to be_present
        expect(result[:readable]).to be_truthy
        expect(result[:editable]).to be_falsey
        expect(result[:title]).to eq subject.name
        expect(result[:className]).to include("fc-event-todo")
      end
    end

    context "with readable_group_ids" do
      before do
        subject.readable_setting_range = "select"
        subject.readable_group_ids = [ group1.id ]
        subject.save!
      end

      it do
        # 閲覧者が指定された場合（管理はできない）
        opts = {}
        opts[:cur_user] = user1
        result = subject.calendar_format(user1, site)
        expect(result).to be_present
        expect(result[:readable]).to be_truthy
        expect(result[:editable]).to be_falsey
        expect(result[:title]).to eq subject.name
        expect(result[:className]).to include("fc-event-todo")
      end
    end

    context "with readable_custom_group_ids contains users" do
      before do
        subject.readable_setting_range = "select"
        subject.readable_custom_group_ids = [ cg_by_user.id ]
        subject.save!
      end

      it do
        # 閲覧者が指定された場合（管理はできない）
        opts = {}
        opts[:cur_user] = user1
        result = subject.calendar_format(user1, site)
        expect(result).to be_present
        expect(result[:readable]).to be_truthy
        expect(result[:editable]).to be_falsey
        expect(result[:title]).to eq subject.name
        expect(result[:className]).to include("fc-event-todo")
      end
    end

    context "with readable_custom_group_ids contains groups" do
      before do
        subject.readable_setting_range = "select"
        subject.readable_custom_group_ids = [ cg_by_group.id ]
        subject.save!
      end

      it do
        # 閲覧者が指定された場合（管理はできない）
        opts = {}
        opts[:cur_user] = user1
        result = subject.calendar_format(user1, site)
        expect(result).to be_present
        expect(result[:readable]).to be_truthy
        expect(result[:editable]).to be_falsey
        expect(result[:title]).to eq subject.name
        expect(result[:className]).to include("fc-event-todo")
      end
    end

    context "with member_ids" do
      before do
        subject.member_ids = [ user1.id ]
        subject.save!
      end

      it do
        # 参加者が指定された場合（管理はできない）
        opts = {}
        opts[:cur_user] = user1
        result = subject.calendar_format(user1, site)
        expect(result).to be_present
        expect(result[:readable]).to be_truthy
        expect(result[:editable]).to be_falsey
        expect(result[:title]).to eq subject.name
        expect(result[:className]).to include("fc-event-todo")
      end
    end

    context "with member_group_ids" do
      before do
        subject.member_group_ids = [ group1.id ]
        subject.save!
      end

      it do
        # 参加者が指定された場合（管理はできない）
        opts = {}
        opts[:cur_user] = user1
        result = subject.calendar_format(user1, site)
        expect(result).to be_present
        expect(result[:readable]).to be_truthy
        expect(result[:editable]).to be_falsey
        expect(result[:title]).to eq subject.name
        expect(result[:className]).to include("fc-event-todo")
      end
    end

    context "with member_custom_group_ids contains users" do
      before do
        subject.member_custom_group_ids = [ cg_by_user.id ]
        subject.save!
      end

      it do
        # 参加者が指定された場合（管理はできない）
        opts = {}
        opts[:cur_user] = user1
        result = subject.calendar_format(user1, site)
        expect(result).to be_present
        expect(result[:readable]).to be_truthy
        expect(result[:editable]).to be_falsey
        expect(result[:title]).to eq subject.name
        expect(result[:className]).to include("fc-event-todo")
      end
    end

    context "with member_custom_group_ids contains groups" do
      before do
        subject.member_custom_group_ids = [ cg_by_group.id ]
        subject.save!
      end

      it do
        # 参加者が指定された場合（管理はできない）
        opts = {}
        opts[:cur_user] = user1
        result = subject.calendar_format(user1, site)
        expect(result).to be_present
        expect(result[:readable]).to be_truthy
        expect(result[:editable]).to be_falsey
        expect(result[:title]).to eq subject.name
        expect(result[:className]).to include("fc-event-todo")
      end
    end
  end

  describe "#subscribed_users" do
    let(:site) { gws_site }
    let(:user0) { gws_user }
    let(:group0) { user0.groups.first }
    let(:role_todo_editor) { create :gws_role_schedule_todo_editor, cur_site: site }
    let!(:group1) { create :gws_group, name: "#{group0.name}/group-#{unique_id}" }
    let!(:group2) { create :gws_group, name: "#{group0.name}/group-#{unique_id}" }
    let!(:user1) { create :gws_user, group_ids: [ group1.id ], gws_role_ids: [ role_todo_editor.id ] }
    let!(:user2) { create :gws_user, group_ids: [ group2.id ], gws_role_ids: [ role_todo_editor.id ] }
    let!(:cg_by_user) { create :gws_custom_group, member_ids: [ user1.id ], member_group_ids: [] }
    let!(:cg_by_group) { create :gws_custom_group, member_ids: [], member_group_ids: [ group1.id ] }

    subject do
      create(
        :gws_schedule_todo,
        user_ids: [ user0.id ], group_ids: [], custom_group_ids: [],
        readable_setting_range: "select", readable_member_ids: [], readable_group_ids: [], readable_custom_group_ids: [],
        member_ids: [ user0.id ], member_group_ids: [], member_custom_group_ids: []
      )
    end

    it do
      expect(subject.subscribed_users).to be_present
      expect(subject.subscribed_users.pluck(:id)).to include user0.id
    end

    context "with member_ids" do
      before do
        subject.member_ids = [ user1.id ]
        subject.save!
      end

      it do
        expect(subject.subscribed_users).to be_present
        expect(subject.subscribed_users.pluck(:id)).to include user1.id
        expect(subject.subscribed_users.pluck(:id)).not_to include user2.id
      end
    end

    context "with member_group_ids" do
      before do
        subject.member_group_ids = [ group1.id ]
        subject.save!
      end

      it do
        expect(subject.subscribed_users).to be_present
        expect(subject.subscribed_users.pluck(:id)).to include user1.id
        expect(subject.subscribed_users.pluck(:id)).not_to include user2.id
      end
    end

    context "with member_custom_group_ids contains users" do
      before do
        subject.member_custom_group_ids = [ cg_by_user.id ]
        subject.save!
      end

      it do
        expect(subject.subscribed_users).to be_present
        expect(subject.subscribed_users.pluck(:id)).to include user1.id
        expect(subject.subscribed_users.pluck(:id)).not_to include user2.id
      end
    end

    context "with member_custom_group_ids contains groups" do
      before do
        subject.member_custom_group_ids = [ cg_by_group.id ]
        subject.save!
      end

      it do
        expect(subject.subscribed_users).to be_present
        expect(subject.subscribed_users.pluck(:id)).to include user1.id
        expect(subject.subscribed_users.pluck(:id)).not_to include user2.id
      end
    end
  end

  describe ".group_by_user" do
    let(:site) { gws_site }
    let!(:user1) { create(:gws_user, cur_site: site, uid: "T0001", gws_role_ids: gws_user.gws_role_ids) }
    let!(:user2) { create(:gws_user, cur_site: site, uid: "T0002", gws_role_ids: gws_user.gws_role_ids) }
    let!(:item1) { create :gws_schedule_todo, cur_site: site, cur_user: user1, member_ids: [user1.id], user_ids: [user1.id] }
    let!(:item2) { create :gws_schedule_todo, cur_site: site, cur_user: user1, member_ids: [user2.id], user_ids: [user1.id] }

    subject do
      result = []
      described_class.all.order_by(end_at: 1).group_by_user(site: site) do |user, items|
        result << [ user, items.dup ]
      end
      result
    end

    it do
      expect(subject).to have(2).items

      subject[0].tap do |user, items|
        expect(user.id).to eq user1.id
        expect(items).to have(1).items
        expect(items[0].id.to_s).to eq item1.id.to_s
      end

      subject[1].tap do |user, items|
        expect(user.id).to eq user2.id
        expect(items).to have(1).items
        expect(items[0].id.to_s).to eq item2.id.to_s
      end
    end
  end

  describe ".group_by_end_at" do
    let(:site) { gws_site }
    let(:user) { gws_user }
    let(:now) { Time.zone.now.beginning_of_minute }
    let!(:item1) { create :gws_schedule_todo, cur_site: site, cur_user: user, start_at: now - 1.day, end_at: now - 1.day }
    let!(:item2) { create :gws_schedule_todo, cur_site: site, cur_user: user, start_at: now, end_at: now }
    let!(:item3) { create :gws_schedule_todo, cur_site: site, cur_user: user, start_at: now + 1.day, end_at: now + 1.day }
    let!(:item4) { create :gws_schedule_todo, cur_site: site, cur_user: user, start_at: now + 2.days, end_at: now + 2.days }
    let!(:item5) { create :gws_schedule_todo, cur_site: site, cur_user: user, start_at: now + 3.days, end_at: now + 3.days }

    subject do
      result = []
      described_class.all.order_by(end_at: 1).group_by_end_at do |limit, items|
        result << [ limit, items.dup ]
      end
      result
    end

    it do
      expect(subject).to have(4).items

      subject[0].tap do |limit, items|
        expect(limit.id).to eq "out_dated"
        expect(items).to have(1).items
        expect(items[0].id.to_s).to eq item1.id.to_s
      end

      subject[1].tap do |limit, items|
        expect(limit.id).to eq "today"
        expect(items).to have(1).items
        expect(items[0].id.to_s).to eq item2.id.to_s
      end

      subject[2].tap do |limit, items|
        expect(limit.id).to eq "tomorrow"
        expect(items).to have(1).items
        expect(items[0].id.to_s).to eq item3.id.to_s
      end

      subject[3].tap do |limit, items|
        expect(limit.id).to eq "day_after_tomorrow"
        expect(items).to have(2).items
        expect(items[0].id.to_s).to eq item4.id.to_s
        expect(items[1].id.to_s).to eq item5.id.to_s
      end
    end
  end

  describe ".group_by_category" do
    let(:site) { gws_site }
    let(:user) { gws_user }
    let(:cate1) { Gws::Schedule::TodoCategory.create!(cur_site: site, cur_user: user, name: unique_id, order: 10) }
    let(:cate2) { Gws::Schedule::TodoCategory.create!(cur_site: site, cur_user: user, name: unique_id, order: 20) }
    let!(:item1) { create :gws_schedule_todo, cur_site: site, cur_user: user }
    let!(:item2) { create :gws_schedule_todo, cur_site: site, cur_user: user, category_ids: [ cate1.id ] }
    let!(:item3) { create :gws_schedule_todo, cur_site: site, cur_user: user, category_ids: [ cate2.id ] }

    subject do
      result = []
      described_class.all.order_by(end_at: 1).group_by_category(user: user, site: site) do |_header, items, cate|
        result << [ cate, items.dup ]
      end
      result
    end

    it do
      expect(subject).to have(3).items

      subject[0].tap do |cate, items|
        expect(cate.id).to eq "na"
        expect(items).to have(1).items
        expect(items[0].id.to_s).to eq item1.id.to_s
      end

      subject[1].tap do |cate, items|
        expect(cate.id).to eq cate1.id
        expect(items).to have(1).items
        expect(items[0].id.to_s).to eq item2.id.to_s
      end

      subject[2].tap do |cate, items|
        expect(cate.id).to eq cate2.id
        expect(items).to have(1).items
        expect(items[0].id.to_s).to eq item3.id.to_s
      end
    end
  end

  describe ".group_by_discussion_forum" do
    let(:site) { gws_site }
    let(:user) { gws_user }
    let(:forum1) { create :gws_discussion_forum, order: 10 }
    let(:forum2) { create :gws_discussion_forum, order: 20 }
    let!(:item1) { create :gws_schedule_todo, cur_site: site, cur_user: user }
    let!(:item2) { create :gws_schedule_todo, cur_site: site, cur_user: user, discussion_forum_id: forum1.id }
    let!(:item3) { create :gws_schedule_todo, cur_site: site, cur_user: user, discussion_forum_id: forum2.id }

    subject do
      result = []
      described_class.all.order_by(end_at: 1).group_by_discussion_forum(user: user, site: site) do |forum, items|
        result << [ forum, items.dup ]
      end
      result
    end

    it do
      expect(subject).to have(3).items

      subject[0].tap do |forum, items|
        expect(forum.id).to eq "none"
        expect(items).to have(1).items
        expect(items[0].id.to_s).to eq item1.id.to_s
      end

      subject[1].tap do |forum, items|
        expect(forum.id).to eq forum1.id
        expect(items).to have(1).items
        expect(items[0].id.to_s).to eq item2.id.to_s
      end

      subject[2].tap do |forum, items|
        expect(forum.id).to eq forum2.id
        expect(items).to have(1).items
        expect(items[0].id.to_s).to eq item3.id.to_s
      end
    end
  end

  describe "#reminder_url" do
    let(:item) { create :gws_schedule_todo }
    subject { item.reminder_url }

    it do
      expect(subject).to be_a(Array)
      expect(subject.length).to eq 2
      expect(subject[0]).to eq "gws_schedule_todo_readable_path"
      expect(subject[1]).to be_a(Hash)

      path = Rails.application.routes.url_helpers.send(subject[0], subject[1])
      expect(path).to eq "/.g#{item.site_id}/schedule/todo/-/readables/#{item.id}"
    end
  end

  describe "#new_clone" do
    let(:site) { gws_site }
    let(:user) { gws_user }
    let!(:file1) { tmp_ss_file(contents: '0123456789', user: user) }
    let!(:item) { create :gws_schedule_todo, cur_site: site, file_ids: [ file1.id ] }

    before do
      file1.reload
      expect(file1.owner_item_id).to eq item.id
      expect(file1.owner_item_type).to eq item.class.name
    end

    context "usual case" do
      it do
        new_item = item.new_clone
        new_item.save!
        expect(new_item.site_id).to eq item.site_id
        expect(new_item.priority).to eq item.priority
        expect(new_item.name).to eq "[#{I18n.t("workflow.cloned_name_prefix")}] #{item.name}"
        expect(new_item.state).to eq "public"
        expect(new_item.start_on).to eq item.start_on
        expect(new_item.end_on).to eq item.end_on
        expect(new_item.start_at).to eq item.start_at
        expect(new_item.end_at).to eq item.end_at
        expect(new_item.allday).to eq item.allday
        expect(new_item.repeat_plan).to be_blank
        expect(new_item.notify_state).to eq item.notify_state
        expect(new_item.discussion_forum).to eq item.discussion_forum
        expect(new_item.category_ids).to eq item.category_ids
        expect(new_item.comments).to be_blank
        expect(new_item.text).to eq item.text
        expect(new_item.text_type).to eq item.text_type
        expect(new_item.file_ids.length).to eq item.file_ids.length
        expect(new_item.file_ids).not_to eq item.file_ids
        new_item.files.first.tap do |new_file|
          expect(new_file.id).not_to eq file1.id
          expect(new_file.model).to eq "gws/schedule/todo"
          expect(new_file.name).to eq file1.name
          expect(new_file.filename).to eq file1.filename
          expect(new_file.content_type).to eq file1.content_type
          expect(new_file.size).to eq file1.size
          expect(new_file.owner_item_id).to eq new_item.id
          expect(new_file.owner_item_type).to eq new_item.class.name
        end
        expect(new_item.member_ids).to eq item.member_ids
        expect(new_item.member_group_ids).to eq item.member_group_ids
        expect(new_item.member_custom_group_ids).to eq item.member_custom_group_ids
        expect(new_item.readable_setting_range).to eq item.readable_setting_range
        expect(new_item.readable_group_ids).to eq item.readable_group_ids
        expect(new_item.readable_member_ids).to eq item.readable_member_ids
        expect(new_item.readable_custom_group_ids).to eq item.readable_custom_group_ids
        expect(new_item.group_ids).to eq item.group_ids
        expect(new_item.user_ids).to eq item.user_ids
        expect(new_item.custom_group_ids).to eq item.custom_group_ids
        expect(new_item.todo_state).to eq "unfinished"
        expect(new_item.achievement_rate).to be_blank
      end
    end

    context "file is replaced while cloning" do
      let!(:file2) { tmp_ss_file(contents: '0123456789', user: user) }

      it do
        new_item = item.new_clone
        new_item.file_ids = [ file2.id ]
        new_item.save!
        expect(new_item.site_id).to eq item.site_id
        expect(new_item.priority).to eq item.priority
        expect(new_item.name).to eq "[#{I18n.t("workflow.cloned_name_prefix")}] #{item.name}"
        expect(new_item.state).to eq "public"
        expect(new_item.start_on).to eq item.start_on
        expect(new_item.end_on).to eq item.end_on
        expect(new_item.start_at).to eq item.start_at
        expect(new_item.end_at).to eq item.end_at
        expect(new_item.allday).to eq item.allday
        expect(new_item.repeat_plan).to be_blank
        expect(new_item.notify_state).to eq item.notify_state
        expect(new_item.discussion_forum).to eq item.discussion_forum
        expect(new_item.category_ids).to eq item.category_ids
        expect(new_item.comments).to be_blank
        expect(new_item.text).to eq item.text
        expect(new_item.text_type).to eq item.text_type
        expect(new_item.file_ids.length).to eq 1
        new_item.files.first.tap do |new_file|
          expect(new_file.id).to eq file2.id
          expect(new_file.model).to eq "gws/schedule/todo"
          expect(new_file.owner_item_id).to eq new_item.id
          expect(new_file.owner_item_type).to eq new_item.class.name
        end
        expect(new_item.member_ids).to eq item.member_ids
        expect(new_item.member_group_ids).to eq item.member_group_ids
        expect(new_item.member_custom_group_ids).to eq item.member_custom_group_ids
        expect(new_item.readable_setting_range).to eq item.readable_setting_range
        expect(new_item.readable_group_ids).to eq item.readable_group_ids
        expect(new_item.readable_member_ids).to eq item.readable_member_ids
        expect(new_item.readable_custom_group_ids).to eq item.readable_custom_group_ids
        expect(new_item.group_ids).to eq item.group_ids
        expect(new_item.user_ids).to eq item.user_ids
        expect(new_item.custom_group_ids).to eq item.custom_group_ids
        expect(new_item.todo_state).to eq "unfinished"
        expect(new_item.achievement_rate).to be_blank

        file2.reload
        expect(file2.owner_item_id).to eq new_item.id
        expect(file2.owner_item_type).to eq new_item.class.name
      end
    end
  end
end
