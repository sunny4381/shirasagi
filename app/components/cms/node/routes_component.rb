class Cms::Node::RoutesComponent < ApplicationComponent
  def initialize(cur_site:)
    super()
    @cur_site = cur_site
  end

  def items
    @items ||= begin
      items = {}
      Cms::Node.new.route_options.each do |name, path|
        mod = path.sub(/\/.*/, '')
        items[mod] = { name: t("modules.#{mod}"), items: [] } if !items[mod]
        items[mod][:items] << [ name.sub(/.*\//, ""), path ]
      end
      items
    end
  end

  def trusted_url?(url)
    url = ::Addressable::URI.parse(url.to_s)

    known_trusted_urls = []
    if @cur_site.present? && @cur_site.respond_to?(:domain_with_subdir)
      domain_with_subdir = @cur_site.domain_with_subdir
      if domain_with_subdir.present?
        known_trusted_urls << "//#{domain_with_subdir}"
      end
    end

    Sys::TrustedUrlValidator.valid_url?(url, known_trusted_urls)
  end

  def trusted_url!(url)
    raise "untrusted url" unless trusted_url?(url)
    url
  end
end
