var $ = require('./libs/jquery/dist/jquery.slim.min.js');

module.exports = function(){
    var nbImg = 14, timer, timerSuccess, counter = false, pairs = [], done = false, reallyDone = false;
    var stereoSrc = [], superSrc = [], j = 0;
    var logo404 = $('#logo404'), stereoDiv = logo404.find('#stereo'), superDiv = logo404.find('#super');
    var counterHtml = logo404.find('#counter');

    function preload(name, nb){
        var img = new Image();
        img.src = document.location.origin + '/layoutImg/' + name + '-' + nb + '.jpg';
        return img;
    }

    function addRandomLogo(container){
        var random = Math.floor(Math.random() * nbImg) + 1;
        container.removeClass().data('nb', '').addClass('logo-' + random).data('nb', random);
    }

    function changeLogo(){
        addRandomLogo(stereoDiv);
        addRandomLogo(superDiv);

        timer = setTimeout(changeLogo, 250);
    }

    function updateCounter(nb){
        if(reallyDone) return;

        if(!counter){
            counter = 1;
            counterHtml.addClass('on').find('span').html('1/' + nbImg);
            pairs.push(nb);
        }else if(pairs.indexOf(nb) < 0){
            counter ++;
            counterHtml.find('span').html(counter + '/' + nbImg);
            pairs.push(nb);

            if(pairs.length === nbImg){
                if(done){
                    counterHtml.find('span').html("Congrats! You're awesome!");
                    reallyDone = true;
                }else{
                    counterHtml.find('span').addClass('done').html("Yeah! You've unlocked the oven glove!");
                    done = true;
                    nbImg ++;
                    pairs = [];
                    counter = false;
                }
            }
        }
    }

    for(j; j<nbImg; j++){
        stereoSrc[j] = preload('stereo', (j+1));
        superSrc[j] = preload('super', (j+1));

        if(j === nbImg - 1){
            changeLogo();
        }
    }

    logo404.on('mouseenter', function(){
        clearTimeout(timer);

        if(stereoDiv.data('nb') === superDiv.data('nb')){
            timerSuccess = setTimeout(function(){
                updateCounter(stereoDiv.data('nb'));
            }, 500);
        }
    }).on('mouseleave', function(){
        if(counterHtml.find('span').hasClass('done')){
            counterHtml.find('span').removeClass('done').html('0/' + nbImg);
        }

        changeLogo();

        if(timerSuccess !== undefined){
            clearTimeout(timerSuccess);
        }
    });
}
