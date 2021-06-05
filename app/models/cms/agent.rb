module Cms
  class Agent < ::Rails::Engine
    class << self
      def dispatch_node(controller, node)
        main_path = controller.instance_variable_get(:@cur_main_path)
        rest = main_path.sub(/^\/#{::Regexp.escape(node.filename)}/, "").sub(/\/index\.html$/, "")
        path = "nodes/#{node.route}#{rest}"

        request = controller.request
        env = request.env.dup
        env[Rack::PATH_INFO] = path
        env["ss.domain"] = "agent"
        env["ss.node"] = node
        env["ss.site"] = controller.instance_variable_get(:@cur_site)
        env["ss.path"] = controller.instance_variable_get(:@cur_path)
        env["ss.main_path"] = controller.instance_variable_get(:@cur_main_path)

        status, headers, body = instance.call(env)
        return false if "pass" == headers["X-Cascade"]

        new_response = ActionDispatch::Response.create(status, headers, body)
        new_response.commit!
        controller.set_response! new_response
        true
      end

      def dispatch_page(controller, page)
        # main_path = controller.instance_variable_get(:@cur_main_path)
        # rest = main_path.sub(/^\/#{::Regexp.escape(page.filename)}/, "").sub(/\/index\.html$/, "")
        # path = "pages/#{page.route}#{rest}"
        path = "pages/#{page.route}/#{page.basename}"

        request = controller.request
        env = request.env.dup
        env[Rack::PATH_INFO] = path
        env["ss.domain"] = "agent"
        env["ss.page"] = page
        env["ss.site"] = controller.instance_variable_get(:@cur_site)
        env["ss.path"] = controller.instance_variable_get(:@cur_path)
        env["ss.main_path"] = controller.instance_variable_get(:@cur_main_path)

        status, headers, body = instance.call(env)
        return false if "pass" == headers["X-Cascade"]

        new_response = ActionDispatch::Response.create(status, headers, body)
        new_response.commit!
        controller.set_response! new_response
        true
      end

      def dispatch_part(controller, part)
        # main_path = controller.instance_variable_get(:@cur_main_path)
        # rest = main_path.sub(/^\/#{::Regexp.escape(node.filename)}/, "").sub(/\/index\.html$/, "")
        # path = "parts/#{node.route}#{rest}"
        path = "parts/#{part.route}"

        request = controller.request
        env = request.env.dup
        env[Rack::PATH_INFO] = path
        env["ss.domain"] = "agent"
        env["ss.part"] = part
        env["ss.site"] = controller.instance_variable_get(:@cur_site)
        env["ss.path"] = controller.instance_variable_get(:@cur_path)
        env["ss.main_path"] = controller.instance_variable_get(:@cur_main_path)

        status, headers, body = instance.call(env)
        return false if "pass" == headers["X-Cascade"]

        new_response = ActionDispatch::Response.create(status, headers, body)
        new_response.commit!
        controller.set_response! new_response
        true
      end
    end
  end
end
