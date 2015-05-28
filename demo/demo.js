var shuttle = [
  [
    ["tile-images/0/0/0/0.jpg", "tile-images/0/0/1/0.jpg"],
    ["tile-images/0/0/0/1.jpg", "tile-images/0/0/1/1.jpg"]
  ],
  [
    ["tile-images/0/1/0/0.jpg", "tile-images/0/1/1/0.jpg", "tile-images/0/1/2/0.jpg", "tile-images/0/1/3/0.jpg"],
    ["tile-images/0/1/0/1.jpg", "tile-images/0/1/1/1.jpg", "tile-images/0/1/2/1.jpg", "tile-images/0/1/3/1.jpg"],
    ["tile-images/0/1/0/2.jpg", "tile-images/0/1/1/2.jpg", "tile-images/0/1/2/2.jpg", "tile-images/0/1/3/2.jpg"],
    ["tile-images/0/1/0/3.jpg", "tile-images/0/1/1/3.jpg", "tile-images/0/1/2/3.jpg", "tile-images/0/1/3/3.jpg"]
  ]
];

var nepal = [
  [
    ["tile-images/1/0/0/0.jpg", "tile-images/1/0/1/0.jpg"],
    ["tile-images/1/0/0/1.jpg", "tile-images/1/0/1/1.jpg"]
  ],
  [
    ["tile-images/1/1/0/0.jpg", "tile-images/1/1/1/0.jpg", "tile-images/1/1/2/0.jpg", "tile-images/1/1/3/0.jpg"],
    ["tile-images/1/1/0/1.jpg", "tile-images/1/1/1/1.jpg", "tile-images/1/1/2/1.jpg", "tile-images/1/1/3/1.jpg"],
    ["tile-images/1/1/0/2.jpg", "tile-images/1/1/1/2.jpg", "tile-images/1/1/2/2.jpg", "tile-images/1/1/3/2.jpg"]
  ],
  [
    ["tile-images/1/2/0/0.jpg", "tile-images/1/2/1/0.jpg", "tile-images/1/2/2/0.jpg", "tile-images/1/2/3/0.jpg", "tile-images/1/2/4/0.jpg", "tile-images/1/2/5/0.jpg", "tile-images/1/2/6/0.jpg", "tile-images/1/2/7/0.jpg"],
    ["tile-images/1/2/0/1.jpg", "tile-images/1/2/1/1.jpg", "tile-images/1/2/2/1.jpg", "tile-images/1/2/3/1.jpg", "tile-images/1/2/4/1.jpg", "tile-images/1/2/5/1.jpg", "tile-images/1/2/6/1.jpg", "tile-images/1/2/7/1.jpg"],
    ["tile-images/1/2/0/2.jpg", "tile-images/1/2/1/2.jpg", "tile-images/1/2/2/2.jpg", "tile-images/1/2/3/2.jpg", "tile-images/1/2/4/2.jpg", "tile-images/1/2/5/2.jpg", "tile-images/1/2/6/3.jpg", "tile-images/1/2/7/2.jpg"],
    ["tile-images/1/2/0/3.jpg", "tile-images/1/2/1/3.jpg", "tile-images/1/2/2/3.jpg", "tile-images/1/2/3/3.jpg", "tile-images/1/2/4/3.jpg", "tile-images/1/2/5/3.jpg", "tile-images/1/2/6/3.jpg", "tile-images/1/2/7/3.jpg"],
    ["tile-images/1/2/0/4.jpg", "tile-images/1/2/1/4.jpg", "tile-images/1/2/2/4.jpg", "tile-images/1/2/3/4.jpg", "tile-images/1/2/4/4.jpg", "tile-images/1/2/5/4.jpg", "tile-images/1/2/6/4.jpg", "tile-images/1/2/7/4.jpg"]
  ]
];

var allImageTiles = [shuttle, nepal];

var squareBounds = [[51.45404, -0.1758], [51.56344, 0]];
var allZoomBounds = [squareBounds, squareBounds];

$(function() {
  $(".owl-carousel.main-images").owlCarousel({
    items: 1,
    startPosition: 0,
    loop: true,
    autoplay: false,
    margin: 24
  });
});
