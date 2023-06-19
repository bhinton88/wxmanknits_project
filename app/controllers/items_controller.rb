class ItemsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid_data
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

  before_action :authorize, :has_admin_rights, :find_item
  
  skip_before_action :find_item, only: [:create, :index]

  skip_before_action :authorize, :has_admin_rights, only: :index

  def index
    items = Item.all
    render json: items
  end

  def create
    item = Item.create!(item_params)
    render json: item, status: :created
  end

  def update
  #  if we want to update the price of an item, we must create a new price_ID and associate it with the product
    if ((params[:price] != @item.price) && params[:description])
      updated_price = convert_currency(params[:price])
      @item.create_new_price_id_update_description(updated_price, params[:description])
      @item.update!(item_params)
      render json: @item, status: :ok
    else
      @item.update_stripe_item(params[:description])
      @item.update!(item_params)
      render json: @item, status: :ok
    end
  end

  def destroy
    @item.remove_stripe_item
    @item.destroy
    head :no_content
  end


  private

  def convert_currency(price)
    stripe_price = (price * 100).to_i
  end

  def handle_invalid_data(invalid)
    render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end
  
  def handle_record_not_found
    render json: {errors: ["User not found"]}, status: :not_found
  end

  def item_params
    params.permit(:item_name, :price, :description, :quantity_available, :category_id, :photo_url )
  end

  def authorize
    render json: {errors: ["Not authorized"]}, status: :unauthorized unless session.include? :user_id
  end

  # we want to make sure that if the current user does NOT have admin rights, that they are unable
  #  to update items 
  def has_admin_rights
    user = User.find_by(id: session[:user_id])
    if !user.admin_rights
      render json: {errors: ["Not authorized"]}, status: :unauthorized 
    end
  end

  def find_item
    @item = Item.find_by(id: params[:id])
  end
end
