var express = require('express');
var app = express();

let config = require('./config');
var bodyParser = require('body-parser')
var viaplay = require('./requestManager/viaPlay');
var movieDB = require('./requestManager/movieDB');
var youtubeWatchUrl = "https://www.youtube.com/watch?v=";
var youtubeEmbedUrl = "https://www.youtube.com/embed/";
var port = config.serverPort;
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

app.get("/viaplay-trailer-gen/text", function (request, response, next) {
  /**
    Using Promises to avoid callback-hell
  */
  return  viaplay.getMovieIMDBFromText(request.query.search)
      .then( function(movieImdbId){
        return movieDB.getMovieDBID(movieImdbId);
    }).then( function(movieDBId){
        return movieDB.getMovieDBTrailerID(movieDBId);
    }).then( function(youtubeVideoId) {
      var trailerUrl ;
        if(request.query.embed){
          trailerUrl = youtubeEmbedUrl +''+ youtubeVideoId;
      } else{
          trailerUrl = youtubeWatchUrl +''+ youtubeVideoId;
      }
      response.statusCode = 200;
      response.json({ youtubeTrailerLink: trailerUrl });
      return;
    }).catch(function(err) {
      response.statusCode = 400;
      response.json({ error: "Movie Not Found" });
      return;
    }).done(function() {
    response.end();
    });
    next();
});

/**
  POST endpoint takes Json Request body find Youtube Trailer Link
*/
app.post("/viaplay-trailer-gen/url", function (request, response, next) {
   /**
    Using Promises to avoid callback-hell
  */
   return viaplay.getMovieIMDBFromURL(request.body.url)
    .then( function(movieImdbId){
      return movieDB.getMovieDBID(movieImdbId);
  }).then( function(movieDBId){
      return movieDB.getMovieDBTrailerID(movieDBId);
  }).then( function(youtubeVideoId) {
    var trailerUrl ;
      if(request.query.embed){
        trailerUrl = youtubeEmbedUrl +''+ youtubeVideoId;
     } else{
        trailerUrl = youtubeWatchUrl +''+ youtubeVideoId;
     }

      response.statusCode = 200;
     response.json({ youtubeTrailerLink: trailerUrl });
     return;
  }).catch(function(err) {

    response.statusCode = 400;
    response.json({ error: "Movie Not Found" });
    return;
  }).done(function() {
   response.end();
  });
  next();
});



var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


/*
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
*/
module.exports = listener