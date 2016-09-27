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
    var animSkills = require('./animSkills.js');
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
    //console.log(skillsTop);
    var animSkillsSetUp = animSkills(myScroll, body, header, skillsHome, skillsTop);


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

            skillsHome = $('#skillsHome');
            skillsTop = skillsHome.offset().top - 100;

            // Anim top home
            if(!animTopSetUp){
                animTopSetUp = animTop(myScroll, body, header, skillsHome, skillsTop);
            }

            // Anim skills with header
            if(!animSkillsSetUp){
                animSkillsSetUp = animSkills(myScroll, body, header, skillsHome, skillsTop);
            }

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


    ////////////////////////////////////////////////
    // Hover portfolio items
    ////////////////////////////////////////////////

    /*var aFx = 70,
        trF = 4;  
    $('.portfolio-item').on('mousemove touchmove',function(e){  
        var cH = $('.portfolio-item').innerHeight(),
            cW = $('.portfolio-item').innerWidth(),
            eX = (e.originalEvent.type === 'touchmove') ? e.originalEvent.touches[0].pageX  : e.offsetX,
            eY = (e.originalEvent.type === 'touchmove') ? e.originalEvent.touches[0].pageY  : e.offsetY;

            TweenMax.to($(this).find('.bg'), 0.5, { 
                rotationX: ((eY - cH / 2) / aFx) - 1 * 2, 
                rotationY: ((eX - cW / 2) / aFx * -1) - 1 * 2,
                y:(eY - (cH / 2)) / (70 - 1 * 20),  
                x:(eX - (cW / 2)) / (70 - 1 * 20)
            });
    }).on('mouseout touchend',function(e){
        TweenMax.to($(this).find('.bg'), 1, {
            delay:.2,
            y:0,
            x:0,
            rotationX: 0,
            rotationY: 0,
            transformPerspective:'1500' 
        });
    });*/

    $(window).on('resize', function(){

	}).on('load', function(){

	});

});
