module Gws::Chat
  class Initializer
    Gws::Role.permission :read_other_gws_chat_rooms, module_name: 'gws/chat'
    Gws::Role.permission :read_private_gws_chat_rooms, module_name: 'gws/chat'
    Gws::Role.permission :edit_other_gws_chat_rooms, module_name: 'gws/chat'
    Gws::Role.permission :edit_private_gws_chat_rooms, module_name: 'gws/chat'
    Gws::Role.permission :delete_other_gws_chat_rooms, module_name: 'gws/chat'
    Gws::Role.permission :delete_private_gws_chat_rooms, module_name: 'gws/chat'
  end
end
