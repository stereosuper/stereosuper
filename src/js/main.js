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
    var animSkillsScroll = require('./animSkills.js');
    var portfolioItemsAnimation = require('./portfolioItemsAnimation.js');
    var animSkillsHover = require('./animSkillsHover.js');

    var animYearAbout = require('./animYearABout.js');


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
    // Sprites skills
    ////////////////////////////////////////////////

    /*var skills = $('.skills'),
        nbSkills = skills.find('li').length, j = 0,
        numCols = 6, numRows = 6, frameWidth = 95, frameHeight = 11,
        symbols = skills.find('.symbol'),
        steppedEase = new SteppedEase(numCols-1),
        spritesTl = [];

    for(j; j<nbSkills; j++){
        var i = 0, sprite = symbols.eq(j);
        spritesTl[j] = new TimelineMax({paused: true, repeat: -1});
        for(i; i<numRows; i++){
           spritesTl[j].add(TweenMax.fromTo(sprite, 0.15, {backgroundPosition: '0 -'+(frameHeight*i)+'px'}, {backgroundPosition: '-'+(frameWidth*(numCols-1))+'px -'+(frameHeight*i)+'px', ease: steppedEase}));
        }
        TweenMax.set(sprite, {backgroundPosition: '0 0'});
    }
    spritesTl[0].play();
    spritesTl[1].play();
    spritesTl[2].play();
    spritesTl[3].play();
    spritesTl[4].play();*/

    var dashes = $('.dashes >li'),
        wrapperWaves = $('.wrapper-waves'), waves = $('.waves'),
        wrapperZigzags = $('.wrapper-zigzags'), zigzags = $('.zigzags'),
        slashes = $('.slashes >li'),
        dots = $('.dots >li');
    var StagIcon, StagIcon2;
    var AnimHoverAll;
    TweenMax.staggerTo(dashes, 0.35, {opacity: 1, y: 0, ease:Back.easeOut.config(5)}, 0.06);
    TweenMax.to(wrapperWaves, 2, {width: '130%'});
    TweenMax.to(waves, 0.8, {scaleY: 1, ease:Back.easeOut.config(5)});
    TweenMax.to(wrapperZigzags, 2, {width: '130%'});
    TweenMax.to(zigzags, 0.8, {scaleY: 1, ease:Back.easeOut.config(5)});
    TweenMax.staggerTo(slashes, 0.35, {opacity: 1, scaleY: 1, ease:Back.easeOut.config(5)}, 0.06);
    TweenMax.staggerTo(dots, 0.35, {opacity: 1, y: 0, ease:Back.easeOut.config(5)}, 0.06);



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
