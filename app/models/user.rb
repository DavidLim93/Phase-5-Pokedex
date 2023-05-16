class User < ApplicationRecord
    has_secure_password
    
    has_many :score

    attribute :score, :integer

  validates :username, presence: true, uniqueness: true
end
