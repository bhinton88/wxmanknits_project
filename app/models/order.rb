class Order < ApplicationRecord
  belongs_to :user
  has_one :payment
  
  has_many :order_items 
  has_many :items, through: :order_items

  def update_payment_status
    @order = self
    payment = @order.payment
    
    #  we are gonna find the session, and if its now considered paid, then we need to update the payment status
    session = Stripe::Checkout::Session.retrieve(payment.stripe_reference_number)

    if session.payment_status == 'paid'
      payment.update(status: session.payment_status)
    end
  end
end
