var $ = require('./libs/jquery/dist/jquery.min.js');
var isMobile = require('./isMobile.min.js');

window.requestAnimFrame = require('./requestAnimFrame.js');
// var detectScrollDir = require('./detectScrollDir.js');

module.exports = function(){
    var yearWrapper = $('#year'), years = $('[data-year]'), yearsHtml = '';

    years.each(function(){
        yearsHtml += '<div style="top: '+ $(this).offset().top +'px">' + $(this).data('year') + '</div>';
    });
    yearWrapper.append(yearsHtml);
}
