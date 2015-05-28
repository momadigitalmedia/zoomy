//zoomy :)
var fadeTimeout, zoomzoom;
var retinaFactor = 0;
var lTransitionSpeed = 250;

function Zoomy() {
  this.startCloseButton();
  this.startMultitouchEvents();
  this.startClickAndSwipeImages();
  fadeTimeout = setTimeout(this.fadeX, 3000);
};
$.extend(Zoomy.prototype, {
  loadArtLayer: function() {
    var zoomBounds = allZoomBounds[this.imgIndex];
    var myImageTiles = allImageTiles[this.imgIndex];
    this.maxZoom = 11 + myImageTiles.length;

    // check for retina
    if (L.Browser.retina) {
      this.adaptForRetina();
    } else {
      this.bounds = L.latLngBounds(zoomBounds);
    }

    // add preferred art as a layer
    this.currentArt = new L.ArtLayer('', this.mapOptions || {});
    this.currentArt.tiles = myImageTiles;

    // delay the layer appearance because sometime it slides into place
    var delayDisplayLayer = function() {
      this.canvas.off('moveend', delayDisplayLayer);
      if (this.currentArt && !this.canvas.hasLayer(this.currentArt)) {
        this.currentArt.addTo(this.canvas);
      }
    }.bind(this);
    this.canvas.on('moveend', delayDisplayLayer);
    setTimeout(delayDisplayLayer, 250);

    // adjust boundaries for each art because each image has a different shape
    this.canvas.setMaxZoom(this.maxZoom);
    this.canvas.setMaxBounds(this.bounds);
    this.canvas.fitBounds(this.bounds);
  },

  adaptForRetina: function() {
    // on retina: load the 256px images into 128px tiles; adjust boundary of image to match
    var zoomBounds = allZoomBounds[this.imgIndex];
    this.mapOptions = { tileSize: 128 };
    retinaFactor = 1;
    var xmin = zoomBounds[0][1];
    var ymax = zoomBounds[1][0];
    var ymin = ymax - (ymax - zoomBounds[0][0]) / 2;
    var xmax = xmin + (zoomBounds[1][1] - xmin) / 2;
    this.bounds = L.latLngBounds([[ymin, xmin], [ymax, xmax]]);
  },

  escapeToExit: function() {
    // escape key = exit
    $('body').keydown(function(e) {
      if (e.keyCode == 27) {
        this.close.bind(this)();
      }
    }.bind(this));
  },

  setZoomEvents: function() {
    // hide the X during zoom, unless it's the original zoom-out zoom
    this.canvas.on('zoomstart', function() {
      clearTimeout(fadeTimeout);
      this.fadeX();
    }.bind(this));
    this.canvas.on('zoomend', function() {
      if (this.canvas.getZoom() <= this.matchSizeZoom) {
        this.showX();
      }
      var offset = this.canvas._limitOffset(L.point(0, 0), this.maxBounds);
      this.canvas.panBy(offset);
    }.bind(this));

    // this is a custom zoomclose event
    this.canvas.on('zoomclose', function() {
      // this.close.bind(this)();
    }.bind(this));

    // spacebar = zoom
    $('#zoomy').keydown(function(e) {
      if (e.keyCode == 32) {
        if (this.canvas.getZoom() == this.maxZoom) {
          this.canvas.setZoom(this.matchSizeZoom);
        } else {
          this.canvas.zoomIn();
        }
        e.preventDefault();
        e.stopPropagation();
      }
    }.bind(this)).focus();
  },

  setTapEvents: function() {
    // click outside of the image and exit
    // click inside the image and see the X
    // wait 300ms so that a double-click zoom doesn't trigger either
    this.doubletap = null;
    var that = this;
    this.canvas.on('click', function (e) {
      if (!that.doubletap) {
        that.doubletap = setTimeout(function() {
          // registered a delayed single click
          if (!that.bounds.contains(e.latlng)) {
            that.close();
          } else {
            that.showX();
          }
          that.doubletap = null;
        }, 300);
      } else {
        // registered a double click
        clearTimeout(that.doubletap);
        that.doubletap = false;
        if (that.canvas.getZoom() >= that.maxZoom) {
          that.canvas.setZoom(that.matchSizeZoom);
          that.canvas.fitBounds(that.bounds);
        }
      }
    });
  },

  makeZoomable: function() {
    if (L.Browser.retina) {
      retinaFactor = 1;
    }

    var srcImage = $($(".main-image img")[this.imgIndex]);
    this.matchSizeZoom = 13 + Math.log(Math.max(srcImage.width(), srcImage.height()) / 1024) / Math.log(2) + retinaFactor;
    this.matchSizeZoom = Math.max(11.5, this.matchSizeZoom);

    // on fractional zoom on desktop, Leaflet doesn't show the tiles around the edges
    // limit desktop to whole number zoom
    if (!L.Browser.touch) {
      this.matchSizeZoom = Math.floor(this.matchSizeZoom);
    }

    // reinitialize Leaflet each time, so scrolls don't destroy it
    if ($("#zoomy").children().length) {
      $("#zoomy").html('').focus();
    }
    $("#zoomy")[0]._leaflet = null;

    // create the Leaflet map element and add events once
    this.canvas = L.map("zoomy", {
      minZoom: this.matchSizeZoom,
      zoomControl: false,
      keyboardPanOffset: 160,
      inertiaMaxSpeed: 3000,
      inertiaDeceleration: 2200
    }).setView([0, 0], this.matchSizeZoom);

    this.setZoomEvents();
    this.setTapEvents();

    // set up the first image
    this.loadArtLayer();
  },

  makeLightBox: function() {
    $($(".main-image img")[this.imgIndex]).clone().addClass("main").appendTo($("#image-overlay"));

    // show the close button when I click the image
    $("#image-overlay img").click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.showX();
    }.bind(this));

    // close the overlay when I click outside of the image
    $("#image-overlay, .close").click(this.close.bind(this));

    // prevent any scrolling on the page underneath the overlay
    $('body').on('touchstart', function(e) {
      e.preventDefault();
      $(e.target).trigger('click');
    }).on('touchmove', function(e) {
      e.preventDefault();
      e.stopPropagation();
    }).keypress(function(e) {
      // spacebar cannot zoom - block scrolling of page
      if (e.keyCode == 32) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
    $("#image-overlay").focus();
  },

  show: function(e) {
    // show the overlay for the current image
    var imgOrder = $(e.currentTarget).parents('.item').data();
    if (imgOrder) {
      imgOrder = imgOrder.imageIndex;
    } else {
      imgOrder = 0;
    }
    this.imgIndex = imgOrder;

    var myImageTiles = allImageTiles[this.imgIndex];
    if (myImageTiles.length == 1) {
      $('#image-overlay').addClass("lightbox flex").hide();
    }

    $("#image-overlay").fadeIn(lTransitionSpeed, function () {
      clearTimeout(fadeTimeout);
      $(".close").show();
      fadeTimeout = setTimeout(this.fadeX.bind(this), 3000);

      $('body').addClass('overlay');

      if (myImageTiles.length == 1) {
        // lightbox version
        $("#zoomy").html('');
        this.makeLightBox();
      } else {
        // Leaflet version
        $("#image-overlay").removeClass("lightbox");
        this.makeZoomable();
      }
    }.bind(this));

    // call keyboard handler every time
    this.escapeToExit();
  },

  close: function() {
    // close the overlay and remove any existing art
    if (this.canvas) {
      this.canvas.remove();
    }
    $("#image-overlay").fadeOut(lTransitionSpeed, function() {
      $("#image-overlay").removeClass("lightbox flex");
    });
    $("#image-overlay").off('click');
    $('body').removeClass('overlay').off('touchstart touchmove keydown');
    if (this.currentArt) {
      if (this.canvas) {
        this.canvas.removeLayer(this.currentArt);
      }
      this.currentArt = null;
    }
    $("#image-overlay img.main").remove();
  },

  startCloseButton: function() {
    // close button
    this.showX = function() {
      $(".close").fadeIn(lTransitionSpeed);
      clearTimeout(fadeTimeout);
      fadeTimeout = setTimeout(this.fadeX, 3000);
    }.bind(this);
    this.fadeX = function() {
      $(".close").fadeOut(lTransitionSpeed);
    };
    $('.close').hover(this.showX).click(this.close.bind(this));
  },

  startClickAndSwipeImages: function() {
    var mouseMovement = null;
    $('.main-image img').css({ cursor: 'pointer' }).mousedown(function(e) {
      mouseMovement = e.pageX;
    })
    .mouseup(function(e) {
      if (mouseMovement && Math.abs(e.pageX - mouseMovement) < 5) {
        this.show(e);
      }
      mouseMovement = null;
    }.bind(this));
  },

  startMultitouchEvents: function() {
    // hammer.js library
    var hammertime = $('.main-image img').hammer();

    // differentiate scroll and pinch events over the original image
    var fingerDown = function(e) {
      var fingersDown = e.originalEvent.touches.length;

      if (fingersDown > 1) {
        // Lock Scrolling over the zoom element by allowing Hammer.js to fire pinch events.
        toggleHammerScrolling(true);
      }
    }.bind(this);

    var fingerUp = function(e) {
      toggleHammerScrolling(false);
    }.bind(this);

    var toggleHammerScrolling = function(shouldScroll) {
      hammertime.data('hammer').get('pinch').set({
        enable: shouldScroll
      });
    };

    hammertime.on('touchstart', fingerDown);
    hammertime.on('touchend', fingerUp);

    // show overlay on pinch or double-tap on original image
    hammertime.on('pinch', this.show.bind(this));
    hammertime.on('doubletap', this.show.bind(this));
    hammertime.data('hammer').get('pinch').set({ enable: false });
  }
});

$(function() {
  // run if image zooms are defined
  if (typeof allImageTiles !== 'undefined' && typeof allZoomBounds !== 'undefined') {

    // match Leaflet X,Y,Z tile coordinates to the array of image tiles
    L.ArtLayer = L.TileLayer.extend({
      getTileUrl: function (coords) {
        var zLevel = Math.round(coords.z) - 12;
        var xCoord = coords.x - 4092 * Math.pow(2, zLevel - 1 + retinaFactor);
        var yCoord = coords.y - 2722 * Math.pow(2, zLevel - 1 + retinaFactor);
        if (this.tiles && this.tiles[zLevel] && this.tiles[zLevel][xCoord] && this.tiles[zLevel][xCoord][yCoord]) {
          return this.tiles[zLevel][xCoord][yCoord];
        } else {
          if (L.Browser.gecko) {
            return null;
          } else {
            // transparent 1x1 GIF
            return 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';
          }
        }
      }
    });

    zoomzoom = new Zoomy();
  }
});
