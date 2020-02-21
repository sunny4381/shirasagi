class Gws::Job::Apis::TasksController < ApplicationController
  include Gws::BaseFilter

  model Job::Task

  def status
    criteria = @model.group(@cur_site).user(@cur_user)
    @item = criteria.where(name: params[:id].to_s).first
    @item ||= criteria.where(id: params[:id].to_s).first

    if @item
      render json: { status: "ok", data: @item }, status: :ok
    else
      render json: { status: "not_found", error: "not found" }, status: :not_found
    end
  end
end
