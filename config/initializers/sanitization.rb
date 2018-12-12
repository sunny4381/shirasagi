if SS.config.ss.sanitization.present? && SS.config.ss.sanitization["allowed_protocols"].present?
  SS.config.ss.sanitization["allowed_protocols"].each do |protocol|
    Loofah::HTML5::WhiteList::ALLOWED_PROTOCOLS.add(protocol)
  end
end
