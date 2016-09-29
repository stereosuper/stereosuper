var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

var getPosWithoutTranslate = require('./getPosWithoutTranslate.js');

module.exports = function(myScroll, windowHeight, portfolioItems){
    var areaReaction = 200, strength = 0.6, strengthRotation = 0.05;
    var exp, expR, thisPos, thisTitle;
    var lastScroll = myScroll;

    function calcExp(exp, i){
        expS = exp*strengthRotation;
        return [expS, i%2 === 0 ? expS : -expS];
    }

    (function portfolioItemsAnimation(){
        myScroll = $(document).scrollTop();

        if(myScroll !== lastScroll){
            windowHeight = $(window).height();
            portfolioItems.each(function(i) {
                thisPos = getPosWithoutTranslate($(this));
                thisTitle = $(this).find('h2');
                thisDesc = $(this).find('a >div');

                if (thisPos >= myScroll+windowHeight-areaReaction) {
                    exp = (thisPos-myScroll-windowHeight+areaReaction)*strength | 0;
                    expResult = calcExp(exp, i);
                    TweenMax.to(thisDesc, 1, {opacity: 0});
                } else if(thisPos <= myScroll+areaReaction) {
                    exp = (thisPos-myScroll-areaReaction)*strength | 0;
                    expResult = calcExp(exp, i);
                    TweenMax.to(thisDesc, 1, {opacity: 0});
                } else {
                    expResult = [0, 0];
                    TweenMax.to(thisDesc, 1, {opacity: 1});
                }
                TweenMax.set(thisTitle, {y: expResult[0], rotation: expResult[1]});
            });
        }

        lastScroll = myScroll;

        requestAnimFrame(portfolioItemsAnimation);
    })();
    // TweenMax.set($('.offset'), {'height': areaReaction+'px'});
}
