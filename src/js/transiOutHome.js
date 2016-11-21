var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

module.exports = function(lastClickedLink, oldContainer){
    var tlFadeOut;

    return new Promise( function(resolve, reject){
        $('.skill.off').removeClass('off');
        $('.skills.selected').removeClass('selected');
        $('.skills').data('skill-selected', '');
        if(lastClickedLink !== undefined && lastClickedLink.parents('.portfolio-item').length){
            lastClickedLink.find('h2').prepend('<span class="bg-transition"></span>');

            var gapLeft = lastClickedLink.find('h2').offset().left;
            var gapRight = $(window).outerWidth() - gapLeft - lastClickedLink.find('h2').outerWidth();

            tlFadeOut = new TimelineMax({onComplete: function(){
                resolve(true);
            }});

            $('#portfolio').off('mouseleave focusout');

            tlFadeOut
                .set(lastClickedLink.find('.wrapper-bloc'), {css: {rotation: '0.01deg', z: 0.01, force3D: true}})
                .set($('.portfolio-item').find('.bg-img'), {opacity: 0})
                .set(lastClickedLink.find('.bg'), {className: '+=transi'})
                .set(lastClickedLink.find('.bg-transition'), {left: -gapLeft+'px', right: -gapRight+'px', scaleX: 0, scaleY: 1})
                .add([
                    TweenMax.to(lastClickedLink.find('.bg-transition'), 0.4, {scaleX: 1, scaleY: 1.05, ease: Power4.easeOut}),
                    TweenMax.to(lastClickedLink.find('.logo'), 0.2, {y: 40, opacity: 0, ease: Linear.easeNone}),
                    TweenMax.to([lastClickedLink.find('time'), lastClickedLink.find('.title')], 0.4, {x: 60, opacity: 0, ease: Circ.easeOut}),
                    TweenMax.to(lastClickedLink.find('.border-left'), 0.4, {scaleY: 0, ease: Circ.easeOut}),
                    TweenMax.to(lastClickedLink.find('.border-middle'), 0.4, {scaleX: 0, ease: Circ.easeOut})
                ]);
        }else{
            TweenMax.to(oldContainer, 0.5, {opacity: 0, onComplete: function(){
                resolve(true);
            }});
        }
    });
};
