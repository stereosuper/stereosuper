'use strict';

var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.min.js');
// var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
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

    var skills = $('.skills'),
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
    spritesTl[4].play();



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


    ////////////////////////////////////////////////
    // Hover portfolio items
    ////////////////////////////////////////////////

    var tlPortolioItemHover = new TimelineMax();
    $('.portfolio-item a').on('mouseenter', function(){
        TweenMax.set($(this).find('h2'), {css:{rotation: '0.01deg', z: 0.01, force3D: true}});
        TweenMax.to([$(this).find('.bg'), $(this).find('.wrapper-bg-img')], 0.5, {css:{scale: 1.05, rotation: '0.01deg', z: 0.01, force3D: true}, ease:Quad.easeInOut});
        TweenMax.to($(this).find('.bg-img'), 0.5, {css:{opacity: 0.3, scale: 1, rotation: '0.01deg', z: 0.01, force3D: true}, ease:Quad.easeInOut});
    }).on('mouseleave', function(){
        TweenMax.set($(this).find('h2'), {css:{clearProps: 'rotation', force3D: true}});
        TweenMax.to([$(this).find('.bg'), $(this).find('.wrapper-bg-img')], 0.5, {css:{scale: 1, rotation: '0.01deg', z: 0.01, force3D: true}, ease:Quad.easeInOut});
        TweenMax.to($(this).find('.bg-img'), 0.5, {css:{opacity: 0.15, scale: 1.05, rotation:  '0.01deg', z: 0.01, force3D: true}, ease:Quad.easeInOut});
    });

    $(window).on('resize', function(){
        if(skillsHome.length && !skillsHome.hasClass('fixed')){
            skillsTop = skillsHome.offset().top - 100;
            skillsHome.data('top', skillsTop);
        }
	}).on('load', function(){

	});

});
