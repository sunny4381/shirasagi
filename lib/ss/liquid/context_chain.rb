module SS::Liquid::ContextChain
  extend ActiveSupport::Concern

  included do
    alias_method_chain :handle_error, :log
  end

  def handle_error_with_log(*args)
    e = args.first
    Rails.logger.warn("Liquid Error: #{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")}")
    handle_error_without_log(*args)
  end
end
