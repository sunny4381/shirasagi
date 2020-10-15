require 'spec_helper'

RSpec.describe SS::SanitizeHelper, type: :helper do
  describe '#ss_sanitize' do
    context "without any options; this is sanitize wrapper mode" do
      it do
        expect(helper.ss_sanitize("<script>alert('hello');</script>")).to eq "alert('hello');"
      end
    end

    context "with script-level option" do
      context "when script-level is set to 0 (compatible mode)" do
        let!(:site) { create(:cms_site_unique, script_level: 0) }

        before do
          controller.instance_variable_set(:@cur_site, site)
        end

        it do
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", cur_site: site, script_expected: SS::ScriptExpected::ALWAYS_ALLOWED)
          expect(escaped).to eq "<script>alert('hello');</script>"
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", cur_site: site, script_expected: SS::ScriptExpected::PARTIALLY_ALLOWED)
          expect(escaped).to eq "<script>alert('hello');</script>"
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", cur_site: site, script_expected: SS::ScriptExpected::ESCAPED)
          expect(escaped).to eq "<script>alert('hello');</script>"

          escaped = helper.ss_sanitize("<script>alert('hello');</script>", script_expected: SS::ScriptExpected::ALWAYS_ALLOWED)
          expect(escaped).to eq "<script>alert('hello');</script>"
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", script_expected: SS::ScriptExpected::PARTIALLY_ALLOWED)
          expect(escaped).to eq "<script>alert('hello');</script>"
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", script_expected: SS::ScriptExpected::ESCAPED)
          expect(escaped).to eq "<script>alert('hello');</script>"
        end
      end

      context "when script-level is set to 100 (middle grade)" do
        let!(:site) { create(:cms_site_unique, script_level: 100) }

        before do
          controller.instance_variable_set(:@cur_site, site)
        end

        it do
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", cur_site: site, script_expected: SS::ScriptExpected::ALWAYS_ALLOWED)
          expect(escaped).to eq "<script>alert('hello');</script>"
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", cur_site: site, script_expected: SS::ScriptExpected::PARTIALLY_ALLOWED)
          expect(escaped).to eq "<script>alert('hello');</script>"
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", cur_site: site, script_expected: SS::ScriptExpected::ESCAPED)
          expect(escaped).to eq "alert('hello');"

          escaped = helper.ss_sanitize("<script>alert('hello');</script>", script_expected: SS::ScriptExpected::ALWAYS_ALLOWED)
          expect(escaped).to eq "<script>alert('hello');</script>"
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", script_expected: SS::ScriptExpected::PARTIALLY_ALLOWED)
          expect(escaped).to eq "<script>alert('hello');</script>"
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", script_expected: SS::ScriptExpected::ESCAPED)
          expect(escaped).to eq "alert('hello');"
        end
      end

      context "when script-level is set to 200 (high grade)" do
        let!(:site) { create(:cms_site_unique, script_level: 200) }

        before do
          controller.instance_variable_set(:@cur_site, site)
        end

        it do
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", cur_site: site, script_expected: SS::ScriptExpected::ALWAYS_ALLOWED)
          expect(escaped).to eq "<script>alert('hello');</script>"
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", cur_site: site, script_expected: SS::ScriptExpected::PARTIALLY_ALLOWED)
          expect(escaped).to eq "alert('hello');"
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", cur_site: site, script_expected: SS::ScriptExpected::ESCAPED)
          expect(escaped).to eq "alert('hello');"

          escaped = helper.ss_sanitize("<script>alert('hello');</script>", script_expected: SS::ScriptExpected::ALWAYS_ALLOWED)
          expect(escaped).to eq "<script>alert('hello');</script>"
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", script_expected: SS::ScriptExpected::PARTIALLY_ALLOWED)
          expect(escaped).to eq "alert('hello');"
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", script_expected: SS::ScriptExpected::ESCAPED)
          expect(escaped).to eq "alert('hello');"
        end
      end

      context "when script-level is set to 300 (unable to use at all)" do
        let!(:site) { create(:cms_site_unique, script_level: 300) }

        before do
          controller.instance_variable_set(:@cur_site, site)
        end

        it do
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", cur_site: site, script_expected: SS::ScriptExpected::ALWAYS_ALLOWED)
          expect(escaped).to eq "alert('hello');"
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", cur_site: site, script_expected: SS::ScriptExpected::PARTIALLY_ALLOWED)
          expect(escaped).to eq "alert('hello');"
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", cur_site: site, script_expected: SS::ScriptExpected::ESCAPED)
          expect(escaped).to eq "alert('hello');"

          escaped = helper.ss_sanitize("<script>alert('hello');</script>", script_expected: SS::ScriptExpected::ALWAYS_ALLOWED)
          expect(escaped).to eq "alert('hello');"
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", script_expected: SS::ScriptExpected::PARTIALLY_ALLOWED)
          expect(escaped).to eq "alert('hello');"
          escaped = helper.ss_sanitize("<script>alert('hello');</script>", script_expected: SS::ScriptExpected::ESCAPED)
          expect(escaped).to eq "alert('hello');"
        end
      end
    end
  end
end
