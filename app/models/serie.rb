class Serie < ApplicationRecord
  has_many :reviews
  
  validates :title, :plot, :release_date, :released, :popularity, :genre, :language, :average_vote, :vote_count, :poster, :tmdb_id, presence: true
end
