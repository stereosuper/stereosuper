var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

var animSkillsIn = require('./animSkillsIn.js');
var getUrlParam = require('./getUrlParam.js');

module.exports = function(newContainer, aze){
    var blockTitle = newContainer.find('.block-title');
    var tableSkillsApparition = animSkillsIn(newContainer);
    var tlSkillsApparition = new TimelineMax({onComplete: function(){
    	if(aze !== undefined){
    	    aze.done();
    	}
    }});
    var portfolioParam = getUrlParam('portfolio');
    if($('#' + portfolioParam).length){
        $(document).scrollTop($('#' + portfolioParam).offset().top - 250);
        tlSkillsApparition.add([
            TweenMax.set(blockTitle.find('h1'), {opacity: 1}),
            TweenMax.set(blockTitle.find('p'), {y: 0, opacity: 1}),
            TweenMax.set(blockTitle.find('.link-arrow'), {y: 0, opacity: 1}),
        ]).add([
            tableSkillsApparition,
            TweenMax.set(newContainer.find('.skills'), {y: 0, opacity: 1}),
            TweenMax.set(blockTitle.find('.frenchies'), {y: 0, opacity: 1, delay: 2})
        ]);
    }else{
        tlSkillsApparition.add([
            TweenMax.to(blockTitle.find('h1'), 0.3, {opacity: 1, ease: Power4.easeOut, delay: 0.5}),
            TweenMax.to(blockTitle.find('p'), 0.4, {y: 0, opacity: 1, ease: Power4.easeOut, delay: 1}),
            TweenMax.to(blockTitle.find('.link-arrow'), 0.4, {y: 0, opacity: 1, ease: Power4.easeOut, delay: 1})
        ]).add([
            tableSkillsApparition,
            TweenMax.to(newContainer.find('.skills'), 0.4, {y: 0, opacity: 1, ease: Circ.easeOut, delay: 0.1}),
            TweenMax.to(newContainer.find('#video'), 0.5, {opacity: 1, ease: Circ.easeOut}),
            TweenMax.to(blockTitle.find('.frenchies'), 0.4, {y: 0, opacity: 1, ease: Circ.easeOut, delay: 2})
        ]);
    }

    $('#header').removeClass('scrolled');
};
