var $ = require('./libs/jquery/dist/jquery.min.js');
var createTl = require('./tlSkillsIn.js');

module.exports = function(){
    var dashes = $('.dashes >span'), tlInDashes,
        wrapperWaves = $('.wrapper-waves'), waves = $('.waves'), tlInWaves,
        wrapperZigzags = $('.wrapper-zigzags'), zigzags = $('.zigzags'), tlInZigzags,
        slashes = $('.slashes >span'), tlInSlashes,
        dots = $('.dots >span'), tlInDots,
        dataSkill, symbolToAnimate,
        tableTl = [];

    if(dashes.length){
        tableTl.push(createTl(true, dashes, true).play());
        
    }
    if(wrapperWaves.length){
        tableTl.push(createTl(false, waves, wrapperWaves).play());
    }
    if(wrapperZigzags.length){
       tableTl.push(createTl(false, zigzags, wrapperZigzags).play());
    }
    if(slashes.length){
        tableTl.push(createTl(true, slashes, false).play());
    }
    if(dots.length){
        tableTl.push(createTl(true, dots, true).play());
    }

    return tableTl;
}
