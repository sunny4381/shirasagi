class Cms::Agents::Tasks::Node::PhotoAlbumsController < ApplicationController
  include Cms::PublicFilter::Node

  def generate
    generate_node_with_pagination @node
    head :no_content
  end
end
