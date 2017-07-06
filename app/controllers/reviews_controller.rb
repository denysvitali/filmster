class ReviewsController < ApplicationController
  before_action :authenticate_user!

  def create
    # if a Movie with a tmdb_id of params[:tmdb_id] does not exist
    @movie = Movie.find_or_initialize_by(tmdb_id: params[:tmdb_id])

    if @movie.new_record?
    # fetch movie data from API using params[:tmdb_id] and create a new Movie based on the response data
    end
    
    # otherwise, find Movie with an tmdb_id of params[:tmdb_id]

    # create a new review and connect it to the current_user and the movie
  end
end