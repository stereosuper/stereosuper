var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');
var animSkillsIn = require('./animSkillsIn.js');

module.exports = function(aze){
    TweenMax.to($('.skills'), 0.5, {y: 0, opacity: 1, ease: Circ.easeOut, delay: 0.5});
    var tableSkillsApparition = animSkillsIn();
    var tlSkillsApparition = new TimelineMax({onComplete: function(){
    	if(aze !== undefined){
    	    aze.done();
    	}
    }});
    tlSkillsApparition.add(
        tableSkillsApparition
    );
};
