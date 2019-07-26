var $ = require('./libs/jquery/dist/jquery.slim.min.js');

var stringToArray = require('./stringToArray.js');
var createTlHover = require('./tlSkillsHover.js');

module.exports = function(body, portfolioItems){
    var thisData, theseDatas;
    var skills = $('.skill'),
        parentSkills = $('.skills'),
        parentSkillsData;

    var dashes = $('.dashes >span'), tlHoverDashes,
        wrapperWaves = $('.wrapper-waves'), waves = $('.waves'), tlHoverWaves,
        wrapperZigzags = $('.wrapper-zigzags'), zigzags = $('.zigzags'), tlHoverZigzags,
        slashes = $('.slashes >span'), tlHoverSlashes,
        dots = $('.dots >span'), tlHoverDots,
        dataSkill, symbolToAnimate,
        portfolioItemOpacity;

    function switchSkills(data){
        switch(data){
            case 'strategy':
                tlHoverDashes.progress(0).tweenTo(tlHoverDashes.duration());
                break;
            case 'identity':
                tlHoverWaves.progress(0).tweenTo(tlHoverWaves.duration());
                break;
            case 'design':
                tlHoverZigzags.progress(0).tweenTo(tlHoverZigzags.duration());
                break;
            case 'ux':
                tlHoverSlashes.progress(0).tweenTo(tlHoverSlashes.duration());
                break;
            case 'dev':
                tlHoverDots.progress(0).tweenTo(tlHoverDots.duration());
                break;
        }
    }

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


    
    /*body.on('mouseenter', '.skill', function(){
        if($(this).parents('body').hasClass('home')){
            if(!$(this).hasClass('off')){
                thisData = $(this).data('skill');
                switchSkills(thisData);
            }
        }else{
            skills.removeClass('off');
            $('.skills.selected').removeClass('selected');
            parentSkills.data('skill-selected', '');
        }
    }).on('click', '.skill', function(){
        if($(this).parents('body').hasClass('home')){
            thisData = $(this).data('skill');
            parentSkillsData = parentSkills.data('skill-selected');
            switchSkills(thisData);
            if(parentSkills.hasClass('selected')){
                if(thisData === parentSkillsData){
                    parentSkills.removeClass('selected');
                    parentSkills.data('skill-selected', '');
                    skills.removeClass('off');
                    //
                    portfolioItems.removeClass('off');
                    symbolToAnimate = $(this).find('.hoverAnimation');
                    // TweenMax.to(symbolToAnimate, 0.3, {scaleX: 1, x: 0});
                    TweenMax.to([portfolioItems.find('.wrapper-bg-img'), portfolioItems.find('.bg')], 0.2, {opacity: 1});
                    TweenMax.set(portfolioItems, {opacity: 1});
                    TweenMax.to([portfolioItems.find('time'), portfolioItems.find('.title'), $(this).find('.souvenir')], 0.2, {x: 0, opacity: 1});
                    TweenMax.to(portfolioItems.find('.border-left'), 0.2, {scaleY: 1});
                    TweenMax.to(portfolioItems.find('.border-middle'), 0.2, {scaleX: 1});
                }else{
                    $(this).removeClass('off');
                    $(this).siblings().addClass('off');
                    parentSkills.data('skill-selected', thisData);

                    portfolioItems.removeClass('off');

                    // Dans un 1er temps, tous les items sont inactives
                    portfolioItems.each(function(){
                        $(this).addClass('off');
                        TweenMax.to([$(this).find('.wrapper-bg-img'), $(this).find('.bg')], 0.2, {opacity: 0});
                        portfolioItemOpacity = $(this).data('opacity');
                        TweenMax.set($(this), {opacity: portfolioItemOpacity});

                        // Disparition de l'année et titre du projet
                        TweenMax.to([$(this).find('time'), $(this).find('.title'), $(this).find('.souvenir')], 0.2, {x: 20, opacity: 0});
                        TweenMax.to($(this).find('.border-left'), 0.2, {scaleY: 0});
                        TweenMax.to($(this).find('.border-middle'), 0.2, {scaleX: 0});
                    });
                    setTimeout(function(){
                        // Ensuite on ré-active les items concernés
                        portfolioItems.each(function(){
                            theseDatas = stringToArray($(this).data('skill'));
                            if(theseDatas.indexOf(thisData) >= 0){
                                $(this).removeClass('off');
                                TweenMax.to([$(this).find('.wrapper-bg-img'), $(this).find('.bg')], 0.2, {opacity: 1});
                                TweenMax.set($(this), {opacity: 1});

                                // Réapparition de l'année et titre du projet
                                TweenMax.to([$(this).find('time'), $(this).find('.title'), $(this).find('.souvenir')], 0.2, {x: 0, opacity: 1});
                                TweenMax.to($(this).find('.border-left'), 0.2, {scaleY: 1});
                                TweenMax.to($(this).find('.border-middle'), 0.2, {scaleX: 1});
                            }
                        });
                    }, 200);
                }
            }else{
                $(this).siblings().addClass('off');
                parentSkills.addClass('selected').data('skill-selected', thisData);

                portfolioItems.removeClass('off');

                // Dans un 1er temps, tous les items sont inactives
                portfolioItems.each(function(){
                    $(this).addClass('off');
                    TweenMax.to([$(this).find('.wrapper-bg-img'), $(this).find('.bg'), $(this).find('.souvenir')], 0.2, {opacity: 0});
                    portfolioItemOpacity = $(this).data('opacity');
                    TweenMax.set($(this), {opacity: portfolioItemOpacity});

                    // Disparition de l'année et titre du projet
                    TweenMax.to([$(this).find('time'), $(this).find('.title'), $(this).find('.souvenir')], 0.2, {x: 20, opacity: 0});
                    TweenMax.to($(this).find('.border-left'), 0.2, {scaleY: 0});
                    TweenMax.to($(this).find('.border-middle'), 0.2, {scaleX: 0});
                });
                setTimeout(function(){
                    // Ensuite on ré-active les items concernés
                    portfolioItems.each(function(){
                        theseDatas = stringToArray($(this).data('skill'));
                        if(theseDatas.indexOf(thisData) >= 0){
                            $(this).removeClass('off');
                            TweenMax.to([$(this).find('.wrapper-bg-img'), $(this).find('.bg'), $(this).find('.souvenir')], 0.2, {opacity: 1});
                            TweenMax.set($(this), {opacity: 1});

                            // Réapparition de l'année et titre du projet
                            TweenMax.to([$(this).find('time'), $(this).find('.title'), $(this).find('.souvenir')], 0.2, {x: 0, opacity: 1});
                            TweenMax.to($(this).find('.border-left'), 0.2, {scaleY: 1});
                            TweenMax.to($(this).find('.border-middle'), 0.2, {scaleX: 1});
                        }
                    });
                }, 200);
            }
        }else{
            skills.removeClass('off');
            $('.skills.selected').removeClass('selected');
            parentSkills.data('skill-selected', '');
        }
    });*/

    body.on('mouseenter', '.portfolio-item', function(){
        if($(this).parents('body').hasClass('home')){
            if(!$(this).hasClass('off')){
                $(this).removeClass('off');
                skills.removeClass('off');
                TweenMax.to([$(this).find('.wrapper-bg-img'), $(this).find('.bg')], 0.2, {opacity: 1});

                theseDatas = stringToArray($(this).data('skill'));
                skills.each(function(){
                    thisData = $(this).data('skill');
                    theseDatas.indexOf(thisData) < 0 ? $(this).addClass('off') : switchSkills(thisData);
                });
            }
        }else{
            skills.removeClass('off');
            $('.skills.selected').removeClass('selected');
            parentSkills.data('skill-selected', '');
        }
    }).on('mouseleave', '.portfolio-item', function(){
        if($(this).parents('body').hasClass('home')){
            if(!$(this).hasClass('off')){
                skills.removeClass('off');
                symbolToAnimate = $('.skill').find('.hoverAnimation');
                TweenMax.set(symbolToAnimate, {scaleX: 1, x: 0});

                if(parentSkills.hasClass('selected')){
                    // On remet l'ancien
                    parentSkillsData = parentSkills.data('skill-selected');
                    $('.skill[data-skill="'+parentSkillsData+'"]').siblings().addClass('off');
                    portfolioItems.each(function(){
                        theseDatas = stringToArray($(this).data('skill'));
                        if(theseDatas.indexOf(parentSkillsData) < 0){
                            $(this).addClass('off');
                            TweenMax.to([$(this).find('.wrapper-bg-img'), $(this).find('.bg')], 0.2, {opacity: 0});
                        }
                    });
                }
            }
        }else{
            skills.removeClass('off');
            $('.skills.selected').removeClass('selected');
            parentSkills.data('skill-selected', '');
        }
    });
}

