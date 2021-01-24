require "rails/command"
require_relative '../base/base_command'
require_relative '../job/job_command'
require_relative '../task/task_command'

module SS
  module Command
    class MainCommand < SS::Command::BaseCommand
      namespace "ss"
      @command_name = "ss"

      # class << self
      #   def usage_path
      #     File.expand_path("USAGE", __dir__)
      #   end
      # end
      #
      # no_commands do
      #   def help
      #     say "Usage:\n  #{self.class.banner}"
      #     say ""
      #     say self.class.desc
      #   end
      # end

      subcommand "job", SS::Command::JobCommand
      subcommand "task", SS::Command::TaskCommand

      # ファイルのアップロードができれば便利かも。
      # subcommand "file", SS::Command::FileCommand

      # サイト、グループ、ユーザーの一蘭、追加、削除などができれば便利かも。
      # subcommand "site", SS::Command::SiteCommand
      # subcommand "group", SS::Command::GroupCommand
      # subcommand "user", SS::Command::UserCommand
    end
  end
end
