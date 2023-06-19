class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :full_name
      t.string :address
      t.string :city
      t.string :state
      t.integer :zip_code
      t.string :email
      t.string :stripe_id
      t.boolean :admin_rights
      t.timestamps
    end
  end
end
