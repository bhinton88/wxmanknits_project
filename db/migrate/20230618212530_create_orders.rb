class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.integer :user_id
      t.integer :number_of_items
      t.float :total_cost
      t.timestamps
    end
  end
end
