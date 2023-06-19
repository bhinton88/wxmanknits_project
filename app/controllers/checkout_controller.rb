class CheckoutController < ApplicationController

  # this controller will handle the check out funtion and the linking to stripe 

  def create
    # we first find the customer so that we can provide that detail to the 
    # session object
    user = User.find(session[:user_id])
     #  we will first create the order and save it with the passed in params
    order = user.orders.create!(order_params)
    byebug
    # no need to create for both the order_items, or payments, as they are nested and we can pass that data in the params
    # next we will create the session object to start the payment
    session = Stripe::Checkout::Session.create(
      customer: user.stripe_id,
      line_items: checkout_params,
      mode: 'payment',
      success_url: "http://localhost:4000/checkout/complete",
      cancel_url: "http://localhost:4000/checkout/failure"
    )
    redirect_to session.url
    byebug
    # can pull out all the necessary information we need out of our customer and order variables

    #  once we are done with completing the session, we need to update our payment to include the stripe reference ID and the status of the payment
    
  end

  private
  #  we included the can accept nested resources in our order model.. so we can now pass our array of objects for order items, along with the payment values and they will be saved in their respective models
  def order_params


    params.require(:order).permit(:number_of_items, :total_cost, :order_items)
  end

  def checkout_params
    params.permit(line_items)
  end


end
