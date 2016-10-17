var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');

var transiOutHome = require('./transiOutHome.js');
var transiInPortfolio = require('./transiInPortfolio.js');

module.exports = function(lastClickedLink){
    return Barba.BaseTransition.extend({
        start: function(){
            Promise
                .all([this.newContainerLoading, this.fadeOut()])
                .then(this.fadeIn.bind(this));
        },

        fadeOut: function(){
            return transiOutHome(lastClickedLink);
        },

        fadeIn: function(){
            var _this = this;
            return transiInPortfolio(_this);
        }
    })
};
