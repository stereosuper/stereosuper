var $ = require('./libs/jquery/dist/jquery.slim.min.js');

var throttle = require('./throttle.js');
window.requestAnimFrame = require('./requestAnimFrame.js');

module.exports = function(body){
    var header, myScroll = $(document).scrollTop();

    function onScroll(){
        if(!body.hasClass('contact')) return;

        myScroll = $(document).scrollTop();
        header = $('#header');

        if(myScroll > $('#map').height() - header.height()){
            header.addClass('bgVisible');
        }else{
            header.removeClass('bgVisible');
        }

        console.log(myScroll)
    }
    onScroll();

    $(document).on('scroll', throttle(function(){
        requestAnimFrame(onScroll);
    }, 40));
}
