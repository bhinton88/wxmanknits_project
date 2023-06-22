class OrderItemDescriptionSerializer < ActiveModel::Serializer
  attributes :name, :quantity_purchased, :cost, :item_price


  def name
    self.object.item.item_name
  end

  def quantity_purchased
    self.object.quantity
  end

  def cost
    self.object.cost
  end

  def item_price
    self.object.item.price
  end



end
