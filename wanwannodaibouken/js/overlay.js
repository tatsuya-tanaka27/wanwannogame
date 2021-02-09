$(function() {
  $('#overlay-link').on('click', function() {
    $("#overlay, #overlayWindow").fadeIn();
  });
      
  $('#close_button').on('click', function() {
    $("#overlay, #overlayWindow").fadeOut();
  });
});