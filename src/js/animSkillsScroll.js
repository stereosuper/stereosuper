var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var isMobile = require('./isMobile.min.js');

window.requestAnimFrame = require('./requestAnimFrame.js');
var detectScrollDir = require('./detectScrollDir.js');

module.exports = function(myScroll, body, header, skillsHome){
    var lastScroll = myScroll, scrollDir = 0;
    //var isHome = body.hasClass('home') ? true : false;

    (function scrollSkills(){
        if(!body.hasClass('home')) return;

        myScroll = $(document).scrollTop();

        if(myScroll !== lastScroll){
            scrollDir = detectScrollDir(myScroll, lastScroll);

            skillsHome = $('#skillsHome');

            // synch with animHeader.js
            if(header.hasClass('scrolled') && myScroll > skillsHome.data('top') && skillsHome.is(':visible')){
                skillsHome.addClass('fixed').removeClass('top');
                if(scrollDir < 0 && header.hasClass('off')){
                    skillsHome.addClass('top').addClass('down');
                }
            }else{
                skillsHome.removeClass('fixed').removeClass('top').removeClass('down');
            }
        }

        lastScroll = myScroll;

        requestAnimFrame(scrollSkills);
    })();

    // if(body.hasClass('home') && !isMobile.any){
    //     scrollSkills();

    //     // skillsHome.on('mouseenter', function(){
    //     //     if($(this).hasClass('top')){
    //     //         header.removeClass('off');
    //     //         $(this).removeClass('top').addClass('down');
    //     //     }
    //     // }).on('mouseleave', function(){
    //     //     if(!$(this).hasClass('top') && header.hasClass('scrolled')){
    //     //         header.addClass('off');
    //     //         $(this).addClass('top').removeClass('down');
    //     //     }
    //     // });
    //     // header.on('mouseenter', function(){
    //     //     $(this).removeClass('off');
    //     //     skillsHome.removeClass('top').addClass('down');
    //     // });
    // }

    // return isHome;
}
