require 'kaminari/core'

module Kaminari
  module Helpers
    class Tag
      def page_url_for(page)
        if @options[:ss] && @options[:ss][:cur_path].present?
          path = @options[:ss][:cur_path]
          path = ::File.dirname(path) if path.ends_with?(".html")
          if page <= 1
            filename = "index.html"
          else
            filename = "index.p#{page}.html"
          end
          return ::File.join(path, filename)
        end

        params = params_for(page)
        params[:only_path] = true
        @template.url_for params
      end
    end
  end
end
