require 'spec_helper'
require_relative "../../../../lib/commands/task/task_command.rb"

describe SS::Command::TaskCommand, dbscope: :example do
  let(:site) { cms_site }
  let!(:task1) { create :ss_task }
  let!(:task2) { create :ss_task, cur_site: site }

  describe "#list" do
    it do
      expectation = expect { described_class.new.list }
      expectation.to output(/^\s+#{task1.name}\s+#{task1.state}\s+#{::Regexp.escape(task1.updated.iso8601)}$/).to_stdout
      expectation.to output(/^#{site.host}\s+#{task2.name}\s+#{task2.state}\s+#{::Regexp.escape(task2.updated.iso8601)}$/).to_stdout
    end
  end
end
