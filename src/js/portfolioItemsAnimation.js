var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/minified/TweenMax.min.js');

var getPosWithoutTranslate = require('./getPosWithoutTranslate.js');

module.exports = function(myScroll, portfolioItems){
    var areaReaction = 200;
    var strength = 0.6;
    var strengthRotation = 0.05;
    var exp, expR, thisPos, thisTitle;

    function calcExp(exp, i){
        expS = exp*strengthRotation;
        return [expS, i%2 === 0 ? expS : -expS];
    }

    (function portfolioItemsAnimation(){
        myScroll = $(document).scrollTop();
        windowHeight = $(window).height();

        portfolioItems.each(function(i) {
            thisPos = getPosWithoutTranslate($(this));
            thisTitle = $(this).find('h2');

            if (thisPos >= myScroll+windowHeight-areaReaction) {
                exp = (thisPos-myScroll-windowHeight+areaReaction)*strength | 0;
                expResult = calcExp(exp, i);
            } else if(thisPos <= myScroll+areaReaction) {
                exp = (thisPos-myScroll-areaReaction)*strength | 0;
                expResult = calcExp(exp, i);
            } else {
                expResult = [0, 0];
            }
            TweenMax.set(thisTitle, {y: expResult[0], rotation: expResult[1]});
        });

        requestAnimFrame(portfolioItemsAnimation);
    })();
    // TweenMax.set($('.offset'), {'height': areaReaction+'px'});
}
