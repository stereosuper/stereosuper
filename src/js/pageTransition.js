var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

module.exports = Barba.BaseTransition.extend({
    start: function(){
        Promise
            .all([this.newContainerLoading, this.fadeOut()])
            .then(this.fadeIn.bind(this));
    },

    fadeOut: function(){
        // return $(this.oldContainer).animate({ opacity: 0 }).promise();
        console.log(this);
        var tlFadeOut;
        return new Promise( function(resolve, reject) {
            tlFadeOut = new TimelineMax({onComplete: function(){
                resolve(true);
            }});
            tlFadeOut.to([$('#skillsHome'), $('.portfolio-item a > div'), $('.portfolio-item .bg')], 0.5, {opacity: 0});
        } );
    },

    fadeIn: function(){
        var _this = this;
        var $el = $(this.newContainer);

        $('body').removeClass().addClass($el.data('class'));

       $el.css({
            visibility : 'visible',
            opacity : 0
        }).delay(100).animate({ opacity: 1 }, 400, function(){
            /*if($el.find('.portfolio-role').length){
                TweenMax.to($el.find('.portfolio-role'), 0.3, {y: '0%'});
            }*/
            _this.done();
        });

        $(this.oldContainer).hide();
    }
});
