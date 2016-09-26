'use strict';

var Barba = require('./libs/barba.min.js');
var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/minified/TweenMax.min.js');
//var TimelineMax = require('./libs/gsap/src/minified/TimelineMax.min.js');


$(function(){

    window.requestAnimFrame = require('./requestAnimFrame.js');
    var getPosWithoutTranslate = require('./getPosWithoutTranslate.js');
    var PageTransition = require('./pageTransition.js');
    var animTop = require('./animTop.js');
    var portfolioItemsAnimation = require('./portfolioItemsAnimation.js');

    var windowWidth = $(window).width(), windowHeight = $(window).height(), myScroll = $(document).scrollTop();

    var body = $('body');
    var main = $('#main');
    var header = $('#header');



    // isMobile.any ? body.addClass('is-mobile') : body.addClass('is-desktop');


    ////////////////////////////////////////////////
    // Anim Top Home
    ////////////////////////////////////////////////

    var animSetUp = animTop(myScroll, body, header);

    ////////////////////////////////////////////////
    // anim ref home
    ////////////////////////////////////////////////

    //var portfolioSetUp = portfolioItemsAnimation(myScroll, body);

    var Homepage = Barba.BaseView.extend({
      namespace: 'homepage',
      onEnter: function() {
          // The new Container is ready and attached to the DOM.
      },
      onEnterCompleted: function() {
          // The Transition has just finished.
          portfolioItemsAnimation(myScroll);
      },
      onLeave: function() {
          // A new Transition toward a new page has just started.
      },
      onLeaveCompleted: function() {
          // The Container has just been removed from the DOM.
      }
    });

    // Don't forget to init the view!
    Homepage.init();

    ////////////////////////////////////////////////
    // Load Page
    ////////////////////////////////////////////////

    Barba.Pjax.start();
    Barba.Pjax.getTransition = function(){
        return PageTransition;
    };
    Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container){
        if(!animSetUp){
            animTop(myScroll, body, header);
        }
    });
   


    $(window).on('resize', function(){


	}).on('load', function(){

	});

});
