var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

var animSkillsIn = require('./animSkillsIn.js');
var getUrlParam = require('./getUrlParam.js');

module.exports = function(aze){
    var blockTitle = $('.block-title');
    var tableSkillsApparition = animSkillsIn();
    var tlSkillsApparition = new TimelineMax({onComplete: function(){
    	if(aze !== undefined){
    	    aze.done();
    	}
    }});
    var portfolioParam = getUrlParam('portfolio');

    if($('#' + portfolioParam).length){
        $(document).scrollTop($('#' + portfolioParam).offset().top - 250);
    }

    tlSkillsApparition.add([
        TweenMax.to(blockTitle.find('h1'), 0.3, {opacity: 1, ease: Power4.easeOut, delay: 0.5}),
        TweenMax.to(blockTitle.find('p'), 0.4, {y: 0, opacity: 1, ease: Power4.easeOut, delay: 1}),
        TweenMax.to(blockTitle.find('.link-arrow'), 0.4, {y: 0, opacity: 1, ease: Power4.easeOut, delay: 1})
    ]).add([
        tableSkillsApparition,
        TweenMax.to($('.skills'), 0.4, {y: 0, opacity: 1, ease: Circ.easeOut, delay: 0.1}),
        TweenMax.to($('#video'), 0.5, {opacity: 1, ease: Circ.easeOut})
    ]);

    $('#header').removeClass('scrolled');
};
