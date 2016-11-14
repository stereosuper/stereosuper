var $ = require('./libs/jquery/dist/jquery.slim.min.js');
//var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
//var isMobile = require('./isMobile.min.js');

var throttle = require('./throttle.js');
window.requestAnimFrame = require('./requestAnimFrame.js');

module.exports = function(myScroll, body, header){
    var video, player;

    function onScroll(){
        if(!body.hasClass('home')) return;

        player = new Vimeo.Player($('#videoIframe').get(0));
        video = $('#video');

        myScroll = $(document).scrollTop();

        if(myScroll > 50){
            video.addClass('off');
            header.addClass('scrolled');
            player.pause();
        }else{
            video.removeClass('off');
            player.play();
            header.removeClass('scrolled');
        }
    }

    onScroll();

    $(document).on('scroll', throttle(function(){
        requestAnimFrame(onScroll);
    }, 40));
};
