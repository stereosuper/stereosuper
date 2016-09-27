var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');

window.requestAnimFrame = require('./requestAnimFrame.js');

module.exports = function(myScroll, body, header, skillsHome, skillsTop){
    var animatingTop = false;
    var htmlBody = $('html, body'), blockTitle, video;
    var isHome = body.hasClass('home') ? true : false;

    function onScroll(){
        blockTitle = $('#blockTitle');
        video = $('#video');
        skillsHome = $('#skillsHome');
        myScroll = $(document).scrollTop();

        if(body.hasClass('home')){
            if(myScroll > 100 && !body.hasClass('scrolled') && !animatingTop){
                TweenMax.to(blockTitle, 0.6, {opacity: 0});
                TweenMax.to(video, 0.3, {opacity: 0});
                body.addClass('scrolled');
                animatingTop = true;
                htmlBody.stop().animate({scrollTop: skillsTop}, 700, function(){
                    animatingTop = false;
                    header.addClass('scrolled');
                    skillsHome.addClass('fixed');
                });
            }
            if(myScroll < skillsTop - 20 && body.hasClass('scrolled') && !animatingTop){
                TweenMax.to(blockTitle, 0.6, {opacity: 1, delay: 0.6});
                TweenMax.to(video, 0.6, {opacity: 1, delay: 0.6});
                body.removeClass('scrolled');
                header.removeClass('scrolled');
                skillsHome.removeClass('fixed').removeClass('down');
                animatingTop = true;
                htmlBody.stop().animate({scrollTop: 0}, 700, function(){
                    animatingTop = false;
                    header.removeClass('off');
                });
            }
        }else{
            body.removeClass('scrolled');
            header.removeClass('scrolled');
            animatingTop = false;
        }

        requestAnimFrame(onScroll);
    }

    if(isHome){
        onScroll();

        body.on('mousewheel', function(e){
            if(animatingTop){
                e.preventDefault();
                e.stopPropagation();
            }
        });
    }

    return isHome;
};
