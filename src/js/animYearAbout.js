var $ = require('./libs/jquery/dist/jquery.min.js');
var TweenMax = require('./libs/gsap/src/uncompressed/TweenMax.js');
var drawSVG = require('./libs/gsap/src/uncompressed/plugins/DrawSvgPlugin.js');
// var isMobile = require('./isMobile.min.js');

// window.requestAnimFrame = require('./requestAnimFrame.js');
// var detectScrollDir = require('./detectScrollDir.js');
var svgYearContent = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 102 102" class="svg-year-content"><path stroke-width="1" d="M50,0L50,0c27.6,0,50,22.4,50,50v0c0,27.6-22.4,50-50,50h0C22.4,100,0,77.6,0,50v0C0,22.4,22.4,0,50,0z"/></svg>';

module.exports = function(myScroll, windowWidth){
    var yearWrapper = $('#year'), yearsData = $('[data-year]'), style = '',
        years, totalYears, initialTop, thisYear, thisYearSpan, thisYearPos, yearText, thisYearHtml, nbYears, i, thisYearData, newYearData, firstYear, lastYear, nbYearsTotal, nbYearsDone, percentageYears, yearTopPosition,
        svg = $('#yearSvg'), containerYearLandmark = $('.container-year-landmark'), yearLandmark = $('.year-landmark'), yearLandmarkSpan = yearLandmark.find('span'), borderSvg = yearLandmark.find('.border-svg'),
        yearLandmarkTop, currentYearHtml, newCurrentYearHtml, firstYearTop, lastYearTop, beforeLastYear;

    function incrementYear(year, html, i){
        setTimeout(function(){ year.html(html + i); }, 200*i);
    }

    function zIndexContainerYearLandmark(){
        var title = $('.container-title');
        yearLandmark.offset().top > (title.offset().top + title.outerHeight()) ? containerYearLandmark.addClass('big-z-index') : containerYearLandmark.removeClass('big-z-index');
    }

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

    function scrollProgression(){
        myScroll = $(this).scrollTop();
        yearLandmarkTop = yearLandmark.offset().top;

        years.each(function(){
            thisYear = $(this);
            thisYearSpan = thisYear.find('span');
            thisYearPos = thisYear.data('top');
            if(yearLandmarkTop > thisYearPos){
                // bounce year
                if(!thisYear.hasClass('fixed')){
                    TweenMax.fromTo(borderSvg, 0.5, {scale: 0.8}, {scale: 1, ease: Elastic.easeOut.config({strength:5})});
                }
                thisYear.addClass('fixed');
                newYearData = thisYear.data('year');
            }else{
                // bounce year
                if(thisYear.hasClass('fixed')){
                    TweenMax.fromTo(borderSvg, 0.5, {scale: 0.8}, {scale: 1, ease: Elastic.easeOut.config({strength:5})});
                }
                thisYear.removeClass('fixed');
            }
        });
        if(newYearData != thisYearData){
            thisYearData = newYearData;
            if(thisYearData === 'now'){
                yearLandmarkSpan.html(thisYearData);
                svgProgression(svg, lastYear+1, true);
            }else{
                thisYearHtml = isNaN(parseInt(yearLandmarkSpan.html())) ? yearLandmarkSpan.html() : parseInt(yearLandmarkSpan.html());
                nbYears = thisYearData - thisYearHtml;
                i = 1;
                yearLandmarkSpan.html(thisYearData);
                svgProgression(svg, thisYearData, true);
            }
        }

        firstYearTop = years.first().data('top');
        lastYearTop = years.last().data('top');
        if(myScroll+firstYearTop < lastYearTop){
            TweenMax.set(yearLandmark, {position: 'fixed', 'top': firstYearTop+'px'});
        }else{
            TweenMax.set(yearLandmark, {position: 'absolute', 'top': lastYearTop+1+'px'});
        }
    }

    function setYearsPosition(){
        var yearsHtml = '';

        yearsData.each(function(i){
            if(i === 0){
                initialTop = ($(this).offset().top - 50) | 0;
            }
            yearText = $(this).data('year');
            yearTopPosition = windowWidth > 767 ? ($(this).offset().top - 50) | 0 : ($(this).offset().top - 3) | 0;
            style = 'top:'+yearTopPosition+'px;';
            yearsHtml += '<div class="year" data-top="'+ yearTopPosition +'" style="'+ style +'" data-year="' + $(this).data('year') + '"><span class="">' + yearText + '</span>' + '</div>';
        });

        yearWrapper.html(yearsHtml);
        years = yearWrapper.find('.year');
        totalYears = years.length;
        firstYear = parseInt(years.eq(0).data('year'));
        lastYear = parseInt(years.eq(-2).data('year'));

        yearLandmark.css('top', initialTop +'px');
        TweenMax.set(svg.find('path'), {drawSVG: '0%'});
    }

    setYearsPosition();

    scrollProgression();
    zIndexContainerYearLandmark();

    $(document).on('scroll', function(){
        scrollProgression();
        zIndexContainerYearLandmark();
    });

    $(window).on('resize', function(){
        windowWidth = $(window).outerWidth();
        setYearsPosition();

        scrollProgression();
        zIndexContainerYearLandmark();
    });
}
