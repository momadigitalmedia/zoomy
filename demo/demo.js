var shuttle = [
  
];

var allImageTiles = [shuttle, nepal];
var allZoomBounds = [shuttleBounds, nepalBounds];

$(function() {
  $(".owl-carousel.main-images").owlCarousel({
    items: 1,
    startPosition: 0,
    loop: true,
    autoplay: false,
    margin: 24
  });
});
