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
                tlFadeOut.to([$('#skillsHome'), $(lastClickedLink).parents('.portfolio-item').siblings(), $('#blockTitle'), $('#video')], tpsTransition, {className: '+=pageTransition'});
                tlFadeOut.to([$('.portfolio-item .bg'), $(lastClickedLink).find('> div')], tpsTransition, {className: '+=pageTransition'});
                tlFadeOut.to([$(lastClickedLink).find('h2')], tpsTransition, {className: '+=pageTransition'});
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
