// This file should probably be contained in an own router folder since we can potentially have more routers.
'use strict';
const router = require('express').Router();
var viaplay = require('./requestManager/viaPlay');
var movieDB = require('./requestManager/movieDB');
var youtubeWatchUrl = "https://www.youtube.com/watch?v=";
var youtubeEmbedUrl = "https://www.youtube.com/embed/";
  
const handleResponse = (youtubeVideoId, embed, response) => {(
  response.json({ youtubeTrailerLink: `${embed ? youtubeEmbedUrl : youtubeWatchUrl}${youtubeVideoId}`})
)};

const handleError = (error, response) => {(
  // Here we could be smarter handling the error. Keeping the original implementation
  response.status(400).json({error: "Movie Not Found"})
)};

router.post("/viaplay-trailer-gen/url", (request, response, next) => {( // Arrow functions ES6
  viaplay.getMovieIMDBFromURL(request.body.url)
    .then(movieDB.movieDBId)
    .then(movieDB.getMovieDBTrailerID)
    .then(youtubeVideoId => handleResponse(youtubeVideoId, request.query.embed, response))
    .catch(error => handleError(error, response))
  )}
);

module.exports = router;
