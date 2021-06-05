module Cms::PublicFilter::Agent
  extend ActiveSupport::Concern
  include SS::ImplicitRenderFilter

  private

  def recognize_path(path, env = {})
    env[:method] ||= request.request_method rescue "GET"
    Rails.application.routes.recognize_path(path, env) rescue {}
  end

  def recognize_agent(path, env = {})
    spec = recognize_path path, env
    spec[:cell] ? spec : nil
  end

  def write_file(item, data, opts = {})
    file = opts[:file] || item.path

    Fs.write_if_modified(file, data)
  end
end
