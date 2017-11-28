
var Q = require('q');
var client = require('request-json').createClient('https://api.themoviedb.org/3/');
var youtubeBaseUrl = "https://www.youtube.com/watch?v=";
var fallbackYouTubeId = "";
var apiKey = process.env.MOVIEDB_KEY;

module.exports = {
  /**
  Function takes IMDB movie ID 
  returns a Promise which makes sure to stay in sync and provide the movie db ID
  */
  getMovieDBID: function(movieImdbId) {
    console.log(apiKey);
    return Q.Promise(function(resolve, reject) {
      client.get('find/'+movieImdbId+'?api_key='+apiKey+'&external_source=imdb_id', function (err, res, body) {
        if (err || res.statusCode > 300) {
          
          console.log(body);
          reject(new Error());
        } else {
          console.log(body["movie_results"][0].id);
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
    console.log(apiKey);
    return Q.Promise(function(resolve, reject) {
      client.get('movie/'+movieDBId+'?api_key='+apiKey+'&append_to_response=trailers', function (err, res, body) {
        if (err || res.statusCode > 300) {
          // TODO
          
          console.log(body);
          reject(new Error());
        } else {
          console.log(body.trailers.youtube[0].source);
          const youtubeVideoId = body.trailers.youtube[0].source;
          resolve(body.trailers.youtube[0].source);
        }
      });
    });
  }
  
}