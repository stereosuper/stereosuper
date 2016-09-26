'use strict';

var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/minified/TweenMax.min.js');
//var TimelineMax = require('./libs/gsap/src/minified/TimelineMax.min.js');


$(function(){

    // window.requestAnimFrame = require('./requestAnimFrame.js');
    // var getPosWithoutTranslate = require('./getPosWithoutTranslate.js');

    var pageTransition = require('./pageTransition.js');
    var animHeader = require('./animHeader.js');
    var animTop = require('./animTop.js');
    var portfolioItemsAnimation = require('./portfolioItemsAnimation.js');


    var windowWidth = $(window).width(), windowHeight = $(window).height();
    var myScroll = $(document).scrollTop();

    var body = $('body');
    // var main = $('#main');
    var header = $('#header');
    var skillsHome = $('#skillsHome'), skillsTop = skillsHome.length ? skillsHome.offset().top - 100 : 0;



    // isMobile.any ? body.addClass('is-mobile') : body.addClass('is-desktop');



    ////////////////////////////////////////////////
    // Header Scroll Animation
    ////////////////////////////////////////////////

    animHeader(myScroll, body, header, skillsHome, skillsTop);


    ////////////////////////////////////////////////
    // Anim Top Home
    ////////////////////////////////////////////////

    var animTopSetUp = animTop(myScroll, body, header, skillsHome, skillsTop);


    ////////////////////////////////////////////////
    // Home functions
    ////////////////////////////////////////////////

    var Home = Barba.BaseView.extend({
        namespace: 'home',
        onEnter: function(){
            // The new Container is ready and attached to the DOM.
            skillsTop = skillsHome.offset().top - 100;
            if(!animTopSetUp){
                animTop(myScroll, body, header, skillsHome, skillsTop);
            }
        },
        onEnterCompleted: function(){
            // The Transition has just finished.

            // Anim Refs Home
            var portfolioItems = $('#portfolio').find('li');
            portfolioItemsAnimation(myScroll, windowHeight, portfolioItems);
        },
        onLeave: function(){
            // A new Transition toward a new page has just started.
        },
        onLeaveCompleted: function(){
            // The Container has just been removed from the DOM.
        }
    });
    Home.init();


    ////////////////////////////////////////////////
    // Load Page
    ////////////////////////////////////////////////

    Barba.Pjax.start();
    Barba.Pjax.getTransition = function(){
        return pageTransition;
    };
    // Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container){
    //     if(!animTopSetUp){
    //         animTop(myScroll, body, header, skillsHome, skillsTop);
    //     }
    // });


    $(window).on('resize', function(){

	}).on('load', function(){

	});

});
