
// Does not make sense to create a client with the Viaplay base url if you then make the request with the full url
// Let's just do plain requests in a simple way.

let config = require('../config'); // config never changes so let is not optimal => use const
var viaPlayBaseUrl = process.env.VIAPLAY_BASE_URL || config.viaPlayBaseUrl;

const request = require('request-promise');

const handleViaplayContentResponse = (vpResponse) => {
  // we should be able to keep adding conditions until we check that we have what we want to return
  // This is just an example of validation
  vpResponse = JSON.parse(vpResponse);
  const isValidResponse = vpResponse._embedded && vpResponse._embedded["viaplay:blocks"];
  return isValidResponse ? 
    Promise.resolve(vpResponse._embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb.id) : // valid
    Promise.reject(new Error('Viaplay content not found')); // invalid
}
// url => id
const getMovieIMDBFromURL = (url) => (
  request(url) // this request does not handle json unless you indicate otherwise in the headers. Hence JSON.parse is required in the above function
  .then(handleViaplayContentResponse)
  //.catch() // you can add catch here if you want to do something fancy. Logs or whatever. Otherwise this will be caught by the router promise.
)
module.exports = { getMovieIMDBFromURL }