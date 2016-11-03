var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
// var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

var transiInHome = require('./transiInHome.js');
var transiOutHome = require('./transiOutHome.js');
var transiInPortfolio = require('./transiInPortfolio.js');
var transiOutPortfolio = require('./transiOutPortfolio.js');

module.exports = function(lastClickedLink, body){
    return Barba.BaseTransition.extend({
        start: function(){
            Promise
                .all([this.newContainerLoading, this.fadeOut()])
                .then(this.fadeIn.bind(this));
        },

        fadeOut: function(){
            if(body.hasClass('home')){
                return transiOutHome(lastClickedLink);
            }else if(body.hasClass('portfolio')){
                return transiOutPortfolio();
            }else{
                return $(this.oldContainer).animate({ opacity: 0 }).promise();
            }
        },

        fadeIn: function(){
            var _this = this;
            var $el = $(this.newContainer);

            body.removeClass($(this.oldContainer).data('class')).addClass($el.data('class'));

            TweenMax.set($el, {visibility: 'visible', opacity: 0, onComplete: function(){
                $(document).scrollTop(0);
            }});
            TweenMax.set($el, {opacity: 1});
            $(this.oldContainer).hide();

            if(body.hasClass('portfolio')){
                return transiInPortfolio(_this);
            }else if(body.hasClass('home')){
                return transiInHome(_this);
            }else{
                _this.done();
            }
        }
    })
};
