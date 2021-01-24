FactoryBot.define do
  factory :ss_task, class: SS::Task do
    name { "name-#{unique_id}" }
    state { %w(stop start running completed failed).sample }
  end
end
