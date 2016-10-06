var $ = require('./libs/jquery/dist/jquery.min.js');

// module.exports = function(scrollPosition, multiplier){
// 	multiplier = 50 * Math.sin( scrollPosition * 2 );
// 	return multiplier * Math.sin( scrollPosition ) + 80;
// }


module.exports = function(sinDivide, x, top, ampl) {
    //var track = function() {
    	var xReturn = x + ampl * Math.sin(top / sinDivide);
        return xReturn;
    //}
    
    // var top = 90;
    // setInterval(function() {
    //     var current = track(50, top, 33);
    //     $('.output', container).text(JSON.stringify(current));
    //     $('.x', container).css({left: current.x + 'px', top: current.y + 'px'});
    //     top = current.top;
    // }, 30);
}

// module.exports = function(container, sinDivide, cosDivide) {
//     var track = function(x, y, top, ampl) {
//         return {
//             top : top + 2,
//             x   : x + ampl * Math.sin(top / sinDivide),
//             y   : (top / this.screenHeight < 0.65) ? y + 2 : 1 + y + ampl * Math.cos(top / cosDivide)
//         };
//     }
    
//     var top = 90;
//     setInterval(function() {
//         var current = track(50, 50, top, 33);
//         $('.output', container).text(JSON.stringify(current));
//         $('.x', container).css({left: current.x + 'px', top: current.y + 'px'});
//         top = current.top;
//     }, 30);
// }
