class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  belongs_to :plan
  has_one :profile
  
  
 attr_accessor :stripe_card_token
 # If pro user passes validation (email, password, card number)
 # then call stripe and tell stripe to set up a subscription
 # upon charing the customer's card
 # Stripe responds back with customer data and store customer.id as the customer
 # token. Then save the user.
  def save_with_subscription
    if valid?
      customer = Stripe::Customer.create(description: email, plan: plan_id, card: stripe_card_token)
      self.stripe_customer_token = customer.id
      save!
    end
  end
end
