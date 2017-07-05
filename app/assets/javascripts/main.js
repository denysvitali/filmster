$(function(){
  let form=$('#movie-search');
  form.submit(function(e){
    e.preventDefault();

    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie?api_key=ab3927766ef5b5254ec77d1289540da8',
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

    var imageUrl = getBaseImageUrl();

    if (data["results"].length == 0) {
      htmlString = `<div class="alert alert-danger text-center" role="alert">No Data Found!</div>`
    }
    else{
      data["results"].forEach(function(movie){
        htmlString += `
        <img src=${movie["poster_path"] == null ? "/assets/default_image.png" : imageUrl + "/" + movie["poster_path"]} />


                      <p>${movie["title"]}</p>
                      <p>${movie["overview"]}</p>
                      `
      });
    }
    container.append(htmlString);
  }

  function getBaseImageUrl(){
    var url = "";
    var settings = {
      "async": false,
      "crossDomain": true,
      "url": "https://api.themoviedb.org/3/configuration?api_key=ab3927766ef5b5254ec77d1289540da8",
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
});
