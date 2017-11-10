var $ = require('./libs/jquery/dist/jquery.slim.min.js');

var throttle = require('./throttle.js');
window.requestAnimFrame = require('./requestAnimFrame.js');

module.exports = function(body){
    var animationElts = $('.wrapperAnimateOnScroll'), elt, eltContent;
    var windowHeight, windowTopPosition, windowBottomPosition;
    var eltToAnimate, eltHeight, eltTopPosition, eltBottomPosition;
    var launchGapIn = 100, launchGapOut = 250;

    function checkIfInView(){
        if( (!body.hasClass('about') && !body.hasClass('job')) || !animationElts.length ) return;

        windowHeight = $(window).height();
        windowTopPosition = $(window).scrollTop();
        windowBottomPosition = windowTopPosition + windowHeight;

        $.each(animationElts, function(){
            elt = $(this);
            eltHeight = elt.outerHeight();
            eltTopPosition = elt.offset().top;
            eltBottomPosition = (eltTopPosition + eltHeight);
            eltContent = elt.find('.animateOnScroll');
            if(eltContent.length){
                if((eltBottomPosition - launchGapOut >= windowTopPosition) && (eltTopPosition + launchGapIn <= windowBottomPosition)){
                    eltContent.removeClass('above-view').removeClass('under-view').addClass('in-view');
                }else if(eltBottomPosition - launchGapOut < windowTopPosition){
                    eltContent.addClass('above-view').removeClass('under-view').removeClass('in-view');
                }else{
                    eltContent.removeClass('above-view').addClass('under-view').removeClass('in-view');
                }
            }
        });
    }

    var scrollHandler = throttle(function(){
        requestAnimFrame(checkIfInView);
    }, 40);

    $(document).on('scroll', scrollHandler);
    $(window).on('resize', scrollHandler);
}
