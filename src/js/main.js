'use strict';

var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.min.js');
// var TweenMax = require('.libs/gsap/src/minified/TweenMax.min.js');
// var TimelineMax = require('.libs/gsap/src/minified/TimelineMax.min.js');


$(function(){

    // window.requestAnimFrame = require('./requestAnimFrame.js');
    var PageTransition = require('./pageTransition.js');

    var windowWidth = $(window).width(), windowHeight = $(window).height();

    var body = $('body');
    var main = $('#main');



    // isMobile.any ? body.addClass('is-mobile') : body.addClass('is-desktop');


    /// LOAD PAGE ///

    Barba.Pjax.start();
    Barba.Pjax.getTransition = function(){
        return PageTransition;
    };


    $(window).on('resize', function(){

        windowWidth = $(window).width();
        windowHeight = $(window).height();

	}).on('load', function(){

	});


    $(document).on('scroll', function(){

    });

});
