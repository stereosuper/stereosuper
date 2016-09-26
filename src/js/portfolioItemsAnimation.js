var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/minified/TweenMax.min.js');

var getPosWithoutTranslate = require('./getPosWithoutTranslate.js');

module.exports = function(myScroll){
    var areaReaction = 200;
    var strength = 0.6;
    var strengthRotation = 0.05;
    var portfolioItems = $('.portfolio-items li');
    var exp, expR;

    // Request anim frame
    (function portfolioItemsAnimation(){
        myScroll = $(document).scrollTop();
        windowWidth = $(window).width();
        windowHeight = $(window).height();
        portfolioItems.each(function(i) {
            if (getPosWithoutTranslate($(this))>=myScroll+windowHeight-areaReaction) {
                exp = Math.round((getPosWithoutTranslate($(this))-myScroll-windowHeight+areaReaction)*strength);
                expR = i%2 === 0 ? exp*strengthRotation : -(exp*strengthRotation);
                TweenMax.set($(this).find('h2'), {y: exp, rotation: expR});
            } else if(getPosWithoutTranslate($(this))<=myScroll+areaReaction) {
                exp = Math.round((getPosWithoutTranslate($(this))-myScroll-areaReaction)*strength);
                expR = i%2 === 0 ? exp*strengthRotation : -(exp*strengthRotation);
                TweenMax.set($(this).find('h2'), {y: exp, rotation: expR});
            } else {
                TweenMax.set($(this).find('h2'), {y: 0, rotation: 0});
            }
        });
        requestAnimFrame(portfolioItemsAnimation);
    })();
    // TweenMax.set($('.offset'), {'height': areaReaction+'px'});
}