var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var isMobile = require('./isMobile.min.js');

var detectScrollDir = require('./detectScrollDir.js');
var throttle = require('./throttle.js');
window.requestAnimFrame = require('./requestAnimFrame.js');

module.exports = function(myScroll, body, header, skillsHome){
    var lastScroll = myScroll, scrollDir = 0;

    function scrollHeader(){
        myScroll = $(document).scrollTop();
        scrollDir = detectScrollDir(myScroll, lastScroll);

        skillsHome = $('#skillsHome');

        // synch with animSkillsScroll.js (only on home)
        if(!body.hasClass('home') || (header.hasClass('scrolled') && myScroll > skillsHome.data('top') + 200 && skillsHome.is(':visible'))){
            if(scrollDir > 0){
                header.removeClass('off');
            }else if(scrollDir < 0){
                myScroll < 20 ? header.removeClass('off') : header.addClass('off');
            }
        }else{
            header.removeClass('off');
        }

        lastScroll = myScroll;
    }

    var scrollHandler = throttle(function(){
        requestAnimFrame(scrollHeader);
    }, 10);

    if(!isMobile.any){
        $(document).on('scroll', scrollHandler);
    }
}
