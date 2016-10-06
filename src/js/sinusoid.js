var $ = require('./libs/jquery/dist/jquery.min.js');

module.exports = function(sinDivide, x, top, ampl) {
	var xReturn = x + ampl * Math.sin(top / sinDivide);
    return xReturn;
}
