var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var config = require('./config');
var port = config.serverPort;

// We only need one router for one endpoint in this assignment
// If more, a new approach to modularity should be applied to the routes/paths
const trailerRouter = require('./trailerRouter.js');

// JSON body parser
app.use(bodyParser.json());

// using public folder to provide static files
app.use(express.static('public'));
// Fallback endpoint
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.use(trailerRouter);

// app.use(errorHandler) // We could add here a generic error handler. Depends on how we design the code.

var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = listener