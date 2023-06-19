class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :item_name
      t.float :price
      t.string :price_id
      t.text :description
      t.integer :quantity_available
      t.string :photo_url
      t.integer :category_id
      t.string :product_id
      t.timestamps
    end
  end
end
