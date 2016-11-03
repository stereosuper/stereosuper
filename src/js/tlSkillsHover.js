var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

module.exports = function(symbolToAnimate, diffTranslation){
    var tlSkillsHover = new TimelineMax({paused: true});

    tlSkillsHover
        .to(symbolToAnimate, 0.2, {scaleX: 1.5, ease:Quad.easeIn})
        .to(symbolToAnimate, 0.3, {scaleX: 1, x: diffTranslation, ease:Quad.easeOut});

    return tlSkillsHover;
}
