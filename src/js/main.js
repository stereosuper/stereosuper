'use strict';

var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.min.js');
// var isMobile = require('./isMobile.min.js');
// var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
// var TimelineMax = require('./libs/gsap/src/minified/TimelineMax.min.js');


$(function(){

    // window.requestAnimFrame = require('./requestAnimFrame.js');
    // var getPosWithoutTranslate = require('./getPosWithoutTranslate.js');
    // var stringToArray = require('./stringToArray.js');

    var pageTransition = require('./pageTransition.js');
    var animHeaderScroll = require('./animHeader.js');

    var animTop = require('./animTop.js');
    var animSkillsScroll = require('./animSkillsScroll.js');
    var portfolioItemsAnimation = require('./portfolioItemsAnimation.js');
    var animSkillsHover = require('./animSkillsHover.js');

    var animYearAbout = require('./animYearABout.js');
    var animTextAbout = require('./animTextABout.js');


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
    // Background blend mode detection
    ////////////////////////////////////////////////
    if('CSS' in window && 'supports' in window.CSS) {
       var support = window.CSS.supports('mix-blend-mode','soft-light');
           support = support?'mix-blend-mode':'no-mix-blend-mode';
           $('html').addClass(support);
    }

    ////////////////////////////////////////////////
    // Header Scroll Animation
    ////////////////////////////////////////////////

    animHeaderScroll(myScroll, body, header, skillsHome);
    var animSkillsSetUp = animSkillsScroll(myScroll, body, header, skillsHome);


    ////////////////////////////////////////////////
    // Anim Top Home
    ////////////////////////////////////////////////

    skillsHome.data('top', skillsTop);
    var animTopSetUp = animTop(myScroll, body, header, skillsHome);

    ////////////////////////////////////////////////
    // Skills
    ////////////////////////////////////////////////
    var createTl = require('./tlSkillsIn.js');

    var dashes = $('.dashes >span'), tlInDashes, tlHoverDashes = new TimelineMax({paused: true}),
        wrapperWaves = $('.wrapper-waves'), waves = $('.waves'), tlInWaves, tlHoverWaves = new TimelineMax({paused: true}),
        wrapperZigzags = $('.wrapper-zigzags'), zigzags = $('.zigzags'), tlInZigzags, tlHoverZigzags = new TimelineMax({paused: true}),
        slashes = $('.slashes >span'), tlInSlashes, tlHoverSlashes = new TimelineMax({paused: true}),
        dots = $('.dots >span'), tlInDots, tlHoverDots = new TimelineMax({paused: true}),
        dataSkill, symbolToAnimate, diffTranslation = 0;
    var StagIcon, StagIcon2;
    var AnimHoverAll;

    if(dashes.length){
        tlInDashes = createTl(true, dashes, true);
        tlInDashes.play();

        diffTranslation = -36;
        symbolToAnimate = dashes.closest('.symbol').find('.hoverAnimation');
        tlHoverDashes.to(symbolToAnimate, 0.2, {scaleX: 1.5, ease:Quad.easeIn});
        tlHoverDashes.to(symbolToAnimate, 0.3, {scaleX: 1, x: diffTranslation, ease:Quad.easeOut});
    }
    if(wrapperWaves.length){
        tlInWaves = createTl(false, waves, wrapperWaves);
        tlInWaves.play();

        diffTranslation = -17; // multiple 17
        symbolToAnimate = wrapperWaves.closest('.symbol').find('.hoverAnimation');
        tlHoverWaves.to(symbolToAnimate, 0.2, {scaleX: 1.5, ease:Quad.easeIn});
        tlHoverWaves.to(symbolToAnimate, 0.3, {scaleX: 1, x: diffTranslation, ease:Quad.easeOut});
    }
    if(wrapperZigzags.length){
        tlInZigzags = createTl(false, zigzags, wrapperZigzags);
        tlInZigzags.play();

        diffTranslation = -19;
        symbolToAnimate = wrapperZigzags.closest('.symbol').find('.hoverAnimation');
        tlHoverZigzags.to(symbolToAnimate, 0.2, {scaleX: 1.5, ease:Quad.easeIn});
        tlHoverZigzags.to(symbolToAnimate, 0.3, {scaleX: 1, x: diffTranslation, ease:Quad.easeOut});
    }
    if(slashes.length){
        tlInSlashes = createTl(true, slashes, false);
        tlInSlashes.play();

        diffTranslation = -33;
        symbolToAnimate = slashes.closest('.symbol').find('.hoverAnimation');
        tlHoverSlashes.to(symbolToAnimate, 0.2, {scaleX: 1.5, ease:Quad.easeIn});
        tlHoverSlashes.to(symbolToAnimate, 0.3, {scaleX: 1, x: diffTranslation, ease:Quad.easeOut});
    }
    if(dots.length){
        tlInDots = createTl(true, dots, true);
        tlInDots.play();

        diffTranslation = -35;
        symbolToAnimate = dots.closest('.symbol').find('.hoverAnimation');
        tlHoverDots.to(symbolToAnimate, 0.2, {scaleX: 1.5, ease:Quad.easeIn});
        tlHoverDots.to(symbolToAnimate, 0.3, {scaleX: 1, x: diffTranslation, ease:Quad.easeOut});
    }

    // Préparation des timelines pour le hover
    $('.skill').on('mouseenter', function(){
        dataSkill = $(this).data('skill');
        if(dataSkill == 'strategy'){
            tlHoverDashes.progress(0).tweenTo(tlHoverDashes.duration());
        }else if(dataSkill == 'identity'){
            tlHoverWaves.progress(0).tweenTo(tlHoverWaves.duration());
        }else if(dataSkill == 'design'){
            tlHoverZigzags.progress(0).tweenTo(tlHoverZigzags.duration());
        }else if(dataSkill == 'animation'){
            tlHoverSlashes.progress(0).tweenTo(tlHoverSlashes.duration());
        }else if(dataSkill == 'dev'){
            tlHoverDots.progress(0).tweenTo(tlHoverDots.duration());
        }
    }).on('mouseleave', function(){
        symbolToAnimate = $(this).find('.hoverAnimation');
        TweenMax.to(symbolToAnimate, 0.3, {scaleX: 1, x: 0});
    });

    ////////////////////////////////////////////////
    // Home functions
    ////////////////////////////////////////////////

    var Home = Barba.BaseView.extend({ namespace: 'home',
        onEnter: function(){
            // The new Container is ready and attached to the DOM.

            skillsHome = $('#skillsHome');
            skillsTop = skillsHome.offset().top - 100;
            skillsHome.data('top', skillsTop);
        },
        onEnterCompleted: function(){
            // The Transition has just finished.

            var portfolioItems = $('#portfolio').find('.portfolio-item');

            // Anim top home
            if(!animTopSetUp){
                animTopSetUp = animTop(myScroll, body, header, skillsHome);
            }

            // Anim skills with header
            if(!animSkillsSetUp){
                animSkillsSetUp = animSkillsScroll(myScroll, body, header, skillsHome);
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
    // About functions
    ////////////////////////////////////////////////

    var About = Barba.BaseView.extend({ namespace: 'about',
        onEnter: function(){
            // The new Container is ready and attached to the DOM.
        },
        onEnterCompleted: function(){
            // The Transition has just finished.
            animYearAbout(myScroll);
            animTextAbout();
        },
        onLeave: function(){
            // A new Transition toward a new page has just started.
        },
        onLeaveCompleted: function(){
            // The Container has just been removed from the DOM.
        }
    });
    About.init();



    ////////////////////////////////////////////////
    // Load Page
    ////////////////////////////////////////////////

    var lastClickedLink;

    Barba.Pjax.start();
    Barba.Dispatcher.on('linkClicked', function(e){
        Barba.Pjax.getTransition = function(){
            return pageTransition(e);
        };
    });
    // Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container){
    //     if(!animTopSetUp){
    //         animTop(myScroll, body, header, skillsHome, skillsTop);
    //     }
    // });

    $(window).on('resize', function(){
        if(skillsHome.length && !skillsHome.hasClass('fixed')){
            skillsTop = skillsHome.offset().top - 100;
            skillsHome.data('top', skillsTop);
        }
	}).on('load', function(){

	});

});
