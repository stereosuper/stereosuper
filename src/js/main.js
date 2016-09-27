'use strict';

var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/minified/TweenMax.min.js');
//var TimelineMax = require('./libs/gsap/src/minified/TimelineMax.min.js');


$(function(){

    // window.requestAnimFrame = require('./requestAnimFrame.js');
    // var getPosWithoutTranslate = require('./getPosWithoutTranslate.js');
    // var stringToArray = require('./stringToArray.js');

    var pageTransition = require('./pageTransition.js');
    var animHeaderScroll = require('./animHeader.js');

    var animTop = require('./animTop.js');
    var animSkillsScroll = require('./animSkills.js');
    var portfolioItemsAnimation = require('./portfolioItemsAnimation.js');
    var animSkillsHover = require('./animSkillsHover.js');


    var windowWidth = $(window).width(), windowHeight = $(window).height();
    var myScroll = $(document).scrollTop();

    var body = $('body');
    var htmlTag = $('html');
    // var main = $('#main');
    var header = $('#header');
    var skillsHome = $('#skillsHome'), skillsTop = skillsHome.length ? skillsHome.offset().top - 100 : 0;


    htmlTag.removeClass('no-js').addClass('js');
    // isMobile.any ? body.addClass('is-mobile') : body.addClass('is-desktop');



    ////////////////////////////////////////////////
    // Header Scroll Animation
    ////////////////////////////////////////////////

    animHeaderScroll(myScroll, body, header, skillsTop);
    var animSkillsSetUp = animSkillsScroll(myScroll, body, header, skillsHome, skillsTop);


    ////////////////////////////////////////////////
    // Anim Top Home
    ////////////////////////////////////////////////

    var animTopSetUp = animTop(myScroll, body, header, skillsHome, skillsTop);


    ////////////////////////////////////////////////
    // Home functions
    ////////////////////////////////////////////////

    var Home = Barba.BaseView.extend({ namespace: 'home',
        onEnter: function(){
            // The new Container is ready and attached to the DOM.
        },
        onEnterCompleted: function(){
            // The Transition has just finished.

            var portfolioItems = $('#portfolio').find('.portfolio-item');

            skillsHome = $('#skillsHome');
            skillsTop = skillsHome.offset().top - 100;

            // Anim top home
            if(!animTopSetUp){
                animTopSetUp = animTop(myScroll, body, header, skillsHome, skillsTop);
            }

            // Anim skills with header
            if(!animSkillsSetUp){
                animSkillsSetUp = animSkillsScroll(myScroll, body, header, skillsHome, skillsTop);
            }

            // Anim Refs Home
            portfolioItemsAnimation(myScroll, windowHeight, portfolioItems);

            // Anim skills hover
            animSkillsHover(body);
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


    ////////////////////////////////////////////////
    // Hover portfolio items
    ////////////////////////////////////////////////

    // var aFx = 70;
    // $('.portfolio-item').on('mousemove touchmove',function(e){
    //     var itemHeight = $('.portfolio-item').innerHeight(),
    //         itemWidth = $('.portfolio-item').innerWidth(),
    //         eX = (e.originalEvent.type === 'touchmove') ? e.originalEvent.touches[0].pageX : e.offsetX,
    //         eY = (e.originalEvent.type === 'touchmove') ? e.originalEvent.touches[0].pageY : e.offsetY;

    //         TweenMax.to($(this).find('.bg'), 0.5, {
    //             rotationX: ((eY - itemHeight / 2) / aFx) - 1 * 2,
    //             rotationY: ((eX - itemWidth / 2) / aFx * -1) - 1 * 2,
    //             y:(eY - (itemHeight / 2)) / (70 - 1 * 20),
    //             x:(eX - (itemWidth / 2)) / (70 - 1 * 20)
    //         });
    // }).on('mouseout touchend',function(e){
    //     console.log('aze');
    //     TweenMax.to($(this).find('.bg'), 1, {
    //         delay:.2,
    //         y:0,
    //         x:0,
    //         rotationX: 0,
    //         rotationY: 0,
    //         transformPerspective:'1500'
    //     });
    // });

    $(window).on('resize', function(){

	}).on('load', function(){

	});

});
