var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

module.exports = function(){
    var color = {sepia: 0, brightness: 1};
    var cover = $('.portfolio-cover');
    var image = cover.find('img');
    var noise = $('#noise');

    var addDust = new TimelineMax();

    function applyBrightness(elt){
        elt.css({
            '-webkit-filter': 'brightness(' + color.brightness + ')',
            'filter': 'brightness(' + color.brightness + ')'
        });
    }

    function applySepia(elt){
        elt.css({
            '-webkit-filter': 'sepia(' + color.sepia + ')',
            'filter': 'sepia(' + color.sepia + ')'
        });
    }

    if(cover.hasClass('souvenir')){
        addDust
            .to(color, 0.5, {brightness: 2, delay: 0.5, ease: Power2.easeOut, onUpdate: applyBrightness, onUpdateParams: [image]})
            .to(color, 0.1, {brightness: 0, onUpdate: applyBrightness, onUpdateParams: [image]})
            .set(noise, {opacity: 0.4})
            .to(color, 1, {sepia: 1, onUpdate: applySepia, onUpdateParams: [image]});
    }
}
