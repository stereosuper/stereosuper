'use strict';

var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var isMobile = require('./isMobile.min.js');
// var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
// var TimelineMax = require('./libs/gsap/src/uncompressed/TimelineMax.js');


$(function(){

    // window.requestAnimFrame = require('./requestAnimFrame.js');
    // var getPosWithoutTranslate = require('./getPosWithoutTranslate.js');
    // var stringToArray = require('./stringToArray.js');
    var throttle = require('./throttle.js');

    var pageTransition = require('./pageTransition.js');
    var animHeaderScroll = require('./animHeader.js');

    var animTop = require('./animTop.js');
    var animSkillsScroll = require('./animSkillsScroll.js');
    var portfolioItemsAnimation = require('./portfolioItemsAnimation.js');
    var animSkillsHover = require('./animSkillsHover.js');

    var animYearAbout = require('./animYearABout.js');
    var animTextAbout = require('./animTextABout.js');
    var animTimelineAbout = require('./animTimelineAbout.js');

    var checkIfInView = require('./checkIfInView.js');

    var animHandMap = require('./map.js');
    var headerContactScroll = require('./headerContactScroll.js');

    var transiInHome = require('./transiInHome.js');
    var transiInPortfolio = require('./transiInPortfolio.js');

    var previousNextReferences = require('./previousNextReferences.js');
    var animSouvenir = require('./animSouvenir.js');


    var windowWidth = $(window).outerWidth(), windowHeight = $(window).height();
    var myScroll = $(document).scrollTop();

    var body = $('body');
    var htmlTag = $('html');
    // var main = $('#main');
    var header = $('#header'), menu = header.find('.menu-header');
    var skillsHome = $('#skillsHome'), skillsTop = 0;


    isMobile.any ? htmlTag.addClass('is-mobile') : htmlTag.addClass('is-desktop');


    ////////////////////////////////////////////////
    // Background blend mode detection
    ////////////////////////////////////////////////
    if('CSS' in window && 'supports' in window.CSS) {
        var support = window.CSS.supports('mix-blend-mode', 'soft-light') ? 'mix-blend-mode' : 'no-mix-blend-mode';
        htmlTag.addClass(support);
    }

    ////////////////////////////////////////////////
    // Header Scroll Animation
    ////////////////////////////////////////////////

    animHeaderScroll(myScroll, body, header, skillsHome);
    //var animSkillsSetUp = animSkillsScroll(myScroll, body, header, skillsHome);


    ////////////////////////////////////////////////
    // Anim Top Home
    ////////////////////////////////////////////////

    // skillsHome.data('top', skillsTop);
    //var animTopSetUp = animTop(myScroll, body, header, skillsHome);

    ////////////////////////////////////////////////
    // Transitions in
    ////////////////////////////////////////////////

    if(body.hasClass('home')){
        transiInHome($('#page'));
    }else if(body.hasClass('portfolio')){
        transiInPortfolio($('#page'));
    }


    ////////////////////////////////////////////////
    // Home functions
    ////////////////////////////////////////////////

    var Home = Barba.BaseView.extend({ namespace: 'home',
        onEnter: function(){
            // The new Container is ready and attached to the DOM.
            var portfolio = $('#portfolio');
            var portfolioItems = portfolio.find('.portfolio-item');

            skillsHome = $('#skillsHome');
            skillsTop = skillsHome.offset().top - 100;
            skillsHome.data('top', skillsTop);

            // Anim top home
            // if(!animTopSetUp){
            //     animTopSetUp = animTop(myScroll, body, header, skillsHome);
            // }

            if(!isMobile.any){
                animSkillsScroll(myScroll, body, header, skillsHome);

                // Anim Refs Home
                portfolioItemsAnimation(myScroll, windowHeight, windowWidth, portfolioItems, portfolio, body);

                // Anim skills hover
                animSkillsHover(body, portfolioItems);
            }

            animTop(myScroll, body, header, skillsHome);
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
    Home.init();

    ////////////////////////////////////////////////
    // Portfolio functions
    ////////////////////////////////////////////////

    var Portfolio = Barba.BaseView.extend({ namespace: 'portfolio',
        onEnter: function(){
            // The new Container is ready and attached to the DOM.
            previousNextReferences();
        },
        onEnterCompleted: function(){
            // The Transition has just finished.
            animSouvenir();
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
            menu.find('li').eq(0).find('a').addClass('active').parents('li').siblings().find('a').removeClass('active');
        },
        onEnterCompleted: function(){
            // The Transition has just finished.
            animYearAbout(myScroll, windowWidth, body);
            animTimelineAbout(body);
            checkIfInView(body);
            animTextAbout(body);
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
            menu.find('li').eq(1).find('a').addClass('active').parents('li').siblings().find('a').removeClass('active');
        },
        onEnterCompleted: function(){
            // The Transition has just finished.
            animHandMap();
            headerContactScroll(body);
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
    // Load Page
    ////////////////////////////////////////////////

    Barba.Pjax.start();
    Barba.Pjax.getTransition = function(){
        return pageTransition(body, menu);
    };
    Barba.Dispatcher.on('linkClicked', function(e){
        //console.log(Barba.Pjax.transitionProgress);
        Barba.Pjax.getTransition = function(){
            return pageTransition(body, menu, $(e));
        };
    });

    // Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container){
    //     console.log(Barba.HistoryManager.currentStatus())
    // });

    $(window).on('resize', throttle(function(){
        if(skillsHome.length && !skillsHome.hasClass('fixed')){
            skillsTop = skillsHome.offset().top - 100;
            skillsHome.data('top', skillsTop);
        }
	}, 60));

});
