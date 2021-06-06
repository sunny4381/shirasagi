module Cms::Agent
  class Context
    include ActiveModel::Model

    attr_accessor :site, :domain
    attr_accessor :filters
    attr_accessor :node, :page, :part
    attr_accessor :task
    attr_accessor :path, :main_path

    def initialize(*args)
      super
      @filters ||= []
    end

    def filter_include?(key)
      filters.any? { |f| f == key || f.is_a?(Hash) && f.key?(key) }
    end

    def filter_options(key)
      found = filters.find { |f| f == key || f.is_a?(Hash) && f.key?(key) }
      return if found.nil?
      return found[key] if found.is_a?(Hash)
      true
    end

    def mobile_path?
      filter_include?(:mobile)
    end
  end
end
