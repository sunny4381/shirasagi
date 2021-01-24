require_relative '../base/base_command'

module SS
  module Command
    class JobCommand < SS::Command::BaseCommand
      hide_command!
      namespace "ss"
      @command_name = "ss:job"

      desc "status", "show status of the Shirasagi Job server and etc."
      def status(*args, **options, &block)
        puts "#{self.class.name}#status: args=#{args}, options=#{options}, block_given?=#{block_given?}"
      end

      # starts the Shirasagi Job server
      desc "start", "start the Shirasagi Job server."
      method_option :config, aliases: "-c", desc: "specify Shirasagi Job Configuration name. default is \"default\"."
      def start
        require_application_and_environment!

        [:INT, :TERM].each do |signal|
          Signal.trap(signal) do
            Thread.new do
              ::Job::Service.shutdown
            end
          end
        end

        ::Job::Service.run(options[:config])
      end

      # executes a single job right now
      desc "execute JOB", "execute a job right now."
      method_option :bind_site, desc: "a site the job executes in."
      method_option :bind_node, desc: "a node the job executes on."
      method_option :bind_user, desc: "a user the job executes by."
      def exec(job, *job_args)
        require_application_and_environment!

        job_class_name = job.gsub(":", "/").classify
        job_class = job_class_name.constantize

        bind_params = {}
        bind_params[:site_id] = options[:bind_site] if options[:bind_site].present?
        bind_params[:node_id] = options[:bind_node] if options[:bind_node].present?
        bind_params[:user_id] = options[:bind_user] if options[:bind_user].present?

        job_class.bind(bind_params).perform_now(*job_args)
      end

      # register a single job for future execution
      desc "register", "register a job for future execution by job service."
      method_option :set_wait, desc: "enqueues the job with the specified delay."
      method_option :set_wait_until, desc: "enqueues the job at the time specified."
      method_option :set_queue, desc: "enqueues the job on the specified queue."
      method_option :set_priority, desc: "enqueues the job with the specified priority."
      method_option :bind_site, desc: "a site the job executes in."
      method_option :bind_node, desc: "a node the job executes on."
      method_option :bind_user, desc: "a user the job executes by."
      def register(job, *job_args)
        require_application_and_environment!

        job_class_name = job.gsub(":", "/").classify
        job_class = job_class_name.constantize

        set_params = {}
        set_params[:wait] = SS::Duration.parse(options[:set_wait]) if options[:set_wait].present?
        set_params[:wait_until] = Time.zone.parse(options[:set_wait_until]) if options[:set_wait_until].present?
        set_params[:queue] = options[:set_queue].to_s if options[:set_queue].present?
        set_params[:priority] = options[:set_priority].to_i if options[:set_priority].numeric?

        bind_params = {}
        bind_params[:site_id] = options[:bind_site] if options[:bind_site].present?
        bind_params[:node_id] = options[:bind_node] if options[:bind_node].present?
        bind_params[:user_id] = options[:bind_user] if options[:bind_user].present?

        job_class.set(set_params).bind(bind_params).perform_later(*job_args)
      end
    end
  end
end
