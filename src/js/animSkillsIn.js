var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var createTl = require('./tlSkillsIn.js');

module.exports = function(container){
    var dashes = container.find('.dashes > span'),
        slashes = container.find('.slashes > span'),
        dots = container.find('.dots > span'),
        wrapperWaves = container.find('.wrapper-waves'), waves = container.find('.waves'),
        wrapperZigzags = container.find('.wrapper-zigzags'), zigzags = container.find('.zigzags'),
        tableTl = [];

    if(dashes.length){
        tableTl.push(createTl(true, dashes, true));
    }
    if(slashes.length){
        tableTl.push(createTl(true, slashes, false));
    }
    if(dots.length){
        tableTl.push(createTl(true, dots, true));
        console.log(dots)
    }
    if(wrapperWaves.length){
        tableTl.push(createTl(false, waves, wrapperWaves));
    }
    if(wrapperZigzags.length){
       tableTl.push(createTl(false, zigzags, wrapperZigzags));
    }

    return tableTl;
}
