var $ = require('./libs/jquery/dist/jquery.min.js');

window.requestAnimFrame = require('./requestAnimFrame.js');
var detectScrollDir = require('./detectScrollDir.js');

module.exports = function(myScroll, body, header, skillsHome, skillsTop){
    var lastScroll = myScroll, scrollDir = 0;

    (function scrollHeader(){
        myScroll = $(document).scrollTop();
        scrollDir = detectScrollDir(myScroll, lastScroll);
        lastScroll = myScroll;

        if((header.hasClass('scrolled') && myScroll > skillsTop + 20) || !body.hasClass('home')){
            if(scrollDir > 0){
                header.removeClass('off');
                if(skillsHome.length){
                    skillsHome.removeClass('top').addClass('down');
                }
            }else if(scrollDir < 0){
                header.addClass('off');
                if(skillsHome.length){
                    skillsHome.addClass('top').removeClass('down');
                }
            }
        }

        requestAnimFrame(scrollHeader);
    })();
}
