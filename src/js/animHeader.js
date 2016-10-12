var $ = require('./libs/jquery/dist/jquery.min.js');
var isMobile = require('./isMobile.min.js');

window.requestAnimFrame = require('./requestAnimFrame.js');
var detectScrollDir = require('./detectScrollDir.js');

module.exports = function(myScroll, body, header, skillsHome){
    var lastScroll = myScroll, scrollDir = 0;

    function scrollHeader(){
        myScroll = $(document).scrollTop();

        if(myScroll !== lastScroll){
            scrollDir = detectScrollDir(myScroll, lastScroll);

            skillsHome = $('#skillsHome');

            // synch with animSkillsScroll.js (only on home)
            if((header.hasClass('scrolled') && myScroll > skillsHome.data('top') + 200 && skillsHome.is(':visible')) || !body.hasClass('home')){
                if(scrollDir > 0){
                    header.removeClass('off');
                }else if(scrollDir < 0){
                    header.addClass('off');
                }
            }else{
                header.removeClass('off');
            }
        }

        lastScroll = myScroll;

        requestAnimFrame(scrollHeader);
    }

    if(!isMobile.any){
        scrollHeader();
    }
}
