var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
// var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

var transiInHome = require('./transiInHome.js');
var transiOutHome = require('./transiOutHome.js');
var transiInPortfolio = require('./transiInPortfolio.js');
var transiOutPortfolio = require('./transiOutPortfolio.js');

module.exports = function(body, menu, lastClickedLink){
    return Barba.BaseTransition.extend({
        start: function(){
            Promise
                .all([this.newContainerLoading, this.fadeOut()])
                .then(this.fadeIn.bind(this));
        },

        fadeOut: function(){
            menu.find('a').removeClass('active');

            if(lastClickedLink !== undefined){
                lastClickedLink.blur();
                if(lastClickedLink.parents('.menu-header').length){
                    lastClickedLink.addClass('active');
                }
            }

            if(body.hasClass('home')){
                return transiOutHome(lastClickedLink, $(this.oldContainer));
            }else if(body.hasClass('portfolio')){
                return transiOutPortfolio($(this.oldContainer));
            }else{
                return new Promise( function(resolve, reject){
                    TweenMax.to($(this.oldContainer), 0.5, {opacity: 0, onComplete: function(){
                        resolve(true);
                    }});
                });
            }
        },

        fadeIn: function(){
            var _this = this;
            var $el = $(this.newContainer);

            body.removeClass($(this.oldContainer).data('class')).addClass($el.data('class'));
            $('.lang').find('.no-barba').attr('href', $el.data('lang'));

            TweenMax.set($el, {visibility: 'visible', opacity: 0});
            $(this.oldContainer).hide();
            $(document).scrollTop(0);
            TweenMax.to($el, 0.3, {opacity: 1});

            if(body.hasClass('portfolio')){
                return transiInPortfolio($el, _this);
            }else if(body.hasClass('home')){
                return transiInHome($el, _this);
            }else{
                _this.done();
            }
        }
    })
};
