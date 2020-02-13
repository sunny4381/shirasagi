class Gws::Schedule::Remote::Account
  include SS::Document
  include Gws::Reference::User
  include Gws::Reference::Site
  include Gws::Addon::Schedule::Remote::IcsCalendar
  include Gws::Addon::Schedule::Remote::CalDavCalendar
  include Gws::Addon::Schedule::Remote::GoogleCalendar
  include Gws::Addon::Member
  include Gws::SitePermission

  member_ids_optional
  set_permission_name "gws_schedule_calendars", :edit

  CALENDARS = {
    ics: { addons: [ Gws::Addon::Schedule::Remote::IcsCalendar ].freeze }.freeze,
    cal_dav: { addons: [ Gws::Addon::Schedule::Remote::CalDavCalendar ].freeze }.freeze,
    google: { addons: [ Gws::Addon::Schedule::Remote::GoogleCalendar ].freeze }.freeze
  }.freeze

  field :name, type: String
  field :description, type: String
  field :calendar_model, type: String

  permit_params :name, :description, :calendar_model

  validates :name, presence: true, length: { maximum: 80 }
  validates :description, length: { maximum: 400 }
  validates :calendar_model, presence: true, inclusion: { in: CALENDARS.keys.map(&:to_s) }

  class << self
    def search(params = nil)
      all.search_keyword(params)
    end

    def search_keyword(params = nil)
      return all if params.blank? || params[:keyword].blank?

      all.keyword_in(params[:keyword], :name)
    end

    def calendar_models
      CALENDARS.keys.map do |type|
        calendar_model(type)
      end
    end

    def calendar_model(type)
      {
        type: type,
        name: I18n.t("gws/schedule.calendars.#{type}.name"),
        text: I18n.t("gws/schedule.calendars.#{type}.text")
      }
    end

    def calendar_addons(type)
      return [] if type.blank?

      type = type.to_sym
      return [] unless CALENDARS.key?(type)

      calendar = CALENDARS[type.to_sym]
      addons = calendar[:addons] || []
      self.addons.select do |addon|
        addon.type.nil? || addons.include?(addon.klass)
      end
    end
  end

  def calendar_model_options
    CALENDARS.keys.map do |type|
      [ I18n.t("gws/schedule.calendars.#{type}.name"), type.to_s ]
    end
  end
end
