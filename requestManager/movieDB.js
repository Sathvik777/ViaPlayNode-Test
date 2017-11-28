
var Q = require('q');
let config = require('../config');
const themoviedbBaseUrl =  process.env.MOVIEDB_BASE_URL || config.themoviedbBaseUrl;
var client = require('request-json').createClient(themoviedbBaseUrl);
var youtubeBaseUrl = "https://www.youtube.com/watch?v=";
var fallbackYouTubeId = "";
var apiKey = process.env.MOVIEDB_KEY || config.movieDBapiKey;

module.exports = {
  /**
  Function takes IMDB movie ID
  returns a Promise which makes sure to stay in sync and provide the movie db ID
  */
  getMovieDBID: function(movieImdbId) {
    return Q.Promise(function(resolve, reject) {
      client.get('find/'+movieImdbId+'?api_key='+apiKey+'&external_source=imdb_id', function (err, res, body) {
        if (err || res.statusCode > 300) {

          console.log(body);
          reject(new Error());
        } else {
          let movieBDId = body["movie_results"][0].id;
          resolve(movieBDId);
        }
      });
    });
  },
  /**
  Function takes the movie db ID
  returns a Promise which makes sure to stay in sync and provide Yoube Trailer ID
  */
  getMovieDBTrailerID: function(movieDBId) {
    return Q.Promise(function(resolve, reject) {
      client.get('movie/'+movieDBId+'?api_key='+apiKey+'&append_to_response=trailers', function (err, res, body) {
        if (err || res.statusCode > 300) {
          console.log(body);
          reject(new Error());
        } else {
          let youtubeVideoId = body.trailers.youtube[0].source;
          if(youtubeVideoId ==  undefined) reject(new Error());
          resolve(youtubeVideoId);
        }
      });
    });
  }

}