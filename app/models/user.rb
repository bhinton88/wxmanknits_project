class User < ApplicationRecord
  has_secure_password
  has_many :orders

  validates :username, :full_name, :address, :city, :state, :email, :zip_code, :stripe_id, presence: true
  validates :username, :email, uniqueness: true

  # we set a method to run before creation of a new user

  before_validation :create_on_stripe, on: :create

  #  for the email and name, since this is an INSTANCE method, the self is implicit

  def create_on_stripe
    params = { 
      email: email,
      name: full_name, 
      address: { line1: address, 
                  city: city, 
                  state: state,
                  postal_code: zip_code,
                  country: 'US', } 
      }  
    response = Stripe::Customer.create(params)
    self.stripe_id = response.id
  end
end
