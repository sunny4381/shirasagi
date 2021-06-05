module Cms
  class AgentConstraint
    def matches?(request)
      request.env["ss.domain"] == "agent"
    end
  end
end
