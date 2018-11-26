module Cms::Addon::Form::Page
  extend ActiveSupport::Concern
  extend SS::Addon

  included do
    belongs_to :form, class_name: 'Cms::Form'
    embeds_many :column_values, class_name: 'Cms::Column::Value::Base', cascade_callbacks: true,
                after_add: :update_column_values_updated, after_remove: :update_column_values_updated
    field :column_values_updated, type: DateTime

    permit_params :form_id, column_values: [ :_type, :column_id, :order, :value, :date, :file_id, values: [] ]
    accepts_nested_attributes_for :column_values

    # delegate :build_column_values, to: :form

    # validate :validate_column_values
    validates_associated :column_values

    before_save :delete_unlinked_files

    after_generate_file :generate_public_files, if: ->{ serve_static_relation_files? } if respond_to?(:after_generate_file)
    after_remove_file :remove_public_files if respond_to?(:after_remove_file)
    after_merge_branch :merge_column_values rescue nil
  end

  private

  def generate_public_files
    column_values.each do |column_value|
      column_value.generate_public_files
    end
  end

  def remove_public_files
    column_values.each do |column_value|
      column_value.remove_public_files
    end
  end

  def merge_column_values
    update_column_values(in_branch.column_values.presence || [])
    in_branch.column_values = []
  end

  def update_column_values_updated(*_args)
    self.column_values_updated = Time.zone.now
  end

  def column_values_was
    docs = attribute_was("column_values")

    if docs.present?
      docs = docs.map do |doc|
        Mongoid::Factory.build(Cms::Column::Value::Base, doc)
      end
    end

    docs || []
  end

  def delete_unlinked_files
    file_ids_is = []
    self.column_values.each do |column_value|
      if column_value.respond_to?(:file_id) && column_value.file_id.present?
        file_ids_is << column_value.file_id
      end
      if column_value.respond_to?(:file_ids) && column_value.file_ids.present?
        file_ids_is += column_value.file_ids
      end
    end

    file_ids_was = []
    column_values_was.each do |column_value|
      if column_value.respond_to?(:file_id) && column_value.file_id
        file_ids_was << column_value.file_id
      end
      if column_value.respond_to?(:file_ids) && column_value.file_ids.present?
        file_ids_was += column_value.file_ids
      end
    end

    unlinked_file_ids = file_ids_was - file_ids_is
    unlinked_file_ids.each_slice(20) do |file_ids|
      SS::File.in(id: file_ids).destroy_all
    end
  end
end
