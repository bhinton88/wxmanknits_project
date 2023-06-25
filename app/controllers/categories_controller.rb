class CategoriesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

  before_action :authorize

  skip_before_action :authorize, only: :index

  def index 
    categories_with_items = Category.all
    render json: categories_with_items 
  end

  private
  
  def authorize
    render json: {errors: ["Not authorized"]}, status: :unauthorized unless session.include? :user_id
  end

  def handle_record_not_found
    render json: {errors: ["User not found"]}, status: :not_found
  end

end
