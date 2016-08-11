module Inquiry::Addon
  module FeedbackSetting
    extend ActiveSupport::Concern
    extend SS::Addon

    included do
      field :upper_html, type: String
      field :lower_html, type: String
      field :feedback_confirmation, type: String, default: "enabled"
      field :amp_state, type: String
      permit_params :upper_html, :lower_html, :feedback_confirmation
      permit_params :amp_state
    end

    def feedback_confirmation_options
      %w(enabled disabled).map do |w|
        [I18n.t("inquiry.options.state.#{w}"), w]
      end
    end

    def feedback_confirmation_enabled?
      feedback_confirmation == 'enabled'
    end

    def feedback_confirmation_disabled?
      !feedback_confirmation_enabled?
    end

    def amp_state_options
      %w(disabled enabled).map do |w|
        [I18n.t("inquiry.options.state.#{w}"), w]
      end
    end

    def amp_state_enabled?
      amp_state == 'enabled'
    end
  end
end
