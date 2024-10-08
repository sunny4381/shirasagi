FactoryBot.define do
  factory :gws_workflow2_file, class: Gws::Workflow2::File do
    cur_site { gws_site }
    cur_user { gws_user }

    name { "name-#{unique_id}" }
    # text { "text-#{unique_id}" }
    # file_ids { [ create(:ss_temp_file).id ] }

    destination_treat_state do
      if destination_group_ids.blank? && destination_user_ids.blank?
        "no_need_to_treat"
      else
        "untreated"
      end
    end
  end
end
