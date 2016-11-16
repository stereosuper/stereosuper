var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

var animSkillsIn = require('./animSkillsIn.js');

module.exports = function(newContainer, aze){
    var portfolioText = $('.portfolio-text');

    function fadeInPartTwo(){
        var tableSkillsApparition = animSkillsIn(newContainer);
        var tlSkillsApparition = new TimelineMax();
        var portfolioRole = $('.portfolio-role');

        TweenMax.to(portfolioRole.find('p'), 0.4, {y: 0, opacity: 1, ease: Circ.easeOut});
        TweenMax.to($('.skills'), 0.4, {y: 0, opacity: 1, ease: Circ.easeOut, delay: 0.2});
        TweenMax.to(portfolioText.find('.btn-close'), 0.1, {opacity: 1, ease: Power4.easeOut, delay: 0.9});

        tlSkillsApparition.add( tableSkillsApparition );

        TweenMax.to(portfolioRole.find('.btn'), 0.3, {y: 0, opacity: 1, ease: Circ.easeOut, delay: 0.4, onComplete: function(){
            if(aze !== undefined){
                aze.done();
            }
        }});
    }

    var tlFadeIn = new TimelineMax({onComplete: fadeInPartTwo});

    // var twFadeIn1 = TweenMax.to($('.bgPortfolio'), 0.5, {scaleY: 1, ease: Power4.easeOut});
    // var twFadeIn2 = TweenMax.to($('.bgPagePortfolio'), 0.5, {scaleY: 1, ease: Power4.easeOut});
    // var twFadeIn3 = TweenMax.set($('body'), {className: '+= on'});
    // var twFadeIn4 = TweenMax.to(portfolioText.find('h1'), 0.5, {y: 0, opacity: 1, ease: Circ.easeOut});
    // var twFadeIn5 = TweenMax.set($('#header'), {className: '+= bgVisible'});
    // var twFadeIn6 = TweenMax.to([$('.portfolio-cover')], 0.5, {x: 0, opacity: 1, ease: Power4.easeOut, delay: 0.3});

    // tlFadeIn.add([
    //     twFadeIn1, twFadeIn2, twFadeIn3, twFadeIn4, twFadeIn5, twFadeIn6
    // ]);

    tlFadeIn.add([
        TweenMax.to($('.bgPortfolio'), 1, {scaleY: 1, ease: Power4.easeOut}),
        TweenMax.to($('.bgPagePortfolio'), 1, {scaleY: 1, ease: Power4.easeOut}),
        TweenMax.set($('#barba-wrapper'), {className: '+= on', delay: 1}),
        TweenMax.to(portfolioText.find('h1'), 0.2, {y: 0, opacity: 1, ease: Circ.easeOut, delay: 0.5}),
        TweenMax.set($('#header'), {className: '+= bgVisible', delay: 0.5}),
        TweenMax.to($('.portfolio-cover'), 0.5, {x: 0, opacity: 1, ease: Power4.easeOut, delay: 0.5}),
        TweenMax.to(portfolioText.find('p'), 0.4, {y: 0, opacity: 1, ease: Power4.easeOut, delay: 0.6})
    ]);
};
