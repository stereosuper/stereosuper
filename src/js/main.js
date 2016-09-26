'use strict';

var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/minified/TweenMax.min.js');
//var TimelineMax = require('./libs/gsap/src/minified/TimelineMax.min.js');


$(function(){

    window.requestAnimFrame = require('./requestAnimFrame.js');
    var PageTransition = require('./pageTransition.js');
    var animTop = require('./animTop.js');

    var windowWidth = $(window).width(), windowHeight = $(window).height(), myScroll = $(document).scrollTop();

    var body = $('body');
    var main = $('#main');



    // isMobile.any ? body.addClass('is-mobile') : body.addClass('is-desktop');


    ////////////////////////////////////////////////
    // Load Page
    ////////////////////////////////////////////////

    Barba.Pjax.start();
    Barba.Pjax.getTransition = function(){
        return PageTransition;
    };


    ////////////////////////////////////////////////
    // Anim Top Home
    ////////////////////////////////////////////////

    animTop(myScroll, body);


    ////////////////////////////////////////////////
    // anim ref home
    ////////////////////////////////////////////////

    var myScroll;
    var areaReaction = 200;
    var strength = 0.6;
    var strengthRotation = 0.05;
    var portfolioItems = $('.portfolio-items li');
    var exp, expR;

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
        windowWidth = $(window).width();
        windowHeight = $(window).height();
        portfolioItems.each(function(i) {
            if (getPosWithoutTranslate($(this))>=myScroll+windowHeight-areaReaction) {
                exp = Math.round((getPosWithoutTranslate($(this))-myScroll-windowHeight+areaReaction)*strength);
                expR = i%2 === 0 ? exp*strengthRotation : -(exp*strengthRotation);
                TweenMax.set($(this).find('h2'), {y: exp, rotation: expR});
            } else if(getPosWithoutTranslate($(this))<=myScroll+areaReaction) {
                exp = Math.round((getPosWithoutTranslate($(this))-myScroll-areaReaction)*strength);
                expR = i%2 === 0 ? exp*strengthRotation : -(exp*strengthRotation);
                TweenMax.set($(this).find('h2'), {y: exp, rotation: expR});
            } else {
                TweenMax.set($(this).find('h2'), {y: 0, rotation: 0});
            }
        });
        requestAnimFrame(scrollPage);
    }
    TweenMax.set($('.offset'), {'height': areaReaction+'px'});
    scrollPage();

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////


    $(window).on('resize', function(){


	}).on('load', function(){

	});

});
