class OrderSerializer < ActiveModel::Serializer
  attributes :id, :number_of_items, :total_cost, :payment_status, :created_at

  has_many :order_items, serializer: OrderItemDescriptionSerializer

  def payment_status
    self.object.payment.status
  end 
end
