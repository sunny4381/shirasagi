module Gws::Addon::System::MenuSetting
  extend ActiveSupport::Concern
  extend SS::Addon

  set_addon_type :organization

  included do
    %w(portal notice reminder presence schedule todo affair daily_report attendance bookmark memo board
       faq qna workload report workflow2 circular monitor survey share shared_address personal_address
       staff_record links discussion tabular).each do |name|
      define_menu_setting(name)
    end
    define_menu_setting('contrast', default_state: 'hide')
    define_menu_setting('elasticsearch', default_state: 'hide')
    define_menu_setting('workflow', default_state: 'hide')
    define_menu_setting('conf')
  end

  module ClassMethods
    def define_menu_setting(name, options = {})
      field "menu_#{name}_state", type: String, default: options[:default_state]
      field "menu_#{name}_label", type: String, localize: true
      field "menu_#{name}_icon_image_id", type: BSON::ObjectId
      belongs_to_file "menu_#{name}_icon_image", class_name: "SS::File", accepts: SS::File::IMAGE_FILE_EXTENSIONS + [".svg"]
      permit_params "menu_#{name}_state", "menu_#{name}_label", "menu_#{name}_icon_image_id"
      alias_method("menu_#{name}_state_options", "menu_state_options")

      if !options[:define_visible]
        define_method("menu_#{name}_visible?") do
          menu_visible?(name)
        end
      end
    end
  end

  def menu_state_options
    %w(show hide).map { |k| [I18n.t("ss.options.state.#{k}"), k] }
  end

  def menu_visible?(name)
    try("menu_#{name}_state") != 'hide'
  end
end
