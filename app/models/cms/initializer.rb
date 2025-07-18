module Cms
  class Initializer
    Cms::Node.plugin "cms/node"
    Cms::Node.plugin "cms/page"
    Cms::Node.plugin "cms/import_node"
    Cms::Node.plugin "cms/archive"
    Cms::Node.plugin "cms/photo_album"
    Cms::Node.plugin "cms/group_page"
    Cms::Node.plugin "cms/site_search"
    Cms::Node.plugin "cms/line_hub"
    Cms::Node.plugin "cms/form_search"
    Cms::Part.plugin "cms/site_search_history"
    Cms::Part.plugin "cms/history_list"
    Cms::Part.plugin "cms/free"
    Cms::Part.plugin "cms/node"
    Cms::Part.plugin "cms/node2"
    Cms::Part.plugin "cms/page"
    Cms::Part.plugin "cms/tabs"
    Cms::Part.plugin "cms/crumb"
    Cms::Part.plugin "cms/sns_share"
    Cms::Part.plugin "cms/calendar_nav"
    Cms::Part.plugin "cms/monthly_nav"
    Cms::Part.plugin "cms/site_search_keyword"
    Cms::Part.plugin "cms/print"
    Cms::Part.plugin "cms/clipboard_copy"
    Cms::Column.plugin 'cms/text_field'
    Cms::Column.plugin 'cms/date_field'
    Cms::Column.plugin 'cms/url_field2'
    Cms::Column.plugin 'cms/text_area'
    Cms::Column.plugin 'cms/select'
    Cms::Column.plugin 'cms/radio_button'
    Cms::Column.plugin 'cms/check_box'
    Cms::Column.plugin 'cms/file_upload'
    Cms::Column.plugin 'cms/headline'
    Cms::Column.plugin 'cms/list'
    Cms::Column.plugin 'cms/youtube'
    Cms::Column.plugin 'cms/free'
    Cms::Column.plugin 'cms/table'
    Cms::Column.plugin 'cms/select_page'

    Cms::Role.permission :edit_cms_sites
    Cms::Role.permission :edit_cms_groups
    Cms::Role.permission :edit_cms_users
    Cms::Role.permission :edit_cms_roles
    Cms::Role.permission :edit_cms_members
    Cms::Role.permission :edit_cms_editor_templates
    Cms::Role.permission :edit_cms_loop_settings
    Cms::Role.permission :read_cms_body_layouts
    Cms::Role.permission :edit_cms_body_layouts
    Cms::Role.permission :delete_cms_body_layouts
    Cms::Role.permission :read_cms_commands
    Cms::Role.permission :edit_cms_commands
    Cms::Role.permission :delete_cms_commands
    Cms::Role.permission :use_cms_commands
    Cms::Role.permission :use_cms_tools
    Cms::Role.permission :use_cms_editor_extensions
    Cms::Role.permission :use_other_cms_files
    Cms::Role.permission :read_cms_generate_lock
    Cms::Role.permission :edit_cms_generate_lock
    Cms::Role.permission :read_other_cms_nodes
    Cms::Role.permission :read_other_cms_pages
    Cms::Role.permission :read_other_cms_parts
    Cms::Role.permission :read_other_cms_layouts
    Cms::Role.permission :read_other_cms_files
    Cms::Role.permission :read_other_cms_notices
    Cms::Role.permission :read_other_cms_page_searches
    Cms::Role.permission :read_other_cms_forms
    Cms::Role.permission :read_private_cms_nodes
    Cms::Role.permission :read_private_cms_pages
    Cms::Role.permission :read_private_cms_parts
    Cms::Role.permission :read_private_cms_layouts
    Cms::Role.permission :read_private_cms_files
    Cms::Role.permission :read_private_cms_notices
    Cms::Role.permission :read_private_cms_page_searches
    Cms::Role.permission :read_private_cms_forms
    Cms::Role.permission :edit_other_cms_nodes
    Cms::Role.permission :edit_other_cms_pages
    Cms::Role.permission :edit_other_cms_parts
    Cms::Role.permission :edit_other_cms_layouts
    Cms::Role.permission :edit_other_cms_files
    Cms::Role.permission :edit_other_cms_notices
    Cms::Role.permission :edit_other_cms_page_searches
    Cms::Role.permission :edit_other_cms_forms
    Cms::Role.permission :edit_private_cms_nodes
    Cms::Role.permission :edit_private_cms_pages
    Cms::Role.permission :edit_private_cms_parts
    Cms::Role.permission :edit_private_cms_layouts
    Cms::Role.permission :edit_private_cms_files
    Cms::Role.permission :edit_private_cms_notices
    Cms::Role.permission :edit_private_cms_page_searches
    Cms::Role.permission :edit_private_cms_forms
    Cms::Role.permission :delete_other_cms_nodes
    Cms::Role.permission :delete_other_cms_pages
    Cms::Role.permission :delete_other_cms_parts
    Cms::Role.permission :delete_other_cms_layouts
    Cms::Role.permission :delete_other_cms_files
    Cms::Role.permission :delete_other_cms_notices
    Cms::Role.permission :delete_other_cms_page_searches
    Cms::Role.permission :delete_other_cms_forms
    Cms::Role.permission :delete_private_cms_nodes
    Cms::Role.permission :delete_private_cms_pages
    Cms::Role.permission :delete_private_cms_parts
    Cms::Role.permission :delete_private_cms_layouts
    Cms::Role.permission :delete_private_cms_files
    Cms::Role.permission :delete_private_cms_notices
    Cms::Role.permission :delete_private_cms_page_searches
    Cms::Role.permission :delete_private_cms_forms
    Cms::Role.permission :release_other_cms_pages
    Cms::Role.permission :release_private_cms_pages
    Cms::Role.permission :close_other_cms_pages
    Cms::Role.permission :close_private_cms_pages
    Cms::Role.permission :approve_other_cms_pages
    Cms::Role.permission :approve_private_cms_pages
    Cms::Role.permission :reroute_other_cms_pages
    Cms::Role.permission :reroute_private_cms_pages
    Cms::Role.permission :revoke_other_cms_pages
    Cms::Role.permission :revoke_private_cms_pages
    Cms::Role.permission :move_private_cms_nodes
    Cms::Role.permission :move_private_cms_pages
    Cms::Role.permission :move_other_cms_nodes
    Cms::Role.permission :move_other_cms_pages
    Cms::Role.permission :import_private_cms_nodes
    Cms::Role.permission :import_other_cms_nodes
    Cms::Role.permission :unlock_other_cms_pages
    Cms::Role.permission :use_cms_all_contents
    Cms::Role.permission :use_cms_page_twitter_posts
    Cms::Role.permission :use_cms_page_line_posts
    if SS.config.michecker && SS.config.michecker['disable'].blank?
      Cms::Role.permission :use_cms_michecker
    end
    Cms::Role.permission :delete_cms_ignore_alert
    Cms::Role.permission :edit_cms_ignore_alert
    if SS.config.cms.cms_sitemap && SS.config.cms.cms_sitemap['disable'].blank?
      Cms::Role.permission :use_cms_sitemap
    end
    Cms::Role.permission :read_cms_image_resizes
    Cms::Role.permission :edit_cms_image_resizes
    Cms::Role.permission :delete_cms_image_resizes
    Cms::Role.permission :disable_cms_image_resizes
    Cms::Role.permission :edit_cms_ignore_syntax_check
    Cms::Role.permission :edit_cms_page_expiration_settings

    Cms::Role.permission :use_other_cms_line_messages, module_name: 'cms/line'
    Cms::Role.permission :use_private_cms_line_messages, module_name: 'cms/line'
    Cms::Role.permission :use_cms_line_deliver_categories, module_name: 'cms/line'
    Cms::Role.permission :use_cms_line_services, module_name: 'cms/line'
    Cms::Role.permission :use_other_cms_line_mail_handlers, module_name: 'cms/line'
    Cms::Role.permission :use_private_cms_line_mail_handlers, module_name: 'cms/line'
    Cms::Role.permission :use_other_cms_line_statistics, module_name: 'cms/line'
    Cms::Role.permission :use_private_cms_line_statistics, module_name: 'cms/line'

    Cms::Role.permission :use_cms_check_links, module_name: 'cms/check_links'
    Cms::Role.permission :run_cms_check_links, module_name: 'cms/check_links'
    Cms::Role.permission :read_other_cms_check_links_errors, module_name: 'cms/check_links'
    Cms::Role.permission :read_private_cms_check_links_errors, module_name: 'cms/check_links'
    Cms::Role.permission :edit_cms_check_links_ignore_urls, module_name: 'cms/check_links'

    Cms::Role.permission :edit_cms_user_profile, module_name: 'cms/user_profile'
    Cms::Role.permission :edit_password_cms_user_profile, module_name: 'cms/user_profile'

    SS::File.model "cms/editor_template", SS::File
    SS::File.model "cms/file", Cms::File
    SS::File.model "cms/page", SS::File
  end
end
