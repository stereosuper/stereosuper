var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');
var animSkillsIn = require('./animSkillsIn.js');

module.exports = function(aze){
    var tlFadeOut;

    // function fadeOutPartTwo(){

    // }

    return new Promise( function(resolve, reject) {
        var twFadeOut1 = new TweenMax.to($('.bgPortfolio'), 0.25, {scaleY:0, ease: Power4.easeOut});
        var twFadeOut2 = new TweenMax.to($('.bgPagePortfolio'), 0.25, {scaleY:0, ease: Power4.easeOut});
        var twFadeOut3 = new TweenMax.to($('.portfolio-text').find('h1'), 0.25, {y: -40, opacity: 0, ease: Circ.easeOut, delay: 0.15});
        var twFadeOut4 = new TweenMax.to([$('.portfolio-cover')], 0.25, {x: -40, opacity: 0, ease: Power4.easeOut});

        tlFadeOut = new TimelineMax({paused: true, onComplete: function(){
-            resolve(true);
        }});

        tlFadeOut.add([
            twFadeOut1, twFadeOut2, twFadeOut3, twFadeOut4
        ]);

        TweenMax.to($('.portfolio-role').find('a'), 0.25, {y: -80, opacity: 0, ease: Circ.easeOut});
        TweenMax.to($('.skills'), 0.25, {y: -80, opacity: 0, ease: Circ.easeOut, delay: 0.1});
        TweenMax.staggerTo($('.portfolio-role').find('p'), 0.25, {y: -80, opacity: 0, ease: Circ.easeOut, delay: 0.25}, 0.05);
        TweenMax.to([$('.portfolio-text').find('p')], 0.15, {y: -80, opacity: 0, ease: Power4.easeOut, delay: 0.3, onComplete: function(){
            TweenMax.set($('#header'), {className: '-= bgVisible'});
            tlFadeOut.play();
        }});
    });
};
