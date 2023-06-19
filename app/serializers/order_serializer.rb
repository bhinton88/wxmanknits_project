class OrderSerializer < ActiveModel::Serializer
  attributes :id, :number_of_items, :total_cost

  has_many :order_items
end
