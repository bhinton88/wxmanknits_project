class OrdersController < ApplicationController

  
  def index
    user = User.find_by(id: session[:user_id])
    orders = user.orders.map do |order|
     order.update_payment_status
     order
    end

    render json: orders, status: :accepted
  end
  


end
