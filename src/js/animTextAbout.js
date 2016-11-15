var $ = require('./libs/jquery/dist/jquery.slim.min.js');

var stringToArray = require('./stringToArray.js');

module.exports = function(body){
    var textWrapper = $('#writting'), texts = stringToArray(textWrapper.data('text')), i = 0, currentText, j = 0;
    var btnTxtAbout = $('#openTxtAbout');

    (function type(){
        if(!body.hasClass('about')) return;

        currentText = texts[j].slice(0, i++);
        textWrapper.html(currentText);

        if(currentText === texts[j]){
            j === texts.length - 1 ? j = 0 : j++;
            i = 0;
            setTimeout(type, 2000);
        }else{
            setTimeout(type, 70);
        }
    })();

    btnTxtAbout.on('click', function(){
        $(this).parents('.fade-txt-wrapper').addClass('off');
    });
}
