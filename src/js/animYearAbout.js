var $ = require('./libs/jquery/dist/jquery.min.js');
var isMobile = require('./isMobile.min.js');

window.requestAnimFrame = require('./requestAnimFrame.js');
// var detectScrollDir = require('./detectScrollDir.js');

module.exports = function(){
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
            /*if($(this).data('y') < $(this).data('top')){
                $(this).data('y', initialTop + myScroll);
                TweenMax.set($(this), {y: $(this).data('y') + 'px'});
            }else if(!$(this).hasClass('fixed')){
                $(this).addClass('fixed');
            }*/

            thisYear = $(this);
            thisYearPos = thisYear.data('top');

            if(thisYear.hasClass('fixed')){
                if(myScroll + initialTop < thisYearPos){
                    thisYear.css('top', initialTop + 'px').removeClass('fixed');
                }
            }else{
                if(thisYear.offset().top >= thisYearPos){
                    thisYear.css('top', thisYearPos + 'px').addClass('fixed');
                }
            }
        });
    });
}
