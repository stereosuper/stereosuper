'use strict';

var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/minified/TweenMax.min.js');
//var Roll = require('./libs/roll.min.js');
//var TimelineMax = require('./libs/gsap/src/minified/TimelineMax.min.js');


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


    var animatingTop = false;
    var blockTitle = $('#blockTitle'), skillsHome = $('#skillsHome'), htmlBody = $('html, body');
    var skillsTop = skillsHome.offset().top;

    $(document).on('scroll', function(e){
        myScroll = $(document).scrollTop();
        if(body.hasClass('home')){
            if(myScroll > 100 && !body.hasClass('scrolled') && !animatingTop){
                TweenMax.to(blockTitle, 0.6, {opacity: 0});
                body.addClass('scrolled');
                animatingTop = true;
                htmlBody.stop().animate({scrollTop: skillsTop - 30}, 700, function(){
                    animatingTop = false;
                });
            }
            if(myScroll < skillsTop - 50 && body.hasClass('scrolled') && !animatingTop){
                TweenMax.to(blockTitle, 0.6, {opacity: 1, delay: 0.6});
                body.removeClass('scrolled');
                animatingTop = true;
                htmlBody.stop().animate({scrollTop: 0}, 700, function(){
                    animatingTop = false;
                });
            }
        }
    });

    body.on('mousewheel', function(e){
        if(animatingTop){
            e.preventDefault();
            e.stopPropagation();
        }
    });

});
