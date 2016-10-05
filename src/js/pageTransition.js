var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

module.exports = function(lastClickedLink){
    return Barba.BaseTransition.extend({
        start: function(){
            Promise
                .all([this.newContainerLoading, this.fadeOut()])
                .then(this.fadeIn.bind(this));
        },

        fadeOut: function(){
            var tlFadeOut,
                tpsTransition = 0.5;
            return new Promise( function(resolve, reject) {
                tlFadeOut = new TimelineMax({onComplete: function(){
                    resolve(true);
                }});
                $(lastClickedLink).find('h2').prepend('<span class="bg-transition"></span>');
                var gapLeft = $(lastClickedLink).find('h2').offset().left;
                var gapRight = $(window).width() - gapLeft - $(lastClickedLink).find('h2').outerWidth();
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
        },

        fadeIn: function(){
            var _this = this;
            var $el = $(this.newContainer);
            var tlFadeIn
                tpsTransitionFadeIn = 0.3;

            tlFadeIn = new TimelineMax({onComplete: function(){
                _this.done();
            }});

            tlFadeIn.set($('body'), {className: '-='+$(this.oldContainer).data('class')});
            tlFadeIn.set($('body'), {className: '+='+$el.data('class')});
            tlFadeIn.set($el, {visibility: 'visible', opacity: 0, onComplete: function(){
                $(document).scrollTop(0);
            }});
            tlFadeIn.set($el, {opacity: 1});
            var twFadeIn1 = new TweenMax.to($('.bgPortfolio'), 0.5, {scaleY:1, ease: Power4.easeOut});
            var twFadeIn2 = new TweenMax.to($('.bgPagePortfolio'), 0.5, {scaleY:1, ease: Power4.easeOut});
            var twFadeIn3 = new TweenMax.to($('.portfolio-text h1'), 0.5, {y: 0, opacity: 1, ease: Circ.easeOut});
            tlFadeIn.add(
                [
                    twFadeIn1,
                    twFadeIn2,
                    twFadeIn3
                ]
            );
            tlFadeIn.set($('#header'), {className: '+= bgVisible'});

            var twFadeIn4 = new TweenMax.to([$('.portfolio-text p')], 0.3, {y: 0, opacity: 1, ease: Power4.easeOut});
            var twFadeIn5 = new TweenMax.to([$('.portfolio-cover')], 0.3, {x: 0, opacity: 1, ease: Power4.easeOut});
            tlFadeIn.add(
                [
                    twFadeIn4,
                    twFadeIn5
                ]
            );
            tlFadeIn.staggerTo([$('.portfolio-role p'), $('.portfolio-role a')], 0.5, {y: 0, opacity: 1, ease: Circ.easeOut}, 0.1);

            $(this.oldContainer).hide();
        }
    })
};
