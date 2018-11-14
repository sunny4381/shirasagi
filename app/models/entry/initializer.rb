module Entry
  class Initializer
    Cms::Node.plugin "entry/page"

    Cms::Role.permission :read_other_entry_pages
    Cms::Role.permission :read_private_entry_pages
    Cms::Role.permission :edit_other_entry_pages
    Cms::Role.permission :edit_private_entry_pages
    Cms::Role.permission :delete_other_entry_pages
    Cms::Role.permission :delete_private_entry_pages
    Cms::Role.permission :release_other_entry_pages
    Cms::Role.permission :release_private_entry_pages
    Cms::Role.permission :approve_other_entry_pages
    Cms::Role.permission :approve_private_entry_pages
    Cms::Role.permission :reroute_other_entry_pages
    Cms::Role.permission :reroute_private_entry_pages
    Cms::Role.permission :revoke_other_entry_pages
    Cms::Role.permission :revoke_private_entry_pages
    Cms::Role.permission :move_private_entry_pages
    Cms::Role.permission :move_other_entry_pages
    Cms::Role.permission :unlock_other_entry_pages
  end
end
