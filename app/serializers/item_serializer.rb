class ItemSerializer < ActiveModel::Serializer
  attributes :id, :item_name, :price, :description, :quantity_available, :photo_url, :category_name, :price_id

  def category_name
   self.object.category.category_name
  end
end
