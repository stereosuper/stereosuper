var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

var animSkillsIn = require('./animSkillsIn.js');

module.exports = function(aze){
    var blockTitle = $('.block-title');
    var tableSkillsApparition = animSkillsIn();
    var tlSkillsApparition = new TimelineMax({onComplete: function(){
    	if(aze !== undefined){
    	    aze.done();
    	}
    }});
    var t1 = new TweenMax.to(blockTitle.find('h1'), 0.3, {opacity: 1, ease: Power4.easeOut, delay: 0.5});
    var t2 = new TweenMax.to(blockTitle.find('p'), 0.3, {y: 0, opacity: 1, ease: Power4.easeOut, delay: 1});
    var t3 = new TweenMax.to(blockTitle.find('.link-arrow'), 0.3, {y: 0, opacity: 1, ease: Power4.easeOut, delay: 0.8});
    var t4 = new TweenMax.to($('.skills'), 0.5, {y: 0, opacity: 1, ease: Circ.easeOut, delay: 0.5});

    tlSkillsApparition.add([
        t1, t2, t3
    ]).add([
        t4, tableSkillsApparition
    ]);

    $('#header').removeClass('scrolled');
};
