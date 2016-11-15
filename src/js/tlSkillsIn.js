var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
// var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

module.exports = function(isStagger, elemToAnim, thirdParameter){
    var tween;

    if(isStagger){
        if(thirdParameter){
            tween = TweenMax.staggerTo(elemToAnim, 0.35, {opacity: 1, y: 0, ease:Back.easeOut.config(5)}, 0.06);
        }else{
            tween = TweenMax.staggerTo(elemToAnim, 0.35, {opacity: 1, scaleY: 1, ease:Back.easeOut.config(5)}, 0.06);
        }
    }else{
        tween = [
            TweenMax.to(thirdParameter, 2, {width: '140%'}),
            TweenMax.to(elemToAnim, 0.8, {scaleY: 1, ease:Back.easeOut.config(5)}, 0)
        ];
    }

    return tween;
}
