var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

var sinusoid = require('./sinusoid.js');
var throttle = require('./throttle.js');
window.requestAnimFrame = require('./requestAnimFrame.js');
//var getPosWithoutTranslate = require('./getPosWithoutTranslate.js');

module.exports = function(myScroll, windowHeight, windowWidth, portfolioItems, portfolio, body){
    var areaReaction, strength = 0.6/*, strengthRotation = 0.05*/;
    var exp, thisPos, thisTitle;
    var positionItem, xValue;
    var tlPortolioItemHover = new TimelineMax();

    /*function calcExp(exp, i){
        expS = exp*strengthRotation;
        return [expS, i%2 === 0 ? expS : -expS];
    }*/

    function portfolioItemsAnimation(){
        if(!body.hasClass('home')) return;

        myScroll = $(document).scrollTop();

        windowHeight = $(window).height();
        windowWidth = $(window).outerWidth();
        areaReaction = windowHeight > 767 ? 200 : 100;

        portfolioItems.each(function(i){
            //thisPos = getPosWithoutTranslate($(this));
            thisPos = $(this).offset().top;
            thisTitle = $(this).find('h2');
            thisDesc = $(this).find('.wrapper-desc');
            positionItem = thisPos - myScroll;

            if(thisPos >= myScroll+windowHeight-areaReaction){
                exp = (positionItem-windowHeight+areaReaction)*strength | 0;
                TweenMax.to(thisDesc, 1, {opacity: 0});
            }else if(thisPos <= myScroll+areaReaction) {
                exp = (positionItem-areaReaction)*strength | 0;
                TweenMax.to(thisDesc, 1, {opacity: 0});
            }else{
                exp = 0;
                // var degRotation = 5;
                // var distanceParcourue = thisPos - areaReaction;
                // var rotationItem = (distanceParcourue * degRotation) / areaReaction;
                TweenMax.to(thisDesc, 1, {opacity: 1});
            }
            // positionItem = $(this).position().top + myScroll;

            // TweenMax.to(thisTitle, 0.1, {y: exp});
            //console.log('positionItem de '+i+' : '+positionItem+', sa sinusoid : '+sinusoid(250, 0, positionItem, 30));
            xValue = windowWidth > 780 ? sinusoid(250, 0, positionItem, 30) : 0;
            TweenMax.to(thisTitle, 0.1, {y: exp, x: xValue});
        });

        // requestAnimFrame(portfolioItemsAnimation);
    }
    portfolioItemsAnimation();

    var scrollHandler = throttle(function(){
        requestAnimFrame(portfolioItemsAnimation);
    }, 40);

    $(document).on('scroll', scrollHandler);
    $(window).on('resize', scrollHandler);

    // TweenMax.set($('.offset'), {'height': areaReaction+'px'});

    ////////////////////////////////////////////////
    // Hover portfolio items
    ////////////////////////////////////////////////

    portfolio.on('mouseenter focusin', '.portfolio-item', function(){
        if(!$(this).hasClass('off')){
            opacityItemHover = $(this).hasClass('lbb-item') ? 0.75 : 0.3;

            TweenMax.set($(this).find('.wrapper-bloc'), {css: {rotation: '0.01deg', z: 0.01, force3D: true}});
            TweenMax.to([$(this).find('.bg'), $(this).find('.wrapper-bg-img')], 0.3, {css: {scale: 1.05, rotation: '0.01deg', z: 0.01, force3D: true}, ease: Power1.easeInOut});
            TweenMax.to($(this).find('.bg-img'), 0.3, {css: {opacity: opacityItemHover, scale: 1, rotation: '0.01deg', z: 0.01, force3D: true}, ease: Power1.easeInOut});
        }
    }).on('mouseleave focusout', '.portfolio-item', function(){
        if(!$(this).hasClass('off')){
            opacityItemLeave = $(this).hasClass('lbb-item') ? 0.6 : 0.15;

            TweenMax.set($(this).find('.wrapper-bloc'), {css: {clearProps: 'rotation', force3D: true}});
            TweenMax.to([$(this).find('.bg'), $(this).find('.wrapper-bg-img')], 0.25, {css: {scale: 1, rotation: '0.01deg', z: 0.01, force3D: true}, ease: Power1.easeInOut});
            TweenMax.to($(this).find('.bg-img'), 0.25, {css: {opacity: opacityItemLeave, scale: 1.05, rotation:  '0.01deg', z: 0.01, force3D: true}, ease: Power1.easeInOut});
        }
    });

}
