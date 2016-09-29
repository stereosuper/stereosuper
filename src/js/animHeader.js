var $ = require('./libs/jquery/dist/jquery.min.js');

window.requestAnimFrame = require('./requestAnimFrame.js');
var detectScrollDir = require('./detectScrollDir.js');

module.exports = function(myScroll, body, header, skillsHome){
    var lastScroll = myScroll, scrollDir = 0;

    (function scrollHeader(){
        myScroll = $(document).scrollTop();

        if(myScroll !== lastScroll){
            scrollDir = detectScrollDir(myScroll, lastScroll);

            skillsHome = $('#skillsHome');

            // synch with animSkills.js (only on home)
            if((header.hasClass('scrolled') && myScroll > skillsHome.data('top') + 50) || !body.hasClass('home')){
                if(scrollDir > 0){
                    header.removeClass('off');
                }else if(scrollDir < 0){
                    header.addClass('off');
                }
            }
        }

        lastScroll = myScroll;

        requestAnimFrame(scrollHeader);
    })();
}
