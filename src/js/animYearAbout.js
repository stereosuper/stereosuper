var $ = require('./libs/jquery/dist/jquery.min.js');
var isMobile = require('./isMobile.min.js');

window.requestAnimFrame = require('./requestAnimFrame.js');
// var detectScrollDir = require('./detectScrollDir.js');

module.exports = function(myScroll){
    var yearWrapper = $('#year'), yearsData = $('[data-year]'), yearsHtml = '', style = '',
        years, initialTop, thisYear, thisYearPos;

    yearsData.each(function(i){
        if(i === 0){
            initialTop = ($(this).offset().top - 55) | 0;
            style = 'top:' + initialTop +'px';
        }else if(i === 1){
            style += ';opacity:0';
        }
        yearsHtml += '<div class="year" data-top="'+ (($(this).offset().top - 55) | 0) +'" style="'+ style +'">' + $(this).data('year') + '</div>';
    });
    yearWrapper.append(yearsHtml);

    years = yearWrapper.find('.year');

    $(document).on('scroll', function(){
        myScroll = $(this).scrollTop();

        years.each(function(){
            thisYear = $(this);
            thisYearPos = thisYear.data('top');

            if(thisYear.hasClass('fixed')){
                if(myScroll + initialTop - 1 < thisYearPos){
                    thisYear.css('top', initialTop + 'px').removeClass('fixed');
                }
            }else{
                if(thisYear.offset().top - 1 >= thisYearPos){
                    thisYear.css('top', thisYearPos + 'px').addClass('fixed');
                }
            }
        });
    });

    $(window).on('resize', function(){
        years.each(function(i){
            thisYear = $(this);
            if(i === 0){
                initialTop = (yearsData.eq(i).offset().top - 55) | 0;
            }
            thisYear.data('top', (yearsData.eq(i).offset().top - 55)|0).css({'top': initialTop, 'opacity': 0}).removeClass('fixed');
        });
    });
}
