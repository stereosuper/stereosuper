var $ = require('./libs/jquery/dist/jquery.min.js');

var stringToArray = require('./stringToArray.js');

module.exports = function(body){
    var thisData, theseDatas;
    var portfolioItems = $('.portfolio-item');
    var skills = $('.skill');

    body.on('mouseenter', '.skill', function(){
        thisData = $(this).data('skill');
        portfolioItems.each(function(){
            theseDatas = stringToArray($(this).data('skill'));
            if(theseDatas.indexOf(thisData) < 0){
                $(this).addClass('off');
            }
        });
    }).on('mouseleave', '.skill', function(){
        portfolioItems.removeClass('off');
    });

    body.on('mouseenter', '.portfolio-item', function(){
        theseDatas = stringToArray($(this).data('skill'));
        skills.each(function(){
            thisData = $(this).data('skill');
            if(theseDatas.indexOf(thisData) > -1){
                $(this).addClass('on');
            }
        });
    }).on('mouseleave', '.portfolio-item', function(){
        skills.removeClass('on');
    });
}
