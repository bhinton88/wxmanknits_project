class Order < ApplicationRecord
  belongs_to :user
  has_one :payment
  
  has_many :order_items
  has_many :items, through: :order_items
  accepts_nested_attributes_for
end
