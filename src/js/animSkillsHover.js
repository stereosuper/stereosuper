var $ = require('./libs/jquery/dist/jquery.min.js');

var stringToArray = require('./stringToArray.js');
var createTlHover = require('./tlSkillsHover.js');

module.exports = function(body){
    var thisData, theseDatas;
    var portfolioItems = $('.portfolio-item');
    var skills = $('.skill');

    var dashes = $('.dashes >span'), tlHoverDashes,
        wrapperWaves = $('.wrapper-waves'), waves = $('.waves'), tlHoverWaves,
        wrapperZigzags = $('.wrapper-zigzags'), zigzags = $('.zigzags'), tlHoverZigzags,
        slashes = $('.slashes >span'), tlHoverSlashes,
        dots = $('.dots >span'), tlHoverDots,
        dataSkill, symbolToAnimate;

    if(dashes.length){
        tlHoverDashes = createTlHover(dashes.closest('.symbol').find('.hoverAnimation'), -36);
    }
    if(wrapperWaves.length){
        tlHoverWaves = createTlHover(wrapperWaves.closest('.symbol').find('.hoverAnimation'), -34);
    }
    if(wrapperZigzags.length){
        tlHoverZigzags = createTlHover(wrapperZigzags.closest('.symbol').find('.hoverAnimation'), -38);
    }
    if(slashes.length){
        tlHoverSlashes = createTlHover(slashes.closest('.symbol').find('.hoverAnimation'), -33);
    }
    if(dots.length){
        tlHoverDots = createTlHover(dots.closest('.symbol').find('.hoverAnimation'), -35);
    }

    body.on('mouseenter', '.skill', function(){
        thisData = $(this).data('skill');
        switch(thisData){
            case 'strategy':
                tlHoverDashes.progress(0).tweenTo(tlHoverDashes.duration());
                break;
            case 'identity':
                tlHoverWaves.progress(0).tweenTo(tlHoverWaves.duration());
                break;
            case 'design':
                tlHoverZigzags.progress(0).tweenTo(tlHoverZigzags.duration());
                break;
            case 'animation':
                tlHoverSlashes.progress(0).tweenTo(tlHoverSlashes.duration());
                break;
            case 'dev':
                tlHoverDots.progress(0).tweenTo(tlHoverDots.duration());
                break;
        }

        portfolioItems.each(function(){
            theseDatas = stringToArray($(this).data('skill'));
            if(theseDatas.indexOf(thisData) < 0){
                $(this).addClass('off');
                TweenMax.to([$(this).find('.wrapper-bg-img'), $(this).find('.bg')], 0.2, {opacity: 0});
            }
        });
    }).on('mouseleave', '.skill', function(){
        portfolioItems.removeClass('off');
        symbolToAnimate = $(this).find('.hoverAnimation');
        TweenMax.to(symbolToAnimate, 0.3, {scaleX: 1, x: 0});
        TweenMax.to([$('.portfolio-item .wrapper-bg-img'), $('.portfolio-item .bg')], 0.2, {opacity: 1});
    });

    body.on('mouseenter', '.portfolio-item', function(){
        theseDatas = stringToArray($(this).data('skill'));
        skills.each(function(){
            thisData = $(this).data('skill');
            if(theseDatas.indexOf(thisData) < 0){
                $(this).addClass('off');
            }else{
                if(thisData == 'strategy'){
                    tlHoverDashes.progress(0).tweenTo(tlHoverDashes.duration());
                }else if(thisData == 'identity'){
                    tlHoverWaves.progress(0).tweenTo(tlHoverWaves.duration());
                }else if(thisData == 'design'){
                    tlHoverZigzags.progress(0).tweenTo(tlHoverZigzags.duration());
                }else if(thisData == 'animation'){
                    tlHoverSlashes.progress(0).tweenTo(tlHoverSlashes.duration());
                }else if(thisData == 'dev'){
                    tlHoverDots.progress(0).tweenTo(tlHoverDots.duration());
                }
            }
        });
    }).on('mouseleave', '.portfolio-item', function(){
        skills.removeClass('off');
        symbolToAnimate = $('.skill').find('.hoverAnimation');
        TweenMax.set(symbolToAnimate, {scaleX: 1, x: 0});
    });
}
