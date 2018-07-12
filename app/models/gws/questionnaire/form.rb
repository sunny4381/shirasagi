class Gws::Questionnaire::Form
  include SS::Document
  include Gws::Referenceable
  include Gws::Reference::User
  include Gws::Reference::Site
  include Gws::Addon::Contributor
  include Gws::Addon::Questionnaire::ColumnSetting
  include Gws::Addon::Questionnaire::Category
  include Gws::Addon::Questionnaire::FilesRef
  include Gws::Addon::ReadableSetting
  include Gws::Addon::GroupPermission
  include Gws::Addon::History
  include Gws::Questionnaire::AnswerState

  readable_setting_include_custom_groups
  permission_include_custom_groups

  field :name, type: String
  field :description, type: String
  field :order, type: Integer
  field :state, type: String, default: 'closed'
  field :memo, type: String

  field :release_date, type: DateTime
  field :close_date, type: DateTime

  field :anonymous_state, type: String, default: 'disabled'
  field :file_state, type: String

  permit_params :name, :description, :order, :memo, :release_date, :close_date, :anonymous_state
  permit_params :file_state

  validates :name, presence: true, length: { maximum: 80 }
  validates :order, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 999_999, allow_blank: true }
  validates :state, presence: true, inclusion: { in: %w(public closed), allow_blank: true }
  validates :anonymous_state, inclusion: { in: %w(disabled enabled), allow_blank: true }
  validates :file_state, inclusion: { in: %w(closed public), allow_blank: true }

  scope :and_public, ->(date = Time.zone.now) {
    date = date.dup
    where("$and" => [
      { state: "public" },
      { "$or" => [ { release_date: nil }, { :release_date.lte => date } ] },
      { "$or" => [ { close_date: nil }, { :close_date.gt => date } ] },
    ])
  }

  class << self
    def search(params)
      criteria = all
      return criteria if params.blank?

      criteria = criteria.search_keyword(params)
      criteria = criteria.search_category(params)
      criteria = criteria.search_categories(params)
      criteria = criteria.search_answer_state(params)
      criteria
    end

    def search_keyword(params)
      return all if params[:keyword].blank?
      all.keyword_in(params[:keyword], :name, :description)
    end

    def search_category(params)
      return all if params.blank? || params[:category_id].blank?
      all.where(category_ids: params[:category_id].to_i)
    end

    def search_categories(params)
      category_ids = [ params[:category_ids].presence ].flatten.compact.select(&:present?)
      return all if category_ids.blank?

      category_ids = category_ids.map(&:to_i)
      all.in(category_ids: category_ids)
    end

    def search_answer_state(params)
      return all if params.blank? || params[:answered_state].blank?
      case params[:answered_state]
      when 'answered'
        all.and_answered(params[:user])
      when 'unanswered'
        all.and_unanswered(params[:user])
      when 'both'
        all
      else
        none
      end
    end
  end

  def state_options
    %w(closed public).map { |m| [I18n.t("ss.options.state.#{m}"), m] }
  end

  def closed?
    !public?
  end

  def public?
    state == 'public'
  end

  def anonymous_state_options
    %w(disabled enabled).map { |m| [I18n.t("ss.options.state.#{m}"), m] }
  end

  def anonymous?
    anonymous_state == 'enabled'
  end

  def file_state_options
    %w(closed public).map { |m| [I18n.t("ss.options.state.#{m}"), m] }
  end

  def file_closed?
    !file_public?
  end

  def file_public?
    file_state == 'public'
  end
end
