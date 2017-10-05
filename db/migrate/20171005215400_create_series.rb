class CreateSeries < ActiveRecord::Migration[5.1]
  def change
    create_table :series do |t|
      t.string :title
      t.string :plot
      t.string :release_date
      t.boolean :released, null: false, default: false
      t.string :runtime
      t.string :popularity
      t.string :genre
      t.string :language
      t.string :budget
      t.string :average_vote
      t.string :vote_count
      t.string :poster
      t.string :homepage
      t.string :tmdb_id
      t.string :imdb_id
      t.timestamps
    end
    add_index :series, :tmdb_id
  end
end
