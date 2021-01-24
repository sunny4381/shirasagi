require "rails/command"

module SS
  module Command
    class BaseCommand < Rails::Command::Base
      def help(*_args)
        self.class.command_help(shell, "help")
      end
    end
  end
end
