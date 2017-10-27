class Sns::Apis::TempFilesController < ApplicationController
  include Sns::UserFilter
  include Sns::CrudFilter
  include SS::FileFilter
  include SS::AjaxFileFilter

  model SS::TempFile

  private

  def fix_params
    { cur_user: @cur_user }
  end

  public

  def meta
    item = @model.new(name: params[:name], filename: params[:name], size: params[:size])

    if item.valid?
      render json: { attributes: { name: item.name, filename: SS::FilenameConvertor.convert(item.filename), content_type: item.content_type, is_image: item.image? } }
    else
      render json: { errors: item.errors.full_messages }, status: 400
    end
  end
end
