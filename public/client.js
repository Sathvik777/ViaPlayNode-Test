$(function() {
  
  $.get('/dreams', function(dreams) {
    dreams.forEach(function(dream) {
      var videoFrame = $('#videoFrame');
       videoFrame.attr('src',);
    });
  });

  $('form').click(function(event) {
    event.preventDefault();
    var query = $('#query').val();
    $.get('/viaplay-trailer-gen/text?embed=true&search=' + query, function(response) {
      var videoFrame = $('#videoFrame');
       videoFrame.attr('src',response.youtubeTrailerLink);
    });
  });

});
