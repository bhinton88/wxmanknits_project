class PaymentSerializer < ActiveModel::Serializer
  attributes :id, :stripe_reference_number, :status
end
