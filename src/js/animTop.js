var $ = require('./libs/jquery/dist/jquery.slim.min.js');
//var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

var isMobile = require('./isMobile.min.js');

var throttle = require('./throttle.js');
window.requestAnimFrame = require('./requestAnimFrame.js');

module.exports = function(myScroll, body, header){
    var video = $('#video'), player, wrapperVideo = $('.wrapper-video-home');

    function createVideo(){
        var options = {
            id: 189647536,
            byline: false,
            loop: true,
            title: false
        };
        player = new Vimeo.Player('video', options);
        player.ready().then(function(){
            var src = video.find('iframe').attr('src');
            video.find('iframe').attr('src', src + "&background=1");
            player.play();
            TweenMax.set(video, {opacity: 1, delay: 0.5});
        });
    }

    function onScroll(){
        if(!body.hasClass('home')) return;

        video = $('#video');

        myScroll = $(document).scrollTop();

        if(myScroll > 50){
            video.addClass('off');
            header.addClass('scrolled');
        }else{
            video.removeClass('off');
            header.removeClass('scrolled');
        }
    }

    onScroll();
    !isMobile.any ? createVideo() : wrapperVideo.addClass('noVideo');
    
    $(document).on('scroll', throttle(function(){
        requestAnimFrame(onScroll);
    }, 40));
};
