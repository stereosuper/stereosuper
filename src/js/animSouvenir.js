var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

module.exports = function(){
    var coverDs = $('.portfolio-cover'), coverMb = $('.portfolio-cover-mb');

    function createTlCover(cover){
        if(!cover.hasClass('souvenir') || !cover.is(':visible')) return;

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

        var image = cover.find('img');
        var noise = cover.hasClass('portfolio-cover') ? cover.find('#noise') : cover.find('#noise-mb');
        var color = {sepia: 0, brightness: 1}, opacity = cover.hasClass('portfolio-cover') ? 0.4 : 0.5;
        var addDust = new TimelineMax();

        addDust
            .to(color, 0.5, {brightness: 2, delay: 0.5, ease: Power2.easeOut, onUpdate: applyBrightness, onUpdateParams: [image]})
            .to(color, 0.1, {brightness: 0, onUpdate: applyBrightness, onUpdateParams: [image]})
            .set(noise, {opacity: opacity})
            .to(color, 1, {sepia: 1, onUpdate: applySepia, onUpdateParams: [image]});
    }

    createTlCover(coverDs);
    createTlCover(coverMb);
}
