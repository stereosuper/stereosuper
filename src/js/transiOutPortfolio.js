var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

var animSkillsIn = require('./animSkillsIn.js');

module.exports = function(oldContainer){
    var portfolioText = oldContainer.find('.portfolio-text'), portfolioRole = oldContainer.find('.portfolio-role'), portfolioHeader = oldContainer.find('.portfolio-header'),
        bgPortfolio = oldContainer.find('.bgPortfolio'), bgPagePortfolio = oldContainer.find('.bgPagePortfolio');

    return new Promise( function(resolve, reject) {
        var tlFadeOut = new TimelineMax({paused: true, onComplete: function(){
            resolve(true);
        }});

        tlFadeOut.set(
            [$('#barba-wrapper'), $('body')], {className: '-= on'}
        ).add([
            TweenMax.to(portfolioText.find('h1'), 0.25, {y: -40, opacity: 0, ease: Circ.easeOut}),
            TweenMax.to(oldContainer.find('.portfolio-cover'), 0.25, {x: -40, opacity: 0, ease: Power4.easeOut})
        ]).add([
            TweenMax.set(bgPortfolio, {transformOrigin: '50% 0%'}),
            TweenMax.set(bgPagePortfolio, {transformOrigin: '50% 100%'}),
            TweenMax.to(bgPortfolio, 0.25, {scaleY: 0}),
            TweenMax.to(bgPagePortfolio, 0.25, {scaleY: 0})
        ]);

        TweenMax.to([portfolioHeader.find('.btn-close'), portfolioHeader.find('.previous-next-references')], 0.1, {opacity: 0, ease: Power4.easeOut});
        TweenMax.to(portfolioRole.find('a'), 0.25, {y: -80, opacity: 0, ease: Circ.easeOut});
        TweenMax.to(oldContainer.find('.skills'), 0.25, {y: -80, opacity: 0, ease: Circ.easeOut, delay: 0.1});
        TweenMax.to(portfolioRole.find('p'), 0.25, {y: -80, opacity: 0, ease: Circ.easeOut, delay: 0.25});
        TweenMax.to(portfolioText.find('p'), 0.15, {y: -80, opacity: 0, ease: Power4.easeOut, delay: 0.3, onComplete: function(){
            $('#header').removeClass('bgVisible');
            tlFadeOut.play();
        }});
    });
};
