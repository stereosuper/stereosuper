var $ = require('./libs/jquery/dist/jquery.slim.min.js');

var checkScrollSpeed = require('./checkScrollSpeed.js');
var throttle = require('./throttle.js');
window.requestAnimFrame = require('./requestAnimFrame.js');

module.exports = function(){
	var years = $('#year').find('.year'), timeline = $('#timeline'), contentTimeline = $('#content-timeline'), tl = $('#tl'),
		rCheck, scaleValue;

    var firstYearTop = years.eq(0).data('top');
    var centerFirstYearTop = firstYearTop + (years.eq(0).outerHeight()/2);
    var containerTimelineHeight = $('#content-timeline').outerHeight();
    var posiDownScroll = -containerTimelineHeight + centerFirstYearTop;
    var posiUpScroll = centerFirstYearTop;

    function onScroll(){
    	rCheck = checkScrollSpeed();
        scaleValue = Math.abs(rCheck[0]/100)*3;
        if(rCheck[1] === true){
        	// downscroll
        	TweenMax.set(contentTimeline, {y: posiDownScroll+'px'});
            TweenMax.set(tl, {transformOrigin: '0 100%'});
        }else{
    		// upscroll
    		TweenMax.set(contentTimeline, {y: posiUpScroll+'px'});
            TweenMax.set(tl, {transformOrigin: '0 0'});
        }
        TweenMax.to(tl, 1, {scaleY: scaleValue});
    }

    var scrollHandler = throttle(function(){
        requestAnimFrame(onScroll);
    }, 10);

    $(document).on('scroll', scrollHandler);
}
