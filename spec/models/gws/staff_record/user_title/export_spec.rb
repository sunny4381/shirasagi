require 'spec_helper'

describe Gws::StaffRecord::UserTitle, type: :model, dbscope: :example do
  let(:site1) { create :gws_group }
  let!(:year1) { create :gws_staff_record_year, cur_site: site1 }
  let!(:title1) { create :gws_staff_record_user_title, cur_site: site1, year: year1 }

  before do
    admin_role = create(:gws_role_admin, cur_site: site1)
    gws_user.add_to_set(group_ids: site1.id)
    gws_user.add_to_set(gws_role_ids: admin_role.id)

    year1.reload
  end

  context "with Shift_JIS" do
    let(:encoding) { "Shift_JIS" }

    it do
      item = described_class.new
      item.cur_site = site1
      item.cur_user = gws_user
      item.year = year1
      item.in_csv_encoding = encoding

      csv = item.export_csv(year1.yearly_user_titles.site(site1))
      csv = csv.encode("UTF-8", "SJIS")
      csv = ::CSV.parse(csv, headers: true)

      expect(csv.length).to eq 1
      expect(csv.headers.length).to eq 7
      expect(csv.headers).to include(*%i[id code name remark order group_ids user_ids].map { |f| described_class.t(f) })
      csv.first.tap do |row|
        expect(row.length).to eq 7
        expect(row[described_class.t(:id)]).to eq title1.id.to_s
        expect(row[described_class.t(:code)]).to eq title1.code
        expect(row[described_class.t(:name)]).to eq title1.name
        expect(row[described_class.t(:remark)]).to eq title1.remark
        expect(row[described_class.t(:order)]).to eq title1.order.to_s
        expect(row[described_class.t(:group_ids)]).to eq title1.groups.pluck(:name).join("\n")
        expect(row[described_class.t(:user_ids)]).to eq title1.users.pluck(:uid).join("\n")
      end
    end
  end

  context "with UTF-8" do
    let(:encoding) { "UTF-8" }

    it do
      item = described_class.new
      item.cur_site = site1
      item.cur_user = gws_user
      item.year = year1
      item.in_csv_encoding = encoding

      csv = item.export_csv(year1.yearly_user_titles.site(site1))
      csv = csv.sub(SS::Csv::UTF8_BOM, '')
      csv = ::CSV.parse(csv, headers: true)

      expect(csv.length).to eq 1
      expect(csv.headers.length).to eq 7
      expect(csv.headers).to include(*%i[id code name remark order group_ids user_ids].map { |f| described_class.t(f) })
      csv.first.tap do |row|
        expect(row.length).to eq 7
        expect(row[described_class.t(:id)]).to eq title1.id.to_s
        expect(row[described_class.t(:code)]).to eq title1.code
        expect(row[described_class.t(:name)]).to eq title1.name
        expect(row[described_class.t(:remark)]).to eq title1.remark
        expect(row[described_class.t(:order)]).to eq title1.order.to_s
        expect(row[described_class.t(:group_ids)]).to eq title1.groups.pluck(:name).join("\n")
        expect(row[described_class.t(:user_ids)]).to eq title1.users.pluck(:uid).join("\n")
      end
    end
  end
end
