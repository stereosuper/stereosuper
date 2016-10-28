'use strict';

var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.min.js');
// var isMobile = require('./isMobile.min.js');
// var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
// var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');


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

    var animHandMap = require('./map.js');


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
    // Home functions
    ////////////////////////////////////////////////

    var Home = Barba.BaseView.extend({ namespace: 'home',
        onEnter: function(){
            // The new Container is ready and attached to the DOM.
            skillsHome = $('#skillsHome');
            skillsTop = skillsHome.offset().top - 100;
            skillsHome.data('top', skillsTop);
            console.log('home');
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
    // Portfolio functions
    ////////////////////////////////////////////////

    var Portfolio = Barba.BaseView.extend({ namespace: 'portfolio',
        onEnter: function(){
            // The new Container is ready and attached to the DOM.

        },
        onEnterCompleted: function(){
            // The Transition has just finished.

        },
        onLeave: function(){
            // A new Transition toward a new page has just started.
        },
        onLeaveCompleted: function(){
            // The Container has just been removed from the DOM.
        }
    });
    Portfolio.init();


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
    // Contact functions
    ////////////////////////////////////////////////

    var Contact = Barba.BaseView.extend({ namespace: 'contact',
        onEnter: function(){
            // The new Container is ready and attached to the DOM.
        },
        onEnterCompleted: function(){
            // The Transition has just finished.
            animHandMap();
        },
        onLeave: function(){
            // A new Transition toward a new page has just started.
        },
        onLeaveCompleted: function(){
            // The Container has just been removed from the DOM.
        }
    });
    Contact.init();


    ////////////////////////////////////////////////
    // Transitions in
    ////////////////////////////////////////////////
    var transiInHome = require('./transiInHome.js');
    var transiInPortfolio = require('./transiInPortfolio.js');

    if($('body').hasClass('home')){
        transiInHome();
    }else if($('body').hasClass('portfolio')){
        transiInPortfolio();
    }else if($('body').hasClass('about')){

    }


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
