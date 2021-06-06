module Cms::Agent
  class Constraint
    def self.matches?(request)
      context = request.env["ss"]
      return false if context.blank? || !context.respond_to?(:domain)

      context.domain == "agent"
    end
  end
end
