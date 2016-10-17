var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');
var animSkillsIn = require('./animSkillsIn.js');

module.exports = function(aze){
    var _this = aze;
    var $el = $(aze.newContainer);
    var tlFadeIn
        tpsTransitionFadeIn = 0.3;

    tlFadeIn = new TimelineMax({onComplete: function(){
        _this.done();
    }});

    tlFadeIn.set($('body'), {className: '-='+$(aze.oldContainer).data('class')});
    tlFadeIn.set($('body'), {className: '+='+$el.data('class')});
    tlFadeIn.set($el, {visibility: 'visible', opacity: 0, onComplete: function(){
        $(document).scrollTop(0);
    }});
    tlFadeIn.set($el, {opacity: 1});
    var twFadeIn1 = new TweenMax.to($('.bgPortfolio'), 0.5, {scaleY:1, ease: Power4.easeOut});
    var twFadeIn2 = new TweenMax.to($('.bgPagePortfolio'), 0.5, {scaleY:1, ease: Power4.easeOut});
    var twFadeIn3 = new TweenMax.to($('.portfolio-text h1'), 0.5, {y: 0, opacity: 1, ease: Circ.easeOut});
    var twFadeIn4 = new TweenMax.to([$('.portfolio-cover')], 0.5, {x: 0, opacity: 1, ease: Power4.easeOut, delay: 0.3});
    tlFadeIn.add(
        [
            twFadeIn1,
            twFadeIn2,
            twFadeIn3,
            twFadeIn4
        ]
    );
    tlFadeIn.set($('#header'), {className: '+= bgVisible'});

    var twFadeIn5 = new TweenMax.to([$('.portfolio-text p')], 0.3, {y: 0, opacity: 1, ease: Power4.easeOut});
    tlFadeIn.add(
        [
            twFadeIn5
        ]
    );
    var tableSkillsApparition = animSkillsIn();
    tlFadeIn.staggerTo($('.portfolio-role p'), 0.5, {y: 0, opacity: 1, ease: Circ.easeOut}, 0.1);
    tlFadeIn.to($('.skills'), 0.5, {y: 0, opacity: 1, ease: Circ.easeOut});
    tlFadeIn.add(
        tableSkillsApparition
    );
    tlFadeIn.to($('.portfolio-role a'), 0.5, {y: 0, opacity: 1, ease: Circ.easeOut});

    $(aze.oldContainer).hide();
};
