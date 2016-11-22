var $ = require('./libs/jquery/dist/jquery.slim.min.js');

module.exports = function(){
    var nbImg = 15, timer;
    var stereoSrc = [], superSrc = [], j = 0;

    function preload(name, nb){
        var img = new Image();
        img.src = document.location.origin + '/layoutImg/' + name + '-' + nb + '.jpg';
        return img;
    }

    function addRandomLogo(container){
        var random = Math.floor(Math.random() * nbImg) + 1;
        container.removeClass().addClass('logo-' + random);
    }

    function changeLogo(){
        addRandomLogo($('#stereo'));
        addRandomLogo($('#super'));

        timer = setTimeout(changeLogo, 750);
    }

    for(j; j<nbImg; j++){
        stereoSrc[j] = preload('stereo', (j+1));
        superSrc[j] = preload('super', (j+1));
    }

    changeLogo();

    $('#logo404').on('mouseenter', function(){
        clearTimeout(timer);
    }).on('mouseleave', changeLogo);
}
