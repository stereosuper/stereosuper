var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

var previousNextButton = $('.previous-next-references >li a'),
	previousButton = $('.previous-reference .txt'),
	nextButton = $('.next-reference .txt'),
	widthPreviousButton,
	widthNextButton;

module.exports = function(){
	widthPreviousButton = previousButton.outerWidth();
	widthNextButton = nextButton.outerWidth();
	// TweenMax.set([previousButton, nextButton], {position: 'relative', width: '0'});
	previousNextButton.on('mouseenter', function(){
		if($(this).parents('li').hasClass('previous-reference')){
			// TweenMax.set(previousButton, {className: '+=visible', width: widthPreviousButton+'px'});
			TweenMax.set(previousButton, {className: '+=visible'});
		}else if($(this).parents('li').hasClass('next-reference')){
			// TweenMax.set(nextButton, {className: '+=visible', width: widthNextButton+'px'});
			TweenMax.set(nextButton, {className: '+=visible'});
		}
	}).on('mouseleave', function(){
		// TweenMax.set([previousButton, nextButton], {className: '-=visible', width: '0'});
		TweenMax.set([previousButton, nextButton], {className: '-=visible'});
	});
}
