require 'spec_helper'

describe Gws::StaffRecord::Group, type: :model, dbscope: :example do
  let!(:site1) { create :gws_group }
  let!(:group1) { create :gws_group, name: "#{site1.name}/#{unique_id}" }
  let!(:group2) { create :gws_group, name: "#{site1.name}/#{unique_id}" }
  let!(:user1) { create :gws_user, group_ids: [ site1.id ] }
  let!(:user2) { create :gws_user, group_ids: [ site1.id ] }
  let!(:year1) { create :gws_staff_record_year, cur_site: site1 }
  let(:readable_setting_range) { %w(public select private).sample }
  let!(:staff_record_group1) do
    create(
      :gws_staff_record_group, cur_site: site1, year: year1, seating_chart_url: "/#{unique_id}/#{unique_id}.html",
      readable_setting_range: readable_setting_range, readable_group_ids: [ group1.id ],
      readable_member_ids: [ user1.id ], group_ids: [ group2.id ], user_ids: [ user2.id ]
    )
  end

  let(:encoding) { %w(Shift_JIS UTF-8).sample }
  let(:csv) do
    item = described_class.new
    item.cur_site = site1
    item.year = year1
    item.in_csv_encoding = encoding

    year1.reload
    csv = item.export_csv(year1.yearly_groups.site(site1))
    # clear id to import as new item
    csv = csv.sub("\n#{staff_record_group1.id},", "\n,")
    csv
  end
  let(:csv_as_file) do
    path = tmpfile(extname: ".csv", binary: true) { |f| f.write csv }
    Fs::UploadedFile.create_from_file(path, basename: "spec")
  end

  let!(:site2) { create :gws_group }
  let!(:year2) { create :gws_staff_record_year, cur_site: site2 }

  before do
    admin_role = create(:gws_role_admin, cur_site: site2)
    gws_user.add_to_set(group_ids: site2.id)
    gws_user.add_to_set(gws_role_ids: admin_role.id)

    user1.add_to_set(group_ids: site2.id)
    user2.add_to_set(group_ids: site2.id)
  end

  context "newly import" do
    it do
      item = described_class.new
      item.cur_site = site2
      item.cur_user = gws_user
      item.year = year2
      item.in_file = csv_as_file

      item.import_csv
      expect(item.errors).to be_blank
      expect(Gws::StaffRecord::Group.all.site(site2).count).to eq 1
      Gws::StaffRecord::Group.all.site(site2).first.tap do |imported_staff_record_group|
        expect(imported_staff_record_group.name).to eq staff_record_group1.name
        expect(imported_staff_record_group.seating_chart_url).to eq staff_record_group1.seating_chart_url
        expect(imported_staff_record_group.order).to eq staff_record_group1.order
        expect(imported_staff_record_group.readable_setting_range).to eq staff_record_group1.readable_setting_range
        expect(imported_staff_record_group.readable_group_ids).to be_blank
        if readable_setting_range == "select"
          expect(imported_staff_record_group.readable_member_ids).to have(1).items
          expect(imported_staff_record_group.readable_member_ids).to include(user1.id)
        end
        expect(imported_staff_record_group.group_ids).to be_blank
        expect(imported_staff_record_group.user_ids).to have(2).items
        expect(imported_staff_record_group.user_ids).to include(gws_user.id, user2.id)
      end
    end
  end
end
