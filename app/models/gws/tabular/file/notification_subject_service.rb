#frozen_string_literal: true

class Gws::Tabular::File::NotificationSubjectService

  SUBJECT_TEMPLATE_MAP = {
    workflow_request: "gws_notification.gws/workflow/file.request",
    workflow_approve: "gws_notification.gws/workflow/file.approve",
    workflow_remand: "gws_notification.gws/workflow/file.remand",
    workflow_circular: "gws_notification.gws/workflow/file.circular",
    workflow_comment: "gws_notification.gws/workflow/file.comment",
    workflow_destination: "gws_notification.gws/workflow/file.destination",
    workflow_cancel: "gws_notification.gws/workflow/file.cancel"
  }.freeze

  attr_accessor :site, :item, :type

  def initialize(site, item, type)
    self.site = site
    self.item = item
    self.type = type
  end

  def call
    template = SUBJECT_TEMPLATE_MAP[type]
    title = Gws::Tabular.item_title(item, site: site)
    title = title.try(:strip).presence
    unless template
      return title || item.id.to_s
    end

    I18n.t(template, name: title || item.id.to_s)
  end
end
