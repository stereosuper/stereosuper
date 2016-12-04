var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var Hammer = require('./libs/hammerjs/hammer.min.js');

module.exports = function(){
	var navSingle = $('.previous-next-references'),
		previousButton = navSingle.find('.previous-reference'), nextButton = navSingle.find('.next-reference'),
		previousButtonLink = $('.previous-reference a'), nextButtonLink = $('.next-reference a'), hrefButton,
		previousButtonSpan = navSingle.find('.previous-reference').find('.txt').find('>span');
		nextButtonSpan = navSingle.find('.next-reference').find('.txt').find('>span'),
		previousArrow = navSingle.find('.previous-reference').find('.icon'),
		nextArrow = navSingle.find('.next-reference').find('.icon'),
		portfolioDesc = $('.portfolio-desc'),
		easeButton = Power3.easeOut, tpsAnimIn = 0.2, tpsAnimInTxt = 0.3, tpsAnimOut = 0.3;

	navSingle.on('mouseenter focusin', 'a', function(){
		TweenMax.to($(this).find('.txt').find('> span'), tpsAnimInTxt, {x: 0, opacity: 1, ease: easeButton});
		if($(this).parents('li').hasClass('previous-reference')){
			TweenMax.to(previousArrow, tpsAnimIn, {x: -10, ease: easeButton});
			TweenMax.to(nextArrow, tpsAnimIn, {opacity: 0.5, ease: easeButton});
		}else if($(this).parents('li').hasClass('next-reference')){
			TweenMax.to(nextArrow, tpsAnimIn, {x: 10, ease: easeButton});
			TweenMax.to(previousArrow, tpsAnimIn, {opacity: 0.5, ease: easeButton});
		}
	}).on('mouseleave focusout', 'a', function(){
		TweenMax.to(previousButtonSpan, tpsAnimOut, {x: 20, opacity: 0, ease: easeButton});
		TweenMax.to(nextButtonSpan, tpsAnimOut, {x: -20, opacity: 0, ease: easeButton});
		TweenMax.to([previousArrow, nextArrow], tpsAnimOut, {x: 0, opacity: 1, ease: easeButton});
	});

	$(document).on('keydown', function(e) {
		e.preventDefault();
	    switch(e.which) {
	        case 37:
	        	if(previousButtonLink.length){
	        		hrefButton = previousButtonLink.attr('href');
	        		Barba.Pjax.goTo(hrefButton);
	        	}
	        break;

	        case 39:
		        if(nextButtonLink.length){
		        	hrefButton = nextButtonLink.attr('href');
		        	Barba.Pjax.goTo(hrefButton);
		        }
	        break;

	        default: return;
	    }
	});

	portfolioDesc.each(function(){
	    var hammertime = new Hammer(this);
	    hammertime.on('swipeleft', function(){
	    	if(nextButtonLink.length){
	    		hrefButton = nextButtonLink.attr('href');
	    		Barba.Pjax.goTo(hrefButton);
	    	}
	    });
	    hammertime.on('swiperight', function(){
	       if(previousButtonLink.length){
	       	hrefButton = previousButtonLink.attr('href');
	       	Barba.Pjax.goTo(hrefButton);
	       }
	    });
	});
}
