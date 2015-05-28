# zoomy

Zoomy is a full-screen overlay to zoom into large images, written in JavaScript.

The Museum of Modern Art uses it to display artworks on its new collection site.

# Features

Zooming
* Large images allow you to zoom to the maximum available zoom level for your device
* Retina devices see image tiles at 2x resolution
* Small images (less than 1024px) appear as a static lightbox image, with similar interactions other than zoom
* The developer provides an array of images. Each image is an array of zoom levels. Each zoom level is a 2D array of tile URLs
* The developer provides an array with boundaries of the image. The demo contains boundaries for a square image and an image which has a greater y-dimension than x-dimension.

Interaction
* Double-click, double-tap, press spacebar, or use touch pinch to move through zoom modes
* Touch, click, and drag to pan the image, without going beyond the image borders
* Touch devices can make use of Leaflet "fractional zoom" smoothly transitioning as the user pinches the screen
* Press arrow keys to pan
* Press escape key or click outside of the image to exit

# Technical Details

Zoomy is built with <a href="http://jquery.com/">jQuery</a> and
<a href="http://leafletjs.com/">Leaflet.js</a>, including some new code in the unreleased
0.8-1.0 version.

To demonstrate how we use Zoomy, we also use these libraries in the demo:
* <a href="http://www.owlcarousel.owlgraphic.com/">Owl Carousel 2</a>
* <a href="http://hammerjs.github.io">HammerJS</a>
* <a href="https://github.com/rmagick/rmagick">Rmagick</a>

# License

MIT License
