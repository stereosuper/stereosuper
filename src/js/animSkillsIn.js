var $ = require('./libs/jquery/dist/jquery.min.js');
var createTl = require('./tlSkillsIn.js');

module.exports = function(){
    var dashes = $('.dashes').find('> span'),
        wrapperWaves = $('.wrapper-waves'), waves = $('.waves'),
        wrapperZigzags = $('.wrapper-zigzags'), zigzags = $('.zigzags'),
        slashes = $('.slashes').find('>span'),
        dots = $('.dots').find('>span'),
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
