var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var viaplay = require('./requestManager/viaPlay');
var movieDB = require('./requestManager/movieDB');
var youtubeWatchUrl = "https://www.youtube.com/watch?v=";
var youtubeEmbedUrl = "https://www.youtube.com/embed/";

// JSON body parser
app.use(bodyParser.json());

// using public folder to provide static files 
app.use(express.static('public'));

// Fallback endpoint
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


/**
  GET endpoint takes Query Param `search` as movie name to search Viaplay endpoint and find Youtube Trailer Link
*/

app.get("/viaplay-trailer-gen/text", function (request, response) {
  /**
    Using Promises to avoid callback-hell
  */
  console.log(request.query.embed);
  viaplay.getMovieIMDBFromText(request.query.search)
    .then( function(movieImdbId){
      return movieDB.getMovieDBID(movieImdbId);
  }).then( function(movieDBId){
      return movieDB.getMovieDBTrailerID(movieDBId);
  }).catch(function(err) {
    response.status(400).send({ error: "Movie Not Found" });
  }).done(function(youtubeID) {
     if(request.query.embed){
      var trailerUrl = youtubeEmbedUrl + youtubeID;
    } else{
       trailerUrl = youtubeWatchUrl + youtubeID;
    }
    response.status(200).send({ youtubeTrailerLink: trailerUrl });
    });
});

/**
  POST endpoint takes Json Request body find Youtube Trailer Link
*/
app.post("/viaplay-trailer-gen/url", function (request, response) {
   /**
    Using Promises to avoid callback-hell
  */
  viaplay.getMovieIMDBFromURL(request.query.search)
    .then( function(movieImdbId){
      return movieDB.getMovieDBID(movieImdbId);
  }).then( function(movieDBId){
      return movieDB.getMovieDBTrailerID(movieDBId);
  }).catch(function(err) {
    response.status(400).send({ error: "Movie Not Found" });
  }).done(function(youtubeID) {
    if(request.query.embed){
      var trailerUrl = youtubeEmbedUrl+youtubeID;
    } else{
       trailerUrl = youtubeWatchUrl+youtubeID;
    }
      response.status(200).send({youtubeTrailerLink: trailerUrl });
    });
});



var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
