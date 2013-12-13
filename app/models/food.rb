class Food < ActiveRecord::Base
  attr_accessible :description, :name, :images_attributes
  has_many :images, as: :imageable

end
