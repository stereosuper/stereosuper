var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

module.exports = function(lastClickedLink){
    var tlFadeOut, tpsTransition = 0.5;

    return new Promise( function(resolve, reject) {
        tlFadeOut = new TimelineMax({onComplete: function(){
            resolve(true);
        }});
        $(lastClickedLink).find('h2').prepend('<span class="bg-transition"></span>');
        var gapLeft = $(lastClickedLink).find('h2').offset().left;
        var gapRight = $(window).outerWidth() - gapLeft - $(lastClickedLink).find('h2').outerWidth();
        tlFadeOut.to($('.portfolio-item .bg-img'), 0, {opacity: 0, ease: Power4.easeOut});
        tlFadeOut.set($(lastClickedLink).find('.bg'), {className: '+=transi'})
        tlFadeOut.set($(lastClickedLink).find('.bg-transition'), {left: -gapLeft+'px', right: -gapRight+'px', scaleX: 0, scaleY: 1});
        var twFadeOut1 = new TweenMax.to($(lastClickedLink).find('.bg-transition'), 0.4, {scaleX: 1, scaleY: 1.05, ease: Power4.easeOut});
        var twFadeOut2 = new TweenMax.to($(lastClickedLink).find('.logo'), 0.2, {y: 40, opacity: 0, ease: Linear.easeNone});
        var twFadeOut3 = new TweenMax.to([$(lastClickedLink).find('time'), $(lastClickedLink).find('.title')], 0.4, {x: 60, opacity: 0, ease: Circ.easeOut});
        var twFadeOut4 = new TweenMax.to($(lastClickedLink).find('.border-left'), 0.4, {scaleY: 0, ease: Circ.easeOut});
        var twFadeOut5 = new TweenMax.to($(lastClickedLink).find('.border-middle'), 0.4, {scaleX: 0, ease: Circ.easeOut});
        tlFadeOut.add(
            [
                twFadeOut1,
                twFadeOut2,
                twFadeOut3,
                twFadeOut4,
                twFadeOut5
            ]
        );
    });
};
