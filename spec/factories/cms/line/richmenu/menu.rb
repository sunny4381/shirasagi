FactoryBot.define do
  factory :cms_line_richmenu_menu, class: Cms::Line::Richmenu::Menu do
    site { cms_site }
    user { cms_user }
    name { unique_id }
    chat_bar_text { unique_id }
  end
end
