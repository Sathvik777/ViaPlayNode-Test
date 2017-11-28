
var Q = require('q');
let config = require('../config');
var viaPlayBaseUrl = process.env.VIAPLAY_BASE_URL || config.viaPlayBaseUrl;
var client = require('request-json').createClient(viaPlayBaseUrl);
var movieDB = require('./movieDB');
module.exports = {
   /**
   Gets endpoints url and makes request to that endpoint
  Takes ViaPlayUrl provides IMDB ID
  */
  getMovieIMDBFromURL: function(url) {
    return Q.Promise(function(resolve, reject) {
      client.get(url, function (err, res, body) {
        if (err || res.statusCode > 300) {
          console.log(body);

          reject(new Error());
        } else if(body.hasOwnProperty('_embedded')) {
          resolve(body._embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb.id);
        } else {
          reject(new Error());
        }
      });
    });
  },

}