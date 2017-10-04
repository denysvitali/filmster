$(function(){
  let IMDB_API_KEY = 'ab3927766ef5b5254ec77d1289540da8';
  let form=$('#movie-search');
  form.submit(function(e){
    e.preventDefault();

    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie?api_key=' + IMDB_API_KEY,
      data: form.serialize()
    })
    .done(function(data){
      displayMovies(data);
    });
  });


  function displayMovies(data){
    let container = $("#movies");
    let htmlString = "";

    container.empty();

    let imageUrl = getBaseImageUrl();
    console.log("hello", imageUrl);
    // let imageUrl = imageUrl1();
    //check if the API responds back with an error i.e. no data found.
    if (data["results"].length == 0) {
      htmlString = `<div class="alert alert-danger text-center" role="alert">No Data Found!</div>`
    }
    else{
      data["results"].forEach(function(movie){
        htmlString += `
        <div class = "row margin-20 padding-30">
          <div class = "col-xs-12 col-md-7">
            <img src=${movie["poster_path"] == null ? "/assets/default_image.png" : imageUrl + "/" + movie["poster_path"]} data-id="${movie['id']}" class = "movie_poster"/>
          </div>

          <div class = "col-xs-12 col-md-5">
              <h2>${movie["title"]}</h2>
              <p class = "text-justify">${movie["overview"]}</p>
          </div>
        </div>
        <hr/>
                      `
      });
    }
    container.append(htmlString);
  }

  //sends request to the /configuration api of TMDB
  function getBaseImageUrl(){
    var url = "";
    var settings = {
      "async": false,
      "crossDomain": true,
      "url": "https://api.themoviedb.org/3/configuration?api_key=" + IMDB_API_KEY,
      "method": "GET",
      "headers": {},
      "data": "{}"
    }

    $.ajax(settings).done(function (response) {
      //Console log for taking screenshot while preparing lesson
      console.log(response);
      url = response["images"]["base_url"] + response["images"]["poster_sizes"][3];
    });
    return url;
  }

  $('#movies').on('click','img.movie_poster',function(e){
    e.preventDefault();

    let id = $(e.target).data('id');

    $.ajax({
      url: 'https://api.themoviedb.org/3/movie/' + id + '?',
      data: { "api_key": IMDB_API_KEY }
    })
    .done(function(data){
      displayMovie(data);
    })
  })

  function displayMovie(movie){
    console.log(movie);
    let container = $("#movies");
    let htmlString = "";
    container.empty();

    var imageUrl = getBaseImageUrl();

      htmlString += `
        <div class = "row margin-20 padding-30">
          <div class = "col-xs-12 col-md-7">
            <img src=${movie["poster_path"] == null ? "/assets/default_image.png" : imageUrl + "/" + movie["poster_path"]} data-id="${movie['id']}"/>
          </div>

          <div class = "col-xs-12 col-md-5">
            <h2 class= "text-center">${movie["title"]}</h2>
            <p><strong>Summary:</strong> ${movie["overview"]}</p>
            <p><strong>Runtime:</strong> ${movie["runtime"]} minutes</p>
            <p><strong>Budget:</strong> $ ${movie["budget"]}</p>
            <p><strong>Popularity:</strong> ${movie["popularity"]}</p>
            <p><strong>Website:</strong> <a href=${movie["homepage"]} target="blank">${movie["homepage"]}</a></p>
            <p><strong>Status:</strong> ${movie["status"]}</p>
          </div>
        </div>

        <div class = "row margin-20 padding-30">
          <div class = "col-xs-12 col-md-12">
            <form id="rating-form" action="/reviews" method="POST">
              <input type="hidden" name="authenticity_token" value=${window._token} />
              <input type="hidden" name="tmdb_id" value=${movie["id"]} />
              <textarea name= "review[comment]" class="form-control" placeholder="Your movie review"/>
              <br />
              <input type="submit" class="btn btn-success pull-right" />
            </form>
          </div>
        </div>
                    `
    container.append(htmlString);
  }

  // init Masonry
  var $grid = $('.grid').masonry({
    // options
    itemSelector: '.grid-item',
    // use element for option
    columnWidth: 200,
    percentPosition: true

  });
  // layout Masonry after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
  });

});
