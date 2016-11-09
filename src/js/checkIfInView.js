var $ = require('./libs/jquery/dist/jquery.slim.min.js');

var throttle = require('./throttle.js');
window.requestAnimFrame = require('./requestAnimFrame.js');

module.exports = function(body){
    var animationElts = $('.animateOnScroll');
    var windowHeight, windowTopPosition, windowBottomPosition;
    var eltToAnimate, eltHeight, eltTopPosition, eltBottomPosition;
    var launchGap = 100;

    function checkIfInView(){
        if(!body.hasClass('about') || !animationElts.length) return;

        windowHeight = $(window).height();
        windowTopPosition = $(window).scrollTop();
        windowBottomPosition = windowTopPosition + windowHeight;

        $.each(animationElts, function(){
            elt = $(this);
            eltHeight = elt.outerHeight();
            eltTopPosition = elt.offset().top;
            eltBottomPosition = (eltTopPosition + eltHeight);

            if((eltBottomPosition - launchGap >= windowTopPosition) && (eltTopPosition + launchGap <= windowBottomPosition)){
			    elt.removeClass('above-view').removeClass('under-view').addClass('in-view');
            }else if(eltBottomPosition - launchGap < windowTopPosition){
        	    elt.addClass('above-view').removeClass('under-view').removeClass('in-view');
            }else{
        	    elt.removeClass('above-view').addClass('under-view').removeClass('in-view');
            }
        });
    }

    var scrollHandler = throttle(function(){
        requestAnimFrame(checkIfInView);
    }, 40);

    $(document).on('scroll', scrollHandler);
    $(window).on('resize', scrollHandler);
}
