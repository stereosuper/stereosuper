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
                //tlFadeOut.to([$('#skillsHome'), $(lastClickedLink).parents('.portfolio-item').siblings(), $('#blockTitle'), $('#video')], tpsTransition, {className: '+=pageTransition'});
                //tlFadeOut.to([$('.portfolio-item .bg'), $(lastClickedLink).find('> div')], tpsTransition, {className: '+=pageTransition'});
                //tlFadeOut.to([$(lastClickedLink).find('h2')], tpsTransition, {className: '+=pageTransition'});
                $(lastClickedLink).find('h2').prepend('<span class="bg-transition"></span>');
                var gapLeft = $(lastClickedLink).find('h2').offset().left;
                var gapRight = $(window).width() - gapLeft - $(lastClickedLink).find('h2').outerWidth();
                tlFadeOut.to($('.portfolio-item .bg-img'), 0, {opacity: 0, ease: Power4.easeOut});
                tlFadeOut.set($(lastClickedLink).find('.bg'), {className: '+=transi'})
                tlFadeOut.set($(lastClickedLink).find('.bg-transition'), {left: -gapLeft+'px', right: -gapRight+'px', scaleX: 0, scaleY: 1});
                var tw1 = new TweenMax.to($(lastClickedLink).find('.bg-transition'), 0.4, {scaleX: 1, scaleY: 1.05, ease: Power4.easeOut});
                var tw2 = new TweenMax.to($(lastClickedLink).find('.logo'), 0.2, {y: 20, opacity: 0, ease: Linear.easeNone});
                tlFadeOut.add(
                    [
                        tw1,
                        tw2
                    ], '+=0', 'sequence'
                );
                
                //tlFadeOut.to(afterPortfolioItem, 0.4, {background: 'red', ease: Power4.easeOut});
                //tlFadeOut.to($(lastClickedLink).find(), 0.4, {ease: Power4.easeOut});
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
            tlFadeIn.to($('body'), tpsTransitionFadeIn, {className: '+='+$el.data('class')});
            tlFadeIn.set($el, {visibility: 'visible', opacity: 0, onComplete: function(){
                $(document).scrollTop(0);
            }});
            tlFadeIn.to($el, tpsTransitionFadeIn, {opacity: 1});
            console.log($('#page'));
            tlFadeIn.to([$('.portfolio-text h1'), $('.portfolio-text p'), $('.portfolio-role'), $('.portfolio-cover'), $('.barba-container')], tpsTransitionFadeIn, {className: '+=pageTransitionFadeIn'});

            $(this.oldContainer).hide();
        }
    })
};
