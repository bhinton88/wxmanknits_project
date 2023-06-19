class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name,  :username, :address, :city, :state, :email, :zip_code, :admin_rights

  has_many :orders
end
