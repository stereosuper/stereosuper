var $ = require('./libs/jquery/dist/jquery.min.js');

// position en y d'un item sans son translate
module.exports = function(myObj){
	var pos = myObj.offset().top;
	if (myObj.css('transform').indexOf('(') > 0) {
	    pos += -parseInt(myObj.css('transform').split(/[()]/)[1].split(',')[5]);
	}
	return Math.round(pos);
}