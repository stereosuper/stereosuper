var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/minified/TweenMax.min.js');
window.requestAnimFrame = require('./requestAnimFrame.js');

module.exports = function(myScroll, body, header){
    var animatingTop = false;
    var skillsHome = $('#skillsHome'), htmlBody = $('html, body');
    var skillsTop = skillsHome.offset().top - 130;
    var isHome = body.hasClass('home') ? true : false;

    (function onScroll(){
        var blockTitle = $('#blockTitle'), video = $('#video');
        myScroll = $(document).scrollTop();
        if(body.hasClass('home')){
            if(myScroll > 100 && !body.hasClass('scrolled') && !animatingTop){
                TweenMax.to(blockTitle, 0.6, {opacity: 0});
                TweenMax.to(video, 0.6, {opacity: 0});
                body.addClass('scrolled');
                animatingTop = true;
                htmlBody.stop().animate({scrollTop: skillsTop}, 700, function(){
                    animatingTop = false;
                    header.addClass('scrolled');
                });
            }
            if(myScroll < skillsTop - 20 && body.hasClass('scrolled') && !animatingTop){
                TweenMax.to(blockTitle, 0.6, {opacity: 1, delay: 0.6});
                TweenMax.to(video, 0.6, {opacity: 1, delay: 0.6});
                body.removeClass('scrolled');
                header.removeClass('scrolled');
                animatingTop = true;
                htmlBody.stop().animate({scrollTop: 0}, 700, function(){
                    animatingTop = false;
                });
            }
        }else{
            body.removeClass('scrolled');
            header.removeClass('scrolled');
        }
        requestAnimFrame(onScroll);
    }());

    body.on('mousewheel', function(e){
        if(animatingTop){
            e.preventDefault();
            e.stopPropagation();
        }
    });

    return isHome;
};
