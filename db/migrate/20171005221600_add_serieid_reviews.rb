class AddSerieidReviews < ActiveRecord::Migration[5.1]
    def change
      add_column :reviews, :serie_id, :bigint, default: ""
    end
  end
  