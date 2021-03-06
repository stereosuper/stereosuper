var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var mapboxgl = require('mapbox-gl');

var throttle = require('./throttle.js');

module.exports = function(){
    function transform(x, y, centerX, centerY, maxX, maxY){
        var deltaX = centerX - x, deltaY = centerY - y,
            tX = deltaX < maxX ? deltaX : maxX, tY = deltaY > maxY ? deltaY : maxY,
            angle = 220 - Math.atan2(tX, tY) * 180 / Math.PI;

        return 'translate3d(' + tX + 'px, ' + tY + 'px, 0) rotate(' + angle + 'deg)';
    }

    var coordinates = $(window).outerWidth() < 1100 ? [-1.59, 47.23] : [-1.62, 47.23];

    var geojson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "message": "Stéréosuper",
                    "iconSize": [30, 35]
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-1.556806, 47.225944]
                }
            }
        ]
    };

    mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlcmVvc3VwZXIiLCJhIjoiY2lyM2JnMDIwMDAxM2k0bWNndmUzeTFhbSJ9.UZ-XuPASxGVtYFSqdVyppg';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/stereosuper/ciuqyq3oc00so2jl8t50ltwwl',
        center: coordinates,
        zoom: 12,
        interactive: false
    });

    geojson.features.forEach(function(marker){
        var elMarker = document.createElement('div');
        elMarker.className = 'marker';

        new mapboxgl.Marker(elMarker, {offset: [-marker.properties.iconSize[0] / 2, -marker.properties.iconSize[1] / 2]})
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    });

    map.on('load', function(){
        var mapHtml = $('#map'), marker = mapHtml.find('.marker'), hand, handWidth, handHeight;
        var canvas = mapHtml.find('.mapboxgl-canvas-container');
        var markerHeight = marker.height(), markerHalfWidth = marker.width()/2;
        var markerY, markerX, mouseX, mouseY;

        canvas.addClass('on').append('<div class="hand"></div>');

        hand = mapHtml.find('.hand');
        handWidth = hand.width();
        handHeight = hand.height();
        markerY = marker.offset().top + markerHeight;
        markerX = marker.offset().left + markerHalfWidth;
        hand.css({'left': markerX - handWidth - 50 + 'px', 'top': markerY - handHeight - 50 + 'px'}).addClass('on');

        mapHtml.on('mousemove resize', function(e){
            markerY = marker.offset().top + markerHeight;
            markerX = marker.offset().left + markerHalfWidth;
            mouseX = e.clientX;
            mouseY = e.clientY;

            if((mouseX > markerX - 10 && mouseX < markerX + 10) && (mouseY > markerY - 10 && mouseY < markerY + 10)){
                return;
            }

            hand.css({
                'left': markerX - handWidth + 'px',
                'top': markerY - handHeight + 'px',
                'transform': transform(mouseX, mouseY, markerX, markerY, (mapHtml.width() - marker.offset().left - handWidth/4), -(marker.offset().top/2))
            });
        });
    });

    $(window).on('resize', throttle(function(){
        coordinates = $(window).outerWidth() < 1100 ? [-1.59, 47.23] : [-1.62, 47.23];
        map.flyTo({center: coordinates});
    }, 100));
}


