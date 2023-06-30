class OrderSerializer < ActiveModel::Serializer
  attributes :id, :number_of_items, :total_cost, :created_at

  has_many :order_items, serializer: OrderItemDescriptionSerializer


  has_one :payment, serializer: PaymentStatusSerializer

end
