class MicropostsController < ApplicationController
  layout "layout"

  def index
    @items = Micropost.all.page(params[:page]).per(50)
  end

  def new
    @item = Micropost.new
  end

  def create
    @item = Micropost.new(params.require(:item).permit(:content, :user_id))
    if @item.save
      redirect_to({ action: :index }, { notice: "作成しました。" })
    else
      # 失敗した
      render action: :new
    end
  end

  def show
    @item = Micropost.all.find(params[:id])
  end

  def edit
    @item = Micropost.all.find(params[:id])
  end

  def update
    @item = Micropost.all.find(params[:id])
    @item.attributes = params.require(:item).permit(:content, :user_id)
    if @item.save
      redirect_to({ action: :show }, { notice: "保存しました。" })
    else
      render action: :edit
    end
  end

  def destroy
    @item = Micropost.all.find(params[:id])
    @item.destroy
    redirect_to({ action: :index }, { notice: "削除しました。" })
  end
end
