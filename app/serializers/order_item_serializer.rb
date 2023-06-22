class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :item_id, :cost, :quantity
end
