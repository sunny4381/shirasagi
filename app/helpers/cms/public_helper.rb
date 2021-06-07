module Cms::PublicHelper
  def cms_agent_paginate(scope)
    paginate(scope, paginator_class: Cms::Agent::Paginator)
  end

  def body_id(path)
    "body-" + path.to_s.sub(/\/$/, "/index").sub(/\.html$/, "").gsub(/[^\w-]+/, "-")
  end

  def body_class(path)
    prefix = "body-"
    nodes  = path.to_s.sub(/\/[^\/]+\.html$/, "").sub(/^\//, "").split("/")
    nodes  = nodes.map { |node| prefix = "#{prefix}-" + node.gsub(/[^\w-]+/, "-") }
    nodes.join(" ")
  end
end
