class StaticPagesController < ApplicationController
  def index
    @movies = Tmdb::Movie.top_rated
    @movies.results.each { |movie| MovieBuilder.new(tmdb_id: movie.id).build!}

    @series = Tmdb::TV.top_rated
    @series.results.each { |serie| SerieBuilder.new(tmdb_id: serie.id).build!}

    @recent_reviews = Review.recent
  end

  def timeline
  end
end
