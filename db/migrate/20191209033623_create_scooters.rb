class CreateScooters < ActiveRecord::Migration[5.1]
  def change
    create_table :scooters do |t|
      t.integer :scooterId
      t.string :lat
      t.string :lon
      t.timestamps
    end
  end
end
