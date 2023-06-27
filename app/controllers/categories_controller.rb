class CategoriesController < ApplicationController

  def index 
    categories_with_items = Category.all
    render json: categories_with_items 
  end

end
