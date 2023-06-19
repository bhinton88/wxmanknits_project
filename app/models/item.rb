class Item < ApplicationRecord
  belongs_to :category

  has_many :order_items
  has_many :orders, through: :order_items

  validates :item_name, :price, :description, :quantity_available,:photo_url, presence: true


  after_save :assign_price_id
  
  def assign_price_id 
    if self.price_id.blank? and self.product_id.blank? 
      product = Stripe::Product.create({ 
        name: item_name, 
        description: description,
        active: true,
        shippable: true,
        url: photo_url
      })
      price = Stripe::Price.create({
        unit_amount: self.convert_currency,
        currency: 'usd',
        recurring: nil,
        product: product.id
      })
      self.update(price_id: price.id, product_id: product.id)
    end
  end

  def convert_currency
    stripe_price = (self.price * 100).to_i
  end

  # Stripe wants us to create a new price ID upon update of an item rather than updating the price

  #  when making a call to the stripe API we pass the ID first and then the updated object next

  def create_new_price_id_update_description(updated_price, updated_description)
    #  de-activate old price ID
    Stripe::Price.update(
      price_id,
      {
        active: false
      }
    )
    
    #  create NEW price id when the price is updated
    new_price = Stripe::Price.create({
      unit_amount: updated_price,
      currency: 'usd',
      recurring: nil,
      product: self.product_id
    })
    #  updates the item instance to include the NEW price ID for stripe
    self.update(price_id: new_price.id)
      
    #  update the stripe product with the new description 
    Stripe::Product.update(
      product_id,
      {
        description: updated_description
      }
    )
  end

  # if no price change, then we send the updated info, which in our case is only the updated description
  def update_stripe_item(updated_description)
    Stripe::Product.update(
      product_id,
      {
        description: updated_description
      }
    )
  end

  def remove_stripe_item
    Stripe::Price.update( 
      price_id,
      {
        active: false
      }
    )
    
    Stripe::Product.update(
      product_id,
      {
        active: false
      }
    )

  end
end
