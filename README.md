## ViaPlay - Trailer Generator
=========================





#### Install and Run - Instructions
------------------------





#### Node JS application to get trailer link from youtube for a movie
------------------------
API-USEAGE:
  POST 
  
    endpoint: /viaplay-trailer-gen/url
    
    request-body    : { 
    
    "url" : "https://content.viaplay.se/pc-se/film/{search-query}"
    
    }
    
    resposne-body    : { 
    
    "trailerYoutubeLink" : "https://www.youtube.com/watch?v=Pt_w0-eBgF"
    
    }
  
  
  GET
  
    endpoint: /viaplay-trailer-gen/text?search={search-query}
    
     resposne-body    : { 
     
    "trailerYoutubeLink" : "https://www.youtube.com/watch?v=Pt_w0-eBgF"
    
    }


#### User Test
------------------------

Find out more [about Code](https://glitch.com/edit/#!/tricky-seal).


Test Project endpoint - [Base EndPoint](https://tricky-seal.glitch.me/)

Test Project example - [Arrival-2016 Text based search](https://tricky-seal.glitch.me/viaplay-trailer-gen/text?search=arrival-2016)
\ ゜o゜)ノ



#### TODO
------------------------

* Write tests
* New Error handling