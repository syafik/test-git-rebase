class ItemsController < ApplicationController
  before_filter :authenticate_user!
  respond_to :json

  def index
    respond_with(@items = Item.all)
  end

  def show
    @item = Item.find(params[:id])
    respond_with(@item)
  end

  def new
    @item = Item.new

    respond_to do |format|
      format.json { render json: @item }
    end
  end

  def edit
    @item = Item.find(params[:id])
  end

  def create
    @item = Item.new(params[:item])

    respond_to do |format|
      if @item.save
        format.json { render json: @item, status: :created, location: @item }
      else
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @item = Item.find(params[:id])

    respond_to do |format|
      if @item.update_attributes(params[:item])
        format.json { head :no_content }
      else
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end
end
