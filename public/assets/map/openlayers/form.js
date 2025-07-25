this.Openlayers_Map_Form = (function () {
  var bind = function (fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };

  function Openlayers_Map_Form(canvas, opts) {
    if (opts == null) {
      opts = {};
    }
    this.clonePointForm = bind(this.clonePointForm, this);
    this.canvas = canvas;
    this.opts = opts;

    if (opts["zoom"] && this.validateZoom(opts["zoom"])) {
      this.zoom = opts["zoom"];
    }
    this.defaultZoom = Openlayers_Map.defaultZoom;

    if (opts["center"] && this.validateLatLon(opts["center"][1], opts["center"][0])) {
      this.center = opts["center"];
    }
    this.defaultCenter = Openlayers_Map.defaultCenter.reverse();

    this.showGoogleMapsSearch = false;
    if (opts["showGoogleMapsSearch"]) {
      this.showGoogleMapsSearch = opts["showGoogleMapsSearch"];
    }

    this.markerFeature = null;
    this.markerLayer = null;

    this.popup = null;
    this.maxPointForm = opts['max_point_form'] || 10;
    this.deleteMessage = "マーカーを削除してよろしいですか？";
    this.dataID = 0;
    this.markerIcon = Openlayers_Map.markerIcon;
    this.clickIcon = Openlayers_Map.clickIcon;
    this.clickMarkerId = null;
    this.render();
  }

  Openlayers_Map_Form.prototype.getMapLoc = function (ele) {
    var latlon;
    latlon = ele.val().split(',');
    return [parseFloat(latlon[0]), parseFloat(latlon[1])];
  };

  Openlayers_Map_Form.prototype.setMapLoc = function (ele, lat, lon) {
    lat = Math.ceil(lat * Math.pow(10, 6)) / Math.pow(10, 6);
    lon = Math.ceil(lon * Math.pow(10, 6)) / Math.pow(10, 6);
    ele.val(lat.toFixed(6) + "," + lon.toFixed(6));
  };

  Openlayers_Map_Form.validateLoc = function (loc) {
    var lat, lonlat, lon;
    if (!loc) {
      return false;
    }
    lonlat = loc.split(',');
    lat = parseFloat(lonlat[1]);
    lon = parseFloat(lonlat[0]);
    if (!(lat && !isNaN(lat))) {
      return false;
    }
    if (!(lon && !isNaN(lon))) {
      return false;
    }
    if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
      return true;
    } else {
      return false;
    }
  };

  Openlayers_Map_Form.prototype.getCenter = function () {
    return (this.center ? this.center : this.defaultCenter);
  };

  Openlayers_Map_Form.prototype.getZoom = function () {
    return (this.zoom ? this.zoom : this.defaultZoom);
  };

  Openlayers_Map_Form.prototype.setCenter = function (pos) {
    return this.map.getView().setCenter(ol.proj.transform(pos, 'EPSG:4326', 'EPSG:3857'));
  };

  Openlayers_Map_Form.prototype.setZoom = function (level) {
    return this.map.getView().setZoom(level);
  };

  Openlayers_Map_Form.prototype.render = function () {
    this.initMap();
    this.renderMarkers();
    this.initPopup();
    this.resize();
    this.renderEvents();
    this.toggleAddMarker();

    // スクリプトタグの入力を防ぐ
    $(".marker-name, .marker-text").on("input", function() {
      var value = $(this).val();
      if (value.match(/<script/i)) {
        $(this).val(value.replace(/<script[^>]*>.*?<\/script>/gi, ''));
      }
    });
  };

  Openlayers_Map_Form.prototype.createLayers = function (layerOpts) {
    var j, layer, layers, len, opts, projection, source, url;
    layers = [];
    for (j = 0, len = layerOpts.length; j < len; j++) {
      opts = layerOpts[j];
      source = opts["source"];
      url = opts["url"];
      projection = opts["projection"];
      layer = new ol.layer.Tile({
        source: new ol.source[source]({
          url: url,
          projection: projection
        })
      });
      layers.push(layer);
    }
    return layers;
  };

  Openlayers_Map_Form.prototype.initMap = function () {
    var layerOpts;

    layerOpts = this.opts['layers'];
    layerOpts || (layerOpts = [
      {
        source: "XYZ",
        url: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
        projection: "EPSG:3857"
      }
    ]);

    this.map = new ol.Map({
      target: this.canvas,
      renderer: ['canvas', 'dom'],
      layers: this.createLayers(layerOpts),
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }),
      view: new ol.View({
        projection: "EPSG:3857",
        center: ol.proj.transform(this.getCenter(), "EPSG:4326", "EPSG:3857"),
        minZoom: 3,
        maxZoom: 18,
        zoom: this.getZoom()
      }),
      logo: false
    });
  };

  Openlayers_Map_Form.prototype.initPopup = function () {
    $("body").append('<div id="marker-popup"><div class="closer"></div><div class="content"></div></div>');
    this.popup = $('#marker-popup');
    this.popup.hide();
    this.popupOverlay = new ol.Overlay({
      element: this.popup.get(0),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    this.map.addOverlay(this.popupOverlay);
    this.map.on('pointermove', (function (_this) {
      return function (e) {
        var cursor, hit, pixel;
        if (e.dragging) {
          _this.popup.hide();
          return;
        }
        pixel = _this.map.getEventPixel(e.originalEvent);
        hit = _this.map.hasFeatureAtPixel(pixel);
        cursor = hit ? 'pointer' : '';
        return _this.map.getTarget().style.cursor = cursor;
      };
    })(this));
    return this.popup.find('.closer').on('click', (function (_this) {
      return function (_e) {
        _this.popupOverlay.setPosition(void 0);
        $(_this).blur();
        return false;
      };
    })(this));
  };

  Openlayers_Map_Form.prototype.renderMarkers = function () {
    $(".mod-map dd.marker").each((function (_this) {
      return function (i, e) {
        var loc, image, opts;
        $(e).attr("data-id", _this.dataID);
        if ($(e).find(".marker-loc").val()) {
          loc = _this.getMapLoc($(e).find(".marker-loc"));
          image = $(e).find('[name="item[map_points][][image]"]').val();

          opts = {}
          opts["id"] = parseInt(_this.dataID);
          if (image) {
            opts["image"] = image;
          }
          _this.setMarker(loc, opts);
        }
        //Map_Form.attachMessage(Map_Form.dataID)
        _this.dataID += 1;
      };
    })(this));
  };

  Openlayers_Map_Form.prototype.showPopup = function (e, feature) {
    var markerHtml, markerId, loc;
    markerId = feature.get("markerId");
    if (markerId !== 0 && !markerId) {
      this.popup.hide();
      return;
    }
    markerHtml = "";
    $('dd[data-id = "' + markerId + '"]').each(function () {
      var name, text;
      name = $(this).find(".marker-name").val();
      text = $(this).find(".marker-text").val();
      loc = $(this).find(".marker-loc").val();
      if (name) {
        markerHtml += $('<p />').text(name).prop('outerHTML');
      }
      if (text) {
        return $.each(text.split(/[\r\n]+/), function () {
          if (this.match(/^https?:\/\//)) {
            return markerHtml += $('<p />').html($('<a />', { href: this}).text(this));
          } else {
            return markerHtml += $('<p />').text(this).prop('outerHTML');
          }
        });
      }
    });
    if (this.showGoogleMapsSearch) {
      loc = loc.split(",");
      markerHtml += Googlemaps_Map.getMapsSearchHtml(loc[1], loc[0]);
    }
    if (!markerHtml) {
      return;
    }
    this.popup.find('.content').html(markerHtml);
    this.popup.attr({ dataId: markerId });
    this.popup.show();
    this.popupOverlay.setPosition(e.coordinate);
  };

  Openlayers_Map_Form.prototype.setMarker = function (loc, opts) {
    var feature, iconSrc, pos, style;
    if (opts == null) {
      opts = {};
    }
    iconSrc = this.markerIcon;
    if (opts['image']) {
      iconSrc = opts['image'];
    }
    style = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: iconSrc
      })
    });
    pos = [loc[0], loc[1]];

    feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform(pos, "EPSG:4326", "EPSG:3857")),
      markerId: opts['id'],
      markerHtml: opts['html'],
      category: opts['category']
    });
    feature.setStyle(style);
    if (!this.markerLayer) {
      this.markerLayer = new ol.layer.Vector({
        source: new ol.source.Vector()
      });
      this.map.addLayer(this.markerLayer);
    }
    this.markerLayer.getSource().addFeature(feature);
    return feature;
  };

  Openlayers_Map_Form.prototype.getMarker = function (markerId) {
    var ret, source;
    ret = null;
    if (!this.markerLayer) {
      return ret;
    }
    source = this.markerLayer.getSource();
    source.forEachFeature(function (feature) {
      if (feature.get("markerId") === markerId) {
        return ret = feature;
      }
    });
    return ret;
  };

  Openlayers_Map_Form.prototype.removeMarker = function (markerId) {
    var feature, source;
    feature = this.getMarker(markerId);
    if (feature) {
      source = this.markerLayer.getSource();
      source.removeFeature(feature);
      if (feature.get("markerId") === parseInt(this.popup.attr("dataId"))) {
        this.popup.hide();
      }
      return true;
    }
    return false;
  };

  Openlayers_Map_Form.prototype.removeClickMarker = function () {
    var feature, source;
    if (this.clickMarkerId) {
      feature = this.getMarker(this.clickMarkerId);
      source = this.markerLayer.getSource();
      source.removeFeature(feature);
      this.clickMarkerId = null;
      $(".mod-map .clicked").val("");
    }
  };

  Openlayers_Map_Form.prototype.renderEvents = function () {
    this.map.on('click', (function (_this) {
      return function (e) {
        var feature, pos;
        feature = _this.map.forEachFeatureAtPixel(e.pixel, function (feature, _layer) {
          return feature;
        });
        if (feature) {
          _this.showPopup(e, feature);
          return;
        }

        _this.removeClickMarker();
        pos = ol.proj.transform(e.coordinate, "EPSG:3857", "EPSG:4326");
        while (pos[0] < 180) {
          pos[0] += 360;
        }
        while (pos[0] > 180) {
          pos[0] -= 360;
        }
        _this.clickMarkerId = "click";
        _this.setMarker(pos, {
          image: _this.clickIcon,
          id: _this.clickMarkerId
        });
        return _this.setMapLoc($(".mod-map .clicked"), pos[0], pos[1]);
      };
    })(this));
    this.map.getView().on("propertychange", function(e) {
      if (e.key === 'resolution') {
        var zoom = this.getZoom();
        $('input[name="item[map_zoom_level]"]').val(zoom);
      }
    });
    $(".mod-map .add-marker").on('click', (function (_this) {
      return function (_e) {
        _this.clonePointForm();
        return false;
      };
    })(this));
    $(".mod-map .clear-marker").on('click', (function (_this) {
      return function (e) {
        var ele;
        ele = e.target;
        _this.clearPointForm($(ele).closest("dd.marker"));
        return false;
      };
    })(this));
    $(".mod-map .set-center-position").on('click', (function (_this) {
      return function () {
        var latlng = ol.proj.transform(_this.map.getView().getCenter(), 'EPSG:3857', 'EPSG:4326');
        var lat = Math.floor((latlng[1] * 1000000)) / 1000000;
        var lng = Math.floor((latlng[0] * 1000000)) / 1000000;
        $(".center-input").val(lng + "," + lat);
        return false;
      };
    })(this));
    $(".mod-map .set-zoom-level").on('click', (function (_this) {
      return function () {
        $(".zoom-input").val(_this.map.getView().getZoom());
        return false;
      };
    })(this));
    $(".mod-map .set-marker").on('click', (function (_this) {
      return function (e) {
        var ele;
        ele = e.target;
        _this.clickSetMarker($(ele).closest("dd.marker"));
        return false;
      };
    })(this));
    $(".mod-map .marker-name").on('keypress', function (e) {
      if (e.which === SS.KEY_ENTER) {
        return false;
      }
    });
    $(".mod-map .marker-loc-input").on('keypress', function (e) {
      if (e.which === SS.KEY_ENTER) {
        $(this).closest("dd.marker").find(".set-marker").trigger("click");
        return false;
      }
    });
    $(".mod-map .marker-loc-input").on('focus', (function (_this) {
      return function (_e) {
        _this.removeClickMarker();
      };
    })(this));
    $(".mod-map .select-marker-image").on("click", (function (_this) {
      return function (e) {
        var marker;
        marker = $(e.target).closest(".marker");
        _this.openMarkerImages(marker);
        return false;
      };
    })(this));

    $(".mod-map .images .image").on("click", (function (_this) {
      return function (e) {
        _this.selectMarkerImage(e.target);
        _this.setMarkerThumb($(e.target).closest(".marker"));
        return false;
      };
    })(this));

    var _this = this;
    $(".mod-map .marker-setting .marker").each(function () {
      _this.setMarkerThumb(this);
    });

    $(".location-search").hide();
  };

  Openlayers_Map_Form.prototype.clonePointForm = function () {
    var cln;
    if ($(".mod-map dd.marker").length < this.maxPointForm) {
      cln = $(".mod-map dd.marker:last").clone(false).insertAfter($(".mod-map dd.marker:last"));
      cln.attr("data-id", this.dataID);
      this.dataID += 1;
      cln.removeClass("active");
      cln.find("input,textarea").val("");
      cln.find(".marker-name").val("");
      cln.find(".clear-marker").on('click', function () {
        this.clearPointForm(cln);
        return false;
      }.bind(this));
      cln.find(".set-marker").on('click', function () {
        this.clickSetMarker(cln);
        return false;
      }.bind(this));
      cln.find(".marker-name, .marker-text").on("input", function() {
        var value = $(this).val();
        if (value.match(/<script/i)) {
          $(this).val(value.replace(/<script[^>]*>.*?<\/script>/gi, ''));
        }
      });
      cln.find(".marker-name").on('keypress', (function (_this) {
        return function (e) {
          if (e.which === SS.KEY_ENTER) {
            return false;
          }
        };
      })(this));
      cln.find(".marker-loc-input").on('keypress', function (e) {
        if (e.which === SS.KEY_ENTER) {
          $(e.target).closest("dd.marker").find(".set-marker").trigger("click");
          return false;
        }
      });
      cln.find(".marker-loc-input").on('focus', (function (_this) {
        return function (_e) {
          _this.removeClickMarker();
        };
      })(this));

      cln.find(".images").hide();
      cln.find(".select-marker-image").on("click", (function (_this) {
        return function (e) {
          var marker;
          marker = $(e.target).closest(".marker");
          _this.openMarkerImages(marker);
          return false;
        };
      })(this));
      cln.find(".marker-thumb").html($('<img src="' + this.markerIcon + '">'));
      cln.find(".images .image").on("click", (function (_this) {
        return function (e) {
          _this.selectMarkerImage(e.target);
          _this.setMarkerThumb($(e.target).closest(".marker"));
          return false;
        };
      })(this));
    }
    this.toggleAddMarker();
  };

  Openlayers_Map_Form.prototype.clickSetMarker = function (ele) {
    var loc;

    if ($(".mod-map .clicked").val() !== "") {
      loc = $(".mod-map .clicked").val();
      this.removeClickMarker();
    } else if (ele.find(".marker-loc-input").val() !== "") {
      loc = ele.find(".marker-loc-input").val();
    } else {
      return;
    }
    this.createMarker(ele, loc);
  };

  Openlayers_Map_Form.prototype.createMarker = function (ele, loc) {
    var dataId, opts, image;

    if (!Openlayers_Map_Form.validateLoc(loc)) {
      alert("正しい座標をカンマ(,)区切りで入力してください。\\n例）133.6806607,33.8957612");
      return;
    }

    ele.find(".marker-loc").val(loc);
    ele.find(".marker-loc-input").val(loc);
    ele.addClass("active");
    dataId = parseInt(ele.attr("data-id"));
    this.removeMarker(dataId);

    opts = {}
    opts["id"] = dataId;
    image = ele.find('[name="item[map_points][][image]"]').val();
    if (image) {
      opts["image"] = image;
    }
    this.setMarker(this.getMapLoc(ele.find(".marker-loc")), opts);
  };

  Openlayers_Map_Form.prototype.clearPointForm = function (ele) {
    var dataId;
    if (ele.find(".marker-loc").val() !== "") {
      if (confirm(this.deleteMessage)) {
        ele.removeClass("active");
        dataId = parseInt(ele.attr("data-id"));
        this.removeMarker(dataId);
        ele.find("input,textarea").val("");
        if ($(".mod-map dd.marker").length > 1) {
          ele.remove();
        }
      }
    } else {
      ele.removeClass("active");
      dataId = parseInt(ele.attr("data-id"));
      this.removeMarker(dataId);
      ele.find("input,textarea").val("");
      if ($(".mod-map dd.marker").length > 1) {
        ele.remove();
      }
    }
    this.toggleAddMarker();
  };

  Openlayers_Map_Form.prototype.toggleAddMarker = function () {
    if ($(".mod-map dd.marker").length < this.maxPointForm) {
      $(".mod-map dd .add-marker").parent().show();
    } else {
      $(".mod-map dd .add-marker").parent().hide();
    }
  };

  Openlayers_Map_Form.prototype.resize = function () {
    if (!this.markerLayer) {
      return;
    }

    var markerLength = this.markerLayer.getSource().getFeatures().length;
    if (markerLength >= 0) {
      // marker exists
      // set manually options and do fit
      var extent = this.markerLayer.getSource().getExtent();
      this.map.getView().fit(extent, this.map.getSize());
      this.map.getView().setZoom(this.getZoom());

      if (this.center) {
        this.setCenter(this.getCenter());
      }
      if (this.zoom) {
        this.setZoom(this.getZoom());
      }
    } else {
      // marker not exists
      // set manually or default options
      this.setCenter(this.getCenter());
      this.setZoom(this.getZoom());
    }
  };

  Openlayers_Map_Form.prototype.openMarkerImages = function (marker) {
    var markers = $(marker).closest(".marker-setting")
    var images = $(marker).find(".images");

    markers.find(".marker .images").hide();
    images.show();
    $("body").not(this).one("click", function (_e) {
      images.hide();
    });
  };

  Openlayers_Map_Form.prototype.selectMarkerImage = function (image) {
    var marker = $(image).closest(".marker");
    var images = $(image).closest(".images");
    var url = $(image).find('img').andSelf("img").attr("src");
    var loc;

    images.hide();
    marker.find('[name="item[map_points][][image]"]').val(url);

    loc = marker.find(".marker-loc-input").val();
    if (loc) {
      this.createMarker(marker, loc);
      return false;
    }

    loc = $(".mod-map .clicked").val();
    if (loc) {
      this.removeClickMarker();
      this.createMarker(marker, loc);
      return false;
    }

    return false;
  };

  Openlayers_Map_Form.prototype.setMarkerThumb = function (marker) {
    var thumb = $(marker).find(".marker-thumb");
    var url = $(marker).find('[name="item[map_points][][image]"]').val();

    if (url) {
      $(thumb).html($('<img src="' + url + '">'));
    } else {
      $(thumb).html($('<img src="' + this.markerIcon + '">'));
    }
  };

  Openlayers_Map_Form.prototype.validateZoom = function (zoom) {
    if (zoom >= 3 && zoom <= 18) {
      return true;
    } else {
      return false;
    }
  };

  Openlayers_Map_Form.prototype.validateLatLon = function (lat, lon) {
    if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
      return true;
    } else {
      return false;
    }
  };

  return Openlayers_Map_Form;
})();
