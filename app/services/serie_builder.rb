class SerieBuilder
  def initialize(tmdb_id:)
    @tmdb_id = tmdb_id
    @serie = Serie.find_or_initialize_by(tmdb_id: @tmdb_id)
  end

  def build!
    return @serie unless @serie.new_record?

    @fetched_serie = Tmdb::TV.detail(@tmdb_id)

    # create a new Serie based on the response data
    @serie.title = @fetched_serie.name
    @serie.plot = @fetched_serie.overview
    @serie.release_date = @fetched_serie.first_air_date
    @serie.released = true if (@fetched_serie.first_air_date[0...4].to_i <= Time.now.year)
    @serie.runtime = @fetched_serie.runtime
    @serie.popularity = @fetched_serie.popularity
    @serie.genre = ""
    @fetched_serie.genres.each { |x| @serie.genre += (x.name + ", ")}
    @serie.language = @fetched_serie.original_language
    @serie.average_vote = @fetched_serie.vote_average
    @serie.vote_count = @fetched_serie.vote_count
    @serie.poster = @fetched_serie.poster_path
    @serie.homepage = @fetched_serie.homepage
    @serie.tmdb_id = @fetched_serie.id

    @serie.save!

    return @serie
  end
end
