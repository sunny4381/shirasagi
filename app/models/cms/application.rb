class Cms::Application
  def self.instance
    @instance ||= new
  end

  class RouteSet
    def node_routes
      @node_routes ||= {}
    end

    def page_routes
      @page_routes ||= {}
    end

    def part_routes
      @part_routes ||= {}
    end

    def node(route, &block)
      node_routes[route] ||= ActionDispatch::Routing::RouteSet.new_with_config(Rails.application.config)
      node_routes[route].draw(&block)
    end

    def page(route, &block)
      page_routes[route] ||= ActionDispatch::Routing::RouteSet.new_with_config(Rails.application.config)
      page_routes[route].draw(&block)
    end

    def part(route, &block)
      part_routes[route] ||= ActionDispatch::Routing::RouteSet.new_with_config(Rails.application.config)
      part_routes[route].draw(&block)
    end
  end

  def routes
    @routes ||= Cms::Application::RouteSet.new
  end

  def find_node_route(page)
    routes.node_routes[page.route]
  end

  def find_page_route(page)
    routes.page_routes[page.route]
  end

  def find_part_route(page)
    routes.part_routes[page.route]
  end

  def call(*args, &block)
    Rails.logger.debug("Cms::Application#call")
    raise NotImplementedError
  end
end
