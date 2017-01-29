require 'ss/liquid/context_chain'
require 'cms/liquid/std_head_tag'

Liquid::Template.default_exception_renderer = proc do |e|
  Rails.logger.warn("#{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")}")
  if !Rails.env.production?
    "<!--- #{e.class} (#{e.message}):\n  #{e.backtrace.join("\n  ")} -->"
  end
end

Liquid::Context.include SS::Liquid::ContextChain

Liquid::Template.register_tag('stdhead'.freeze, Cms::Liquid::StdHeadTag)
