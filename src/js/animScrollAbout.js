var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var ScrollMagic = require('./libs/scrollmagic/ScrollMagic.js');
require('./libs/scrollmagic/plugins/animation.gsap.js');

module.exports = function(){
    var controller = new ScrollMagic.Controller();

    var tween = TweenMax.to($('#test'), 0.3, {scale: 0.7});
    var scene = new ScrollMagic.Scene({triggerElement: '#test', duration: 300})
                .setTween(tween)
                //.addIndicators({name: "2 (duration: 300)"}) // add indicators (requires plugin)
                .addTo(controller);
}
