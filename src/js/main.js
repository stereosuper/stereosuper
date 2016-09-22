'use strict';

var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.min.js');
// var TweenMax = require('.libs/gsap/src/minified/TweenMax.min.js');
// var TimelineMax = require('.libs/gsap/src/minified/TimelineMax.min.js');


$(function(){

    window.requestAnimFrame = require('./requestAnimFrame.js');
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


    ////////////////////////////////////////////////
    // anim ref home
    ////////////////////////////////////////////////
    
    var myScroll;
    var areaReaction = 200;
    var strength = 0.6;
    var strengthRotation = 0.05;

    // position en y d'un item sans son translate
    function getPosWithoutTranslate(myObj) {
        var pos = myObj.offset().top;
        if (myObj.css('transform').indexOf('(') > 0) {
            pos += -parseInt(myObj.css('transform').split(/[()]/)[1].split(',')[5]);
        }
        return Math.round(pos);
    }

    // Request anim frame
    function scrollPage(){
        myScroll = $(document).scrollTop();
        $('.portfolio-items li').each(function(i) {
            if (getPosWithoutTranslate($(this))>=myScroll+$(window).height()-areaReaction) {
                var exp = Math.round((getPosWithoutTranslate($(this))-myScroll-$(window).height()+areaReaction)*strength);
                if(i%2 === 0){
                    var expR = exp*strengthRotation;
                }else{
                    var expR = -(exp*strengthRotation);
                }
                $(this).find('h2').css('transform','translateY('+exp+'px) rotate('+expR+'deg)');
            } else if(getPosWithoutTranslate($(this))<=myScroll+areaReaction) {
                var exp = Math.round((getPosWithoutTranslate($(this))-myScroll-areaReaction)*strength);
                if(i%2 === 0){
                    var expR = exp*strengthRotation;
                }else{
                    var expR = -(exp*strengthRotation);
                }
                $(this).find('h2').css('transform','translateY('+exp+'px) rotate('+expR+'deg)');
            } else {
                $(this).find('h2').css('transform','translateY(0px) rotate(0deg)');
            }
        });
        requestAnimFrame(scrollPage);
    }

    $('.offset').css('height',areaReaction+'px');
    $('.portfolio-items').css({'height':$('.portfolio-items').outerHeight(true)+'px','overflow':'hidden','padding-top':areaReaction+'px','padding-bottom':areaReaction+'px'});
    scrollPage();

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////


    $(window).on('resize', function(){

        windowWidth = $(window).width();
        windowHeight = $(window).height();

	}).on('load', function(){

	});


    $(document).on('scroll', function(){

    });

});
