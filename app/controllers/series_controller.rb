class SeriesController < ApplicationController
  def show
      @serie = Serie.find_by(tmdb_id: params[:tmdb_id])
  end
end
