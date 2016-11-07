var $ = require('./libs/jquery/dist/jquery.slim.min.js');

module.exports = function(){
    var animationElements = $('.animateOnScroll');
    var windowHeight, 
    	windowTopPosition, windowBottomPosition;
    var elementToAnimate,
    	elementHeight,
    	elementTopPosition, elementBottomPosition;
    var launchGap = 100;

    function checkIfInView() {
      windowHeight = $(window).height();
      windowTopPosition = $(window).scrollTop();
      windowBottomPosition = (windowTopPosition + windowHeight);
     
      $.each(animationElements, function() {
        elementToAnimate = $(this);
        elementHeight = elementToAnimate.outerHeight();
        elementTopPosition = elementToAnimate.offset().top;
        elementBottomPosition = (elementTopPosition + elementHeight);

        if (((elementBottomPosition - launchGap) >= windowTopPosition) && ((elementTopPosition + launchGap) <= windowBottomPosition)) {
			elementToAnimate.removeClass('above-view');
			elementToAnimate.removeClass('under-view');
			elementToAnimate.addClass('in-view');
        }else if((elementBottomPosition - launchGap) < windowTopPosition){
        	elementToAnimate.addClass('above-view');
        	elementToAnimate.removeClass('under-view');
			elementToAnimate.removeClass('in-view');
        }else{
        	elementToAnimate.removeClass('above-view');
        	elementToAnimate.addClass('under-view');
        	elementToAnimate.removeClass('in-view');
        }
      });
    }

    $(window).on('scroll resize', checkIfInView);
    $(window).trigger('scroll');
}
