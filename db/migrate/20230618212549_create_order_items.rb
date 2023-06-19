class CreateOrderItems < ActiveRecord::Migration[6.1]
  def change
    create_table :order_items do |t|
      t.integer :order_id
      t.integer :item_id
      t.float :cost
      t.integer :quantity
      t.timestamps
    end
  end
end
