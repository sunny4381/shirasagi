class UrlValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    return if value.blank?

    url = ::URI.parse(value) rescue nil
    if url.blank?
      record.errors.add(attribute, options[:message] || :url)
      return
    end

    allowed_schemes = Array(@options[:scheme])
    return if allowed_schemes.blank?

    unless allowed_schemes.include?(url.scheme)
      record.errors.add(attribute, options[:message] || :scheme_now_allowed)
      return
    end
  end
end
