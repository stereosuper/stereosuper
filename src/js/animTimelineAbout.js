var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var checkScrollSpeed = require('./checkScrollSpeed.js');

window.requestAnimFrame = require('./requestAnimFrame.js');

module.exports = function(){
	var firstYearTop, centerFirstYearTop, containerTimelineHeight, posiDownScroll, posiUpScroll,
		years = $('#year').find('.year'),
		timeline = $('#timeline'), contentTimeline = $('#content-timeline'), tl = $('#tl'),
		rCheck, scaleValue;
    
    firstYearTop = years.first().data('top');
    centerFirstYearTop = firstYearTop + (years.first().outerHeight()/2);
    containerTimelineHeight = $('#content-timeline').outerHeight();
    posiDownScroll = -containerTimelineHeight + centerFirstYearTop;
    posiUpScroll = centerFirstYearTop;


    (function onScroll(){
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
        requestAnimFrame(onScroll);
    })();
}
