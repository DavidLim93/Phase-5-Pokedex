class CreateScores < ActiveRecord::Migration[7.0]
  def change
    create_table :scores do |t|
      t.integer :user_id
      t.integer :score
      
    end
  end
end
