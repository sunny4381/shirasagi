require_relative '../base/base_command'

module SS
  module Command
    class TaskCommand < SS::Command::BaseCommand
      hide_command!
      namespace "ss"
      @command_name = "ss:task"

      desc "list", "show task list."
      def list
        require_application_and_environment!

        puts
        puts "#{'Site'.ljust(14)}  #{'Name'.ljust(24)}  #{'State'.center(8)}  Updated"
        puts "-" * 80

        all_ids = Cms::Task.all.pluck(:id)
        all_ids.each_slice(20) do |ids|
          Cms::Task.all.in(id: ids).to_a.each do |task|
            site_host = task.site.try(:host) || ""
            puts "#{site_host.ljust(14)}  #{task.name.ljust(24)}  #{(task.state || "").center(8)}  #{task.updated.iso8601}"
          end
        end
      end
    end
  end
end
