var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var checkScrollSpeed = require('./checkScrollSpeed.js');

window.requestAnimFrame = require('./requestAnimFrame.js');

module.exports = function(){
	var firstYearTop, centerFirstYearTop, containerTimelineHeight, posiDownScroll, posiUpScroll, wasGoingDown, isDoingAction = false,
		years = $('#year').find('.year'),
		timeline = $('#timeline'), contentTimeline = $('#content-timeline'), tlDown = $('.tl.down'), tlUp = $('.tl.up'),
		rCheck, scaleValue;
    
    firstYearTop = years.first().data('top');
    centerFirstYearTop = firstYearTop + (years.first().outerHeight()/2);
    containerTimelineHeight = $('#content-timeline').outerHeight();
    posiDownScroll = -containerTimelineHeight + centerFirstYearTop;
    posiUpScroll = centerFirstYearTop;


    (function onScroll(){
    	rCheck = checkScrollSpeed();
        scaleValue = Math.abs(rCheck[0]/100)*3;
        console.log(scaleValue);
        if(rCheck[1] === true){
        	// downscroll
        	TweenMax.set(contentTimeline, {y: posiDownScroll+'px'});
            TweenMax.to(tlDown, 1, {scaleY: scaleValue});
            if(wasGoingDown == undefined){
                TweenMax.set(tlDown, {opacity: 1});
                TweenMax.set(tlUp, {opacity: 0});
            }else if(!wasGoingDown && !isDoingAction){
                isDoingAction == true;
                TweenMax.set(tlDown, {opacity: 1});
                TweenMax.to(tlUp, 2, {opacity: 0});
                TweenMax.to(tlUp, 2, {scaleY: 0, onComplete: function(){
                    isDoingAction == false;
                }});
            }
            wasGoingDown = true;
        }else{
    		// upscroll
    		TweenMax.set(contentTimeline, {y: posiUpScroll+'px'});
            TweenMax.to(tlUp, 1, {scaleY: scaleValue});
            if(wasGoingDown == undefined){
                TweenMax.set(tlDown, {opacity: 0});
                TweenMax.set(tlUp, {opacity: 1});
            }else if(wasGoingDown && !isDoingAction){
                isDoingAction == true;
                TweenMax.set(tlUp, {opacity: 1});
                TweenMax.to(tlDown, 2, {opacity: 0});
                TweenMax.to(tlDown, 2, {scaleY: 0, onComplete: function(){
                    isDoingAction == false;
                }});
            }
            wasGoingDown = false;
        }
        requestAnimFrame(onScroll);
    })();
}
