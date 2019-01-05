class Contact < ActiveRecord::Base
  # Form validations for contact form
  validates :name, presence: true
  validates :email, presence: true
  validates :comments, presence: true
end
