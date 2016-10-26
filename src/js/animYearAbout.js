var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
 var drawSVG = require('./libs/gsap/src/uncompressed/plugins/DrawSvgPlugin.js');
// var isMobile = require('./isMobile.min.js');

// window.requestAnimFrame = require('./requestAnimFrame.js');
// var detectScrollDir = require('./detectScrollDir.js');
var svgYearContent = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 102 102" class="svg-year-content"><path stroke-width="1" d="M50,0L50,0c27.6,0,50,22.4,50,50v0c0,27.6-22.4,50-50,50h0C22.4,100,0,77.6,0,50v0C0,22.4,22.4,0,50,0z"/></svg>';

module.exports = function(myScroll){
    var yearWrapper = $('#year'), yearsData = $('[data-year]'), yearsHtml = '', style = '',
        years, totalYears, initialTop, thisYear, thisYearSpan, thisYearPos, yearText, thisYearHtml, nbYears, i, thisYearData, firstYear, lastYear, nbYearsTotal, nbYearsDone, percentageYears,
        svg = $('#yearSvg');

    function incrementYear(year, html, i){
        setTimeout(function(){ year.html(html + i); }, 200*i);
    }


    yearsData.each(function(i){
        if(i === 0){
            initialTop = ($(this).offset().top - 55) | 0;
            style = 'top:' + initialTop +'px';
        }else if(i === 1){
            style += ';opacity:0';
        }

        yearText = i > 0 ? yearsData.eq(i - 1).data('year') : $(this).data('year');
        yearsHtml += '<div class="year" data-top="'+ (($(this).offset().top - 55) | 0) +'" style="'+ style +'" data-year="' + $(this).data('year') + '"><span class="">' + yearText + '</span>' + svgYearContent + '</div>';
    });
    yearWrapper.append(yearsHtml);
    years = yearWrapper.find('.year');
    totalYears = years.length;
    firstYear = parseInt(years.eq(0).data('year'));
    lastYear = parseInt(years.eq(-2).data('year'));

    svg.css('top', initialTop +'px');

    TweenMax.set([svg.find('path'), $('.svg-year-content').find('path')], {drawSVG: '0%'});
    var beforeLastYear;
    years.each(function(){
        thisYear = $(this);
        thisYearData = thisYear.data('year');
        if(thisYearData === 'now'){
            thisYearData = beforeLastYear+1;
        }else{
            beforeLastYear = thisYearData;
        }
        svgProgression(thisYear, thisYearData, false);
    });

    $(document).on('scroll', function(){
        myScroll = $(this).scrollTop();

        years.each(function(){
            thisYear = $(this);
            thisYearSpan = thisYear.find('span');
            thisYearPos = thisYear.data('top');
            thisYearHtml = isNaN(parseInt(thisYearSpan.html())) ? thisYearSpan.html() : parseInt(thisYearSpan.html());
            thisYearData = thisYear.data('year');
            if(thisYear.hasClass('fixed')){
                if(myScroll + initialTop - 1 < thisYearPos){
                    thisYear.css('top', initialTop + 'px').removeClass('fixed').data('year', thisYearHtml);
                    thisYearSpan.html(thisYearData);
                    svgProgression(svg, thisYearData, true);
                }
            }else{
                if(thisYear.offset().top - 1 >= thisYearPos){
                    thisYear.css('top', thisYearPos + 'px').addClass('fixed');
                    if(thisYearData === 'now'){
                        thisYear.data('year', thisYearHtml);
                        thisYearSpan.html(thisYearData);
                        svgProgression(svg, lastYear+1, true);
                    }else{
                        nbYears = thisYearData - thisYearHtml;
                        i = 1;
                        thisYear.data('year', thisYearHtml);
                        for(i; i <= nbYears; i++){
                            incrementYear(thisYearSpan, thisYearHtml, i);
                        }
                        svgProgression(svg, thisYearData, true);
                    }
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
        svg.css('top', initialTop +'px');
    });

    function svgProgression(currentSvg, currentYear, isAnimated){
        // faire avancer le svg
        nbYearsTotal = lastYear + 1 - firstYear;
        nbYearsDone = nbYearsTotal - (lastYear + 1 - currentYear);
        percentageYears = (nbYearsDone * 100) / nbYearsTotal;
        if(isAnimated){
            TweenMax.to(currentSvg.find('path'), 1, {drawSVG: percentageYears+'%'});
        }else{
            TweenMax.set(currentSvg.find('path'), {drawSVG: percentageYears+'%'});
        }
    }
}
