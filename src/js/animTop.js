var $ = require('./libs/jquery/dist/jquery.slim.min.js');
//var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
//var isMobile = require('./isMobile.min.js');

var throttle = require('./throttle.js');
window.requestAnimFrame = require('./requestAnimFrame.js');

module.exports = function(myScroll, body, header){
    var video, player;

    function createVideo(){
        var options = {
            id: 189647536,
            byline: false,
            autoplay: true,
            loop: true,
            title: false
        };
        player = new Vimeo.Player('video', options);
        player.ready().then(function(){
            var src = $('#video iframe').attr('src');
            $('#video iframe').attr('src', src + "&background=1");
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

    createVideo();
    onScroll();

    $(document).on('scroll', throttle(function(){
        requestAnimFrame(onScroll);
    }, 40));
};
