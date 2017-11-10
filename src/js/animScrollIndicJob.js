var $ = require('./libs/jquery/dist/jquery.slim.min.js');

var checkScrollSpeed = require('./checkScrollSpeed.js');
window.requestAnimFrame = require('./requestAnimFrame.js');

module.exports = function( body ){
	var contentTimeline = $('#content-timeline'), tl = $('#tl'), rCheck, scaleValue;

    var posiDownScroll = -400;
    var posiUpScroll = 500;
    var myScroll;

    (function onScroll(){
        if( !body.hasClass('job') ) return;

        rCheck = checkScrollSpeed();
        scaleValue = Math.abs(rCheck[0]/100)*3;

        myScroll = $(document).scrollTop();
        TweenMax.set(contentTimeline, {opacity: 1});

        if( rCheck[1] ){
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
