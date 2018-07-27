class UsersController < ApplicationController
  def index
    @items = User.all
  end

  def new
    @item = User.new
  end

  def create
    @item = User.new(params.require(:item).permit(:name, :email))
    @item.save
    redirect_to({ action: :index }, { notice: "作成しました。" })
  end

  def show
    @item = User.find(params[:id])
  end

  def edit
    @item = User.find(params[:id])
  end

  def update
    @item = User.find(params[:id])
    @item.attributes = params.require(:item).permit(:name, :email)
    @item.save
    redirect_to({ action: :show }, { notice: "保存しました。" })
  end
end
