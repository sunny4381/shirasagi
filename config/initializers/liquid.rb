Liquid::Template.default_exception_renderer = proc do |e|
  Rails.logger.warn("#{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")}")
  if !Rails.env.production?
    "<!--- #{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")} -->"
  end
end
