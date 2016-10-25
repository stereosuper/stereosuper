var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var sinusoid = require('./sinusoid.js');

var getPosWithoutTranslate = require('./getPosWithoutTranslate.js');

module.exports = function(myScroll, windowHeight, portfolioItems){
    var areaReaction = 200, strength = 0.6, strengthRotation = 0.05;
    var exp, expR, thisPos, thisTitle;
    var lastScroll = myScroll;
    var positionItem, xValue;

    /*function calcExp(exp, i){
        expS = exp*strengthRotation;
        return [expS, i%2 === 0 ? expS : -expS];
    }*/

    (function portfolioItemsAnimation(){

        myScroll = $(document).scrollTop();

        if(myScroll !== lastScroll){
            windowHeight = $(window).height();
            windowWidth = $(window).width();
            portfolioItems.each(function(i) {
                thisPos = getPosWithoutTranslate($(this));
                thisTitle = $(this).find('h2');
                thisDesc = $(this).find('.wrapper-desc');

                if (thisPos >= myScroll+windowHeight-areaReaction) {
                    exp = (thisPos-myScroll-windowHeight+areaReaction)*strength | 0;
                    TweenMax.to(thisDesc, 1, {opacity: 0});
                } else if(thisPos <= myScroll+areaReaction) {
                    exp = (thisPos-myScroll-areaReaction)*strength | 0;
                    TweenMax.to(thisDesc, 1, {opacity: 0});
                } else {
                    exp = 0;
                    var degRotation = 5;
                    var distanceParcourue = thisPos - areaReaction;
                    var rotationItem = (distanceParcourue * degRotation) / areaReaction;


                    TweenMax.to(thisDesc, 1, {opacity: 1});
                }
                //TweenMax.set(thisTitle, {y: exp});
                positionItem = $(this).position().top + myScroll;
                xValue = (windowWidth > 780) ? sinusoid(150, 0, positionItem, 50) : 0;
                //TweenMax.set(thisTitle, {y: exp, x: xValue});
                TweenMax.to(thisTitle, 0.1, {y: exp, x: xValue});
            });
        }

        lastScroll = myScroll;

        requestAnimFrame(portfolioItemsAnimation);
    })();

    // TweenMax.set($('.offset'), {'height': areaReaction+'px'});

    ////////////////////////////////////////////////
    // Hover portfolio items
    ////////////////////////////////////////////////

    var tlPortolioItemHover = new TimelineMax();
    $('.portfolio-item').on('mouseenter', function(){
        TweenMax.set($(this).find('.wrapper-bloc'), {css:{rotation: '0.01deg', z: 0.01, force3D: true}});
        TweenMax.to([$(this).find('.bg'), $(this).find('.wrapper-bg-img')], 0.3, {css:{scale: 1.05, rotation: '0.01deg', z: 0.01, force3D: true}, ease: Power1.easeInOut});
        TweenMax.to($(this).find('.bg-img'), 0.3, {css:{opacity: 0.3, scale: 1, rotation: '0.01deg', z: 0.01, force3D: true}, ease: Power1.easeInOut});
    }).on('mouseleave', function(){
        TweenMax.set($(this).find('.wrapper-bloc'), {css:{clearProps: 'rotation', force3D: true}});
        TweenMax.to([$(this).find('.bg'), $(this).find('.wrapper-bg-img')], 0.25, {css:{scale: 1, rotation: '0.01deg', z: 0.01, force3D: true}, ease: Power1.easeInOut});
        TweenMax.to($(this).find('.bg-img'), 0.25, {css:{opacity: 0.15, scale: 1.05, rotation:  '0.01deg', z: 0.01, force3D: true}, ease: Power1.easeInOut});
    });

}
