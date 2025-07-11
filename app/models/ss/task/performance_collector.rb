class SS::Task
  class PerformanceCollector
    class_attribute :current, instance_accessor: false, default: nil

    def initialize(task)
      @task = task
      @temp_file = Tempfile.create("performance")
      @temp_file.binmode
      @log_file = Zlib::GzipWriter.new(@temp_file)
      @scopes = []

      @subscriber = ::ActiveSupport::Notifications.subscribe('render_template.action_view') do |*args|
        increment_view_stats(ActiveSupport::Notifications::Event.new(*args))
      rescue => e
        Rails.logger.warn("#{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")}")
      end

      PerformanceCollector.current = self
      self.class.install_mongo_subscriber
    end

    class MongoSubscriber
      def started(event)
      end

      def succeeded(event)
        return if SS::Task::PerformanceCollector.current.blank?
        SS::Task::PerformanceCollector.current.increment_db_stats(event, "succeeded")
      end

      def failed(event)
        return if SS::Task::PerformanceCollector.current.blank?
        SS::Task::PerformanceCollector.current.increment_db_stats(event, "failed")
      end
    end

    class << self
      def install_mongo_subscriber
        @subscriber ||= begin
          subscriber = MongoSubscriber.new

          Mongo::Monitoring::Global.subscribe(Mongo::Monitoring::COMMAND, subscriber)
          Mongoid::Clients.clients.each { |_key, client| client.subscribe(Mongo::Monitoring::COMMAND, subscriber) }

          subscriber
        end
      end
    end

    def close
      @log_file.finish
      @temp_file.close

      if !::File.empty?(@temp_file.path)
        ::FileUtils.cp(@temp_file.path, @task.perf_log_file_path, preserve: true)
      end
    ensure
      if @subscriber
        ::ActiveSupport::Notifications.unsubscribe(@subscriber)
        @subscriber = nil
      end

      @scopes.clear
      @scopes = nil

      ::FileUtils.rm_f(@temp_file.path)
      @log_file = nil
      @temp_file = nil

      PerformanceCollector.current = nil
    end

    def collect(scope)
      time = result = nil
      @scopes.push(scope)

      if block_given?
        time = Benchmark.realtime do
          result = yield
        end
      end
      time ||= 0

      puts_performance_log(time)

      result
    rescue => e
      puts_performance_log(time, e)
      raise
    ensure
      last_scope = @scopes.pop
      current_scope = @scopes.last
      if last_scope.present? && current_scope.present?
        if last_scope[:view].present?
          current_scope[:view] ||= 0
          current_scope[:view] += last_scope[:view]
        end
        if last_scope[:db].present?
          current_scope[:db] ||= 0
          current_scope[:db] += last_scope[:db]
        end
      end
    end

    def puts_performance_log(time, exception = nil)
      return if @scopes.blank?

      current_scope = @scopes.last
      return if current_scope.blank?

      performance_hash = current_scope.dup
      performance_hash[:elapsed] = time
      performance_hash[:error] = "#{exception.class}: #{exception.message}" if exception.present?
      formatted_scopes = []
      @scopes.each_with_index do |scope, index|
        break if index >= @scopes.length - 1
        formatted_scopes << scope.except(:view, :db)
      end
      performance_hash[:scopes] = formatted_scopes if formatted_scopes.present?

      @log_file.puts(performance_hash.to_json)
    rescue => e
      Rails.logger.warn("#{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")}")
    end

    def header(desc)
      desc = desc.dup
      desc[:type] ||= :header
      @log_file.puts(desc.to_json)
    rescue => e
      Rails.logger.warn("#{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")}")
    end

    def collect_site(cms_site_or_gws_site, options = {}, &block)
      scope = { type: :site, id: cms_site_or_gws_site.id, name: cms_site_or_gws_site.name }
      scope[:host] = cms_site_or_gws_site.host if cms_site_or_gws_site.respond_to?(:host)
      scope = scope.merge(options)
      collect(scope, &block)
    end

    def collect_node(node, options = {}, &block)
      scope = { type: :node, id: node.id, route: node.route, name: node.name, filename: node.filename }.merge(options)
      collect(scope, &block)
    end

    def collect_page(page, options = {}, &block)
      scope = { type: :page, id: page.id, route: page.route, name: page.name, filename: page.filename }.merge(options)
      collect(scope, &block)
    end

    def collect_layout(layout, options = {}, &block)
      scope = { type: :layout, id: layout.id, name: layout.name, filename: layout.filename }.merge(options)
      collect(scope, &block)
    end

    def collect_part(part, options = {}, &block)
      scope = { type: :part, id: part.id, route: part.route, name: part.name, filename: part.filename }.merge(options)
      collect(scope, &block)
    end

    def collect_init_context(&block)
      scope = { type: :init_context }
      collect(scope, &block)
    end

    def collect_result(&block)
      scope = { type: :result }
      collect(scope, &block)
    end

    def collect_finalize_context(&block)
      scope = { type: :finalize_context }
      collect(scope, &block)
    end

    def collect_import_user_csv(&block)
      scope = { type: :import_user_csv }
      collect(scope, &block)
    end

    def collect_update_all(&block)
      scope = { type: :update_all }
      collect(scope, &block)
    end

    def collect_validate_all(&block)
      scope = { type: :validate_all }
      collect(scope, &block)
    end

    def collect_delete_groups(&block)
      scope = { type: :delete_groups }
      collect(scope, &block)
    end

    def collect_changeset(changeset_type, &block)
      scope = { type: :changeset, changeset_type: changeset_type }
      collect(scope, &block)
    end

    def collect_model_update(model, &block)
      scope = { type: :model_update, model: model.name }
      collect(scope, &block)
    end

    def collect_entity_update(entity, &block)
      scope = { type: :entity_update, model: entity.class.name, key: entity.to_key }
      collect(scope, &block)
    end

    def collect_callback(kind, entity, overall, net)
      before_elapsed = net.first - overall.first
      kind_elapsed = net.last - net.first
      after_elapsed = overall.last - net.last
      scope = {
        type: :callback, callback_kind: kind, model: entity.class.name, key: entity.to_key,
        before_elapsed: before_elapsed, kind_elapsed: kind_elapsed, after_elapsed: after_elapsed
      }
      collect(scope)
    end

    def increment_view_stats(event)
      return if @scopes.blank?

      current_scope = @scopes.last
      return if current_scope.blank?

      current_scope[:view] ||= 0
      current_scope[:view] += event.duration / 1_000.0
    rescue => e
      Rails.logger.warn("#{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")}")
    end

    def increment_db_stats(event, status)
      return if @scopes.blank?

      current_scope = @scopes.last
      return if current_scope.blank?

      current_scope[:db] ||= 0
      current_scope[:db] += event.duration
    rescue => e
      Rails.logger.warn("#{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")}")
    end
  end
end
