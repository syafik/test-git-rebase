class FoodsController < ApplicationController
  before_filter :authenticate_user!
  respond_to :json

  def index
    @foods = Food.all
    respond_with(@foods)
  end

  def show
    @food = Food.find(params[:id])
    respond_with(@food)
  end

  def edit
    @food = Food.find(params[:id])
  end

  def create
    @food = Food.new(params[:food])
    @food.save
    respond_with(@food)
  end

  def update
    @food = Food.find(params[:id])

    respond_to do |format|
      if @food.update_attributes(params[:food])
        format.json { head :no_content }
      else
        format.json { render json: @food.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @food = Food.find(params[:id])
    @food.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end
end
