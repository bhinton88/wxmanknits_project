class CheckoutController < ApplicationController

  # this controller will handle the check out funtion and the linking to stripe 

  def create
    # we first find the customer so that we can provide that detail to the 
    # session object
    user = User.find(session[:user_id])
    
    # then create the order that is associated with that user
    order = user.orders.create!(order_params)
    # here we are saving our order_items to the DB
    order_items = order.order_items.create(order_items_params)

    #  here we are getting our items in the correct format to submit to stripe
    line_items = order_items.map{ |item| {quantity: item.quantity, price: item.item.price_id}}

    # making a call to the stripe API to create a session in order to 
    session = Stripe::Checkout::Session.create(
      customer: user.stripe_id,
      customer_details: {
        address: user.address,
        email: user.email,
        name: user.full_name,
      }
      line_items: line_items,
      mode: 'payment',
      success_url: "http://localhost:4000/complete",
      cancel_url: "http://localhost:4000/failure"
    )

    Payment.create(stripe_reference_number: session.id, status: session.payment_status)

    response = [{redirectUrl: session.url}]
  
    render json: response, status: :created
  end

  private
  #  we included the can accept nested resources in our order model.. so we can now pass our array of objects for order items, along with the payment values and they will be saved in their respective models
  def order_params
    params.require(:order).permit(:number_of_items, :total_cost)
  end

  def order_items_params
    params.require(:order_items).map { |params| params.permit(:item_id, :cost, :quantity)}
  end

end
