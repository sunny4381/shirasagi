def capture_line_bot_client(options = {})

  capture = OpenStruct.new

  broadcast_response = proc do |capture|
    OpenStruct.new(code: "200", body: "{}")
  end
  multicast_response = proc do |capture|
    OpenStruct.new(code: "200", body: "{}")
  end
  broadcast_response = options[:broadcast_response] if options[:broadcast_response]
  multicast_response = options[:multicast_response] if options[:multicast_response]

  # deliver
  capture.broadcast = OpenStruct.new(count: 0)
  allow_any_instance_of(Line::Bot::Client).to receive(:broadcast) do |*args|
    capture.broadcast.count += 1
    capture.broadcast.messages = args[1]
    broadcast_response.call(capture)
  end
  capture.multicast = OpenStruct.new(count: 0)
  allow_any_instance_of(Line::Bot::Client).to receive(:multicast) do |*args|
    capture.multicast.count += 1
    capture.multicast.user_ids = args[1]
    capture.multicast.messages = args[2]
    multicast_response.call(capture)
  end

  # statistics
  capture.get_aggregation_info = OpenStruct.new(count: 0)
  allow_any_instance_of(Line::Bot::Client).to receive(:get_aggregation_info) do |*args|
    capture.get_aggregation_info.count += 1
    OpenStruct.new(code: "200", body: "{\"numOfCustomAggregationUnits\":\"0\"}")
  end
  capture.get_user_interaction_statistics = OpenStruct.new(count: 0)
  allow_any_instance_of(Line::Bot::Client).to receive(:get_user_interaction_statistics) do |*args|
    capture.get_user_interaction_statistics.count += 1
    OpenStruct.new(code: "200", body: "{\"overview\":\"null\"}")
  end
  capture.get_statistics_per_unit = OpenStruct.new(count: 0)
  allow_any_instance_of(Line::Bot::Client).to receive(:get_statistics_per_unit) do |*args|
    capture.get_statistics_per_unit.count += 1
    OpenStruct.new(code: "200", body: "{\"overview\":\"null\"}")
  end

  # richmenu
  capture.create_rich_menu = OpenStruct.new(count: 0)
  allow_any_instance_of(Line::Bot::Client).to receive(:create_rich_menu) do |*args|
    capture.create_rich_menu.count += 1
    capture.create_rich_menu.rich_menu = args[1]
    OpenStruct.new(code: "200", body: { richMenuId: "richMenuId-#{capture.create_rich_menu.count}" }.to_json)
  end
  capture.create_rich_menu_image = OpenStruct.new(count: 0)
  allow_any_instance_of(Line::Bot::Client).to receive(:create_rich_menu_image) do |*args|
    capture.create_rich_menu_image.count += 1
    capture.create_rich_menu_image.rich_menu_id = args[1]
    capture.create_rich_menu_image.file = args[2]
    OpenStruct.new(code: "200", body: "{}")
  end
  capture.get_rich_menus_alias_list = OpenStruct.new(count: 0)
  allow_any_instance_of(Line::Bot::Client).to receive(:get_rich_menus_alias_list) do |*args|
    capture.get_rich_menus_alias_list.count += 1
    OpenStruct.new(code: "200", body: { aliases: capture.set_rich_menus_alias.alias }.to_json)
  end
  capture.set_rich_menus_alias = OpenStruct.new(count: 0, alias: [])
  allow_any_instance_of(Line::Bot::Client).to receive(:set_rich_menus_alias) do |*args|
    capture.set_rich_menus_alias.count += 1
    capture.set_rich_menus_alias.rich_menu_id = args[1]
    capture.set_rich_menus_alias.rich_menu_alias_id = args[2]
    capture.set_rich_menus_alias.alias << { "richMenuId" => args[1], "richMenuAliasId" => args[2] }
    OpenStruct.new(code: "200", body: "{}")
  end
  capture.update_rich_menus_alias = OpenStruct.new(count: 0)
  allow_any_instance_of(Line::Bot::Client).to receive(:update_rich_menus_alias) do |*args|
    capture.update_rich_menus_alias.count += 1
    capture.update_rich_menus_alias.rich_menu_id = args[1]
    capture.update_rich_menus_alias.rich_menu_alias_id = args[2]
    OpenStruct.new(code: "200", body: "{}")
  end
  capture.set_default_rich_menu = OpenStruct.new(count: 0)
  allow_any_instance_of(Line::Bot::Client).to receive(:set_default_rich_menu) do |*args|
    capture.set_default_rich_menu.count += 1
    capture.set_default_rich_menu.rich_menu_id = args[1]
    OpenStruct.new(code: "200", body: "{}")
  end
  capture.bulk_link_rich_menus = OpenStruct.new(count: 0)
  allow_any_instance_of(Line::Bot::Client).to receive(:bulk_link_rich_menus) do |*args|
    capture.bulk_link_rich_menus.count += 1
    capture.bulk_link_rich_menus.user_ids = args[1]
    capture.bulk_link_rich_menus.line_richmenu_id = args[2]
    OpenStruct.new(code: "200", body: "{}")
  end
  capture.bulk_unlink_rich_menus = OpenStruct.new(count: 0)
  allow_any_instance_of(Line::Bot::Client).to receive(:bulk_unlink_rich_menus) do |*args|
    capture.bulk_unlink_rich_menus.count += 1
    capture.bulk_unlink_rich_menus.user_ids = args[1]
    OpenStruct.new(code: "200", body: "{}")
  end
  capture.delete_rich_menu = OpenStruct.new(count: 0)
  allow_any_instance_of(Line::Bot::Client).to receive(:delete_rich_menu) do |*args|
    capture.delete_rich_menu.count += 1
    capture.delete_rich_menu.rich_menu_id = args[1]
    OpenStruct.new(code: "200", body: "{}")
  end

  yield(capture)
end
