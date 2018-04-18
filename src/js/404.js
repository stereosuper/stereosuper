var $ = require('./libs/jquery/dist/jquery.slim.min.js');
var isMobile = require('./isMobile.min.js');

module.exports = function(){
    var nbImg = 14, timer, timerSuccess, counter = 0, pairs = [], done = false, reallyDone = false;
    var stereoSrc = [], superSrc = [], j = 0, imgLoaded = 0;
    var logo404 = $('#logo404'), stereoDiv = logo404.find('#stereo'), superDiv = logo404.find('#super');
    var counterHtml = logo404.find('#counter');
    var url = document.location.href, siteUrl = url.substring(0, url.lastIndexOf('/') + 1);
    var hello, firstWin, secondWin;

    // var test = 0;


    function addRandomLogo(container){
        var random = Math.floor(Math.random() * nbImg) + 1;
        container.removeClass().data('nb', '').addClass('logo-' + random).data('nb', random);
    }

    function changeLogo(){
        addRandomLogo(stereoDiv);
        addRandomLogo(superDiv);

        // test ++;
        // stereoDiv.removeClass().data('nb', '').addClass('logo-' + test).data('nb', test);
        // superDiv.removeClass().data('nb', '').addClass('logo-' + test).data('nb', test);

        timer = setTimeout(changeLogo, 300);
    }

    function checkImgLoaded(){
        imgLoaded ++;

        if(imgLoaded === (nbImg+1)*2){
            changeLogo();
            logo404.addClass('on');
        }
    }

    // function preload(name, nb){
    //     var img = new Image();
    //     img.onload = checkImgLoaded;
    //     img.src = siteUrl + '/layoutImg/' + name + '-' + nb + '.jpg';

    //     return img;
    // }

    function updateCounter(nb){
        if(pairs.indexOf(nb) > -1 || reallyDone) return;

        counter ++;
        counterHtml.find('span').html(counter + '/' + nbImg);
        pairs.push(nb);

        if(pairs.length !== nbImg) return;

        if(done){
            counterHtml.find('span').html(secondWin);
            reallyDone = true;
        }else{
            counterHtml.find('span').addClass('done').html(firstWin);
            done = true;
            nbImg ++;
            // pairs = [];
            // counter = false;
        }
    }

    if($('#page').data('lang') === 'https://stereosuper.fr/404.html'){
        hello = 'Hi there! Wanna play?';
        firstWin = "INCRREDIBLE! You've unlocked the oven glove!";
        secondWin = "CONGRATS! You're awesome! Take a screenshot and send it to us :)";
    }else{
        hello = 'Bonjour! Vous voulez jouer?';
        firstWin = "INCROYABLE! Vous avez débloqué des maniques!";
        secondWin = "BRAVO! You're awesome! Envoyez-nous donc une capture d’écran avec vos coordonnées !";
    }

    logo404.find('.to-load').on('load', checkImgLoaded).each(function(){
        if(this.complete) $(this).trigger('load');
    });

    // for(j; j<nbImg+1; j++){
    //     stereoSrc[j] = preload('stereo', (j+1));
    //     superSrc[j] = preload('super', (j+1));
    // }o

    //if(!isMobile.any){
        logo404.one('mouseenter touchstart', function(){
            counterHtml.addClass('on').find('span').html(hello);
        }).one('mouseleave touchend', function(){
            counterHtml.prepend('Score: ').find('span').html('0/' + nbImg);
        }).on('mouseenter touchstart', function(){

            clearTimeout(timer);

            if(stereoDiv.data('nb') === superDiv.data('nb')){
                timerSuccess = setTimeout(function(){
                    updateCounter(stereoDiv.data('nb'));
                }, 500);
            }/*else{
                if(counterHtml.find('span').html() !== ''){
                    counterHtml.find('i').html('Ooooh, so close...');
                }
            }*/
        }).on('mouseleave touchend', function(){
            if(counterHtml.find('span').hasClass('done')){
                counterHtml.find('span').removeClass('done').html(nbImg-1 + '/' + nbImg);
            }

            // counterHtml.find('i').html('');

            changeLogo();

            if(timerSuccess !== undefined){
                clearTimeout(timerSuccess);
            }
        });
   //}
}
