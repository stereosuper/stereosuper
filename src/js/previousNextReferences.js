var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

module.exports = function(){
	var previousNextButton = $('.previous-next-references >li a'),
		previousButton = $('.previous-reference .txt'),
		nextButton = $('.next-reference .txt'),
		previousButtonSpan = previousButton.find('>span');
		nextButtonSpan = nextButton.find('>span'),
		previousArrow = $('.previous-reference .icon'),
		nextArrow = $('.next-reference .icon'),
		easeButton = Power3.easeOut,
		tpsAnimIn = 0.2,
		tpsAnimInTxt = 0.3,
		tpsAnimOut = 0.1;

	previousNextButton.on('mouseenter', function(){
		if($(this).parents('li').hasClass('previous-reference')){
			TweenMax.to(previousButtonSpan, tpsAnimInTxt, {x: 0, opacity: 1, ease: easeButton});
			TweenMax.to(previousArrow, tpsAnimIn, {x: -10, ease: easeButton});
			TweenMax.to(nextArrow, tpsAnimIn, {opacity: 0.5, ease: easeButton});
		}else if($(this).parents('li').hasClass('next-reference')){
			TweenMax.to(nextButtonSpan, tpsAnimInTxt, {x: 0, opacity: 1, ease: easeButton});
			TweenMax.to(nextArrow, tpsAnimIn, {x: 10, ease: easeButton});
			TweenMax.to(previousArrow, tpsAnimIn, {opacity: 0.5, ease: easeButton});
		}
	}).on('mouseleave', function(){
		TweenMax.to(previousButtonSpan, tpsAnimOut, {x: 20, opacity: 0, ease: easeButton});
		TweenMax.to(nextButtonSpan, tpsAnimOut, {x: -20, opacity: 0, ease: easeButton});
		TweenMax.to([previousArrow, nextArrow], tpsAnimOut, {x: 0, opacity: 1, ease: easeButton});
	});
}
