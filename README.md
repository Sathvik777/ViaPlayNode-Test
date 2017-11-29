## ViaPlay - Trailer Generator
=========================

Application that takes a ViaPlay API Url of a Movie and finds the Trailer link of movie on Youtube


#### Prerequisite
------------------------

* Git
* Node - 8.X
* NPM - 5.X


#### Install and Run - Instructions
------------------------

- Clone the repository: `git clone https://github.com/Sathvik777/ViaPlayNode-Test.git`

- Change working directory to ViaPlayNode-Test:`cd ViaPlayNode-Test`

- In ViaPlayNode-Test directory  download and paste `config.js` file provided by owner

- Install all packages need: `npm install`

- Run tests to make sure Endpoint is working: `npm test`

- Start the Node server : `npm start`



#### Node JS application to get trailer link from youtube for a movie
------------------------
API-USEAGE:
  POST

    endpoint: /viaplay-trailer-gen/url

    Query-param: embed = true | false (default)  Choose between Embeded YouTube Link or Redirect YouTube Link

    request-body    : {

    "url" : "https://content.viaplay.se/pc-se/film/{search-query}"

    }

    resposne-body    : {

    "trailerYoutubeLink" : "https://www.youtube.com/watch?v=Pt_w0-eBgF"

    }

    resposne error http-header  : 400

    resposne error body : {

    "error" : "Movie Not Found"

    }

#### TO-DO
------------------------
* More specific error handling
* Better config management
* Load tests
* Detailed unit tests



#### Important Endpoints
------------------------

Find out more [about Code](https://glitch.com/edit/#!/tricky-seal).


Working endpoint:

  POST : https://tricky-seal.glitch.me/viaplay-trailer-gen/url

  request-body    : {
    "url": "https://content.viaplay.se/pc-se/film/arrival-2016"
    }


\ ゜o゜)ノ
