class CreatePayments < ActiveRecord::Migration[6.1]
  def change
    create_table :payments do |t|
      t.integer :order_id
      t.string :stripe_reference_number
      t.string :status
      t.timestamps
    end
  end
end
