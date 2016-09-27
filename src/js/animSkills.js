var $ = require('./libs/jquery/dist/jquery.min.js');

window.requestAnimFrame = require('./requestAnimFrame.js');
var detectScrollDir = require('./detectScrollDir.js');

module.exports = function(myScroll, body, header, skillsHome, skillsTop){
    var lastScroll = myScroll, scrollDir = 0;

    (function scrollSkills(){
        myScroll = $(document).scrollTop();
        scrollDir = detectScrollDir(myScroll, lastScroll);
        lastScroll = myScroll;

        // synch with animHeader.js
        if(header.hasClass('scrolled') && myScroll > skillsTop + 50){
            if(scrollDir > 0){
                skillsHome.removeClass('top').addClass('down');
            }else if(scrollDir < 0){
                skillsHome.addClass('top').removeClass('down');
            }
        }

        requestAnimFrame(scrollSkills);
    })();

    skillsHome.on('mouseenter', function(){
        if($(this).hasClass('top')){
            header.removeClass('off');
            $(this).removeClass('top').addClass('down');
        }
    }).on('mouseleave', function(){
        if(!$(this).hasClass('top')){
            header.addClass('off');
            $(this).addClass('top').removeClass('down');
        }
    });
    header.on('mouseenter', function(){
        $(this).removeClass('off');
        skillsHome.removeClass('top').addClass('down');
    });
}
