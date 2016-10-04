var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var isMobile = require('./isMobile.min.js');

window.requestAnimFrame = require('./requestAnimFrame.js');

module.exports = function(myScroll, body, header, skillsHome){
    var animatingTop = false;
    var htmlBody = $('html, body'), blockTitle, video;
    var isHome = body.hasClass('home') ? true : false;

    function onScroll(){
        blockTitle = $('#blockTitle');
        video = $('#video');
        skillsHome = $('#skillsHome');
        myScroll = $(document).scrollTop();

        if(skillsHome.is(':visible') && !isMobile.any){
            if(body.hasClass('home')){
                if(myScroll > 100 && !body.hasClass('scrolled') && !animatingTop){
                    animatingTop = true;
                    TweenMax.to(blockTitle, 0.6, {opacity: 0});
                    TweenMax.to(video, 0.3, {opacity: 0});
                    body.addClass('scrolled');
                    htmlBody.stop().animate({scrollTop: skillsHome.data('top')}, 700, function(){
                        animatingTop = false;
                        header.addClass('scrolled');
                        video.find('video').get(0).pause();
                    });
                }else if(myScroll < skillsHome.data('top') - 20 && body.hasClass('scrolled') && !animatingTop){
                    animatingTop = true;
                    TweenMax.to(blockTitle, 0.6, {opacity: 1, delay: 0.6});
                    TweenMax.to(video, 0.6, {opacity: 1, delay: 0.6});
                    body.removeClass('scrolled');
                    header.removeClass('scrolled').removeClass('off');
                    htmlBody.stop().animate({scrollTop: 0}, 700, function(){
                        animatingTop = false;
                        header.removeClass('off');
                        video.find('video').get(0).play();
                    });
                }
            }
        }else{
            body.removeClass('scrolled');
            header.removeClass('scrolled');
            animatingTop = false;
            if(body.hasClass('home')){
                myScroll > 50 ? video.addClass('off') : video.removeClass('off');
            }
        }

        requestAnimFrame(onScroll);
    }

    if(isHome){
        onScroll();

        if(!isMobile.any){
            body.on('mousewheel', function(e){
                if(animatingTop){
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }
    }

    return isHome;
};
