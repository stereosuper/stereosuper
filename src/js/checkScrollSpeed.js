var $ = require('./libs/jquery/dist/jquery.slim.min.js');

module.exports = function(){
	var delta, lastPos, timer = 0, newPos, downscroll;

	function clear(){
		lastPos = undefined;
		delta = 0;
	}
	// newPos = window.scrollY;
	newPos = $(document).scrollTop();

	if(lastPos != undefined){
		delta = newPos - lastPos;

		if(delta > 0){
			downscroll = true;
		}else if(delta < 0){
			downscroll = false;
		}

		// min/max values
		if(delta > 100){
			delta = 100;
		}else if(delta < -100){
			delta = -100;
		}

	}else{
		delta = 0;
	}
	timer && clearTimeout(timer);
	lastPos = newPos;
	// clearTimeout(timer);
	timer = setTimeout(clear, 30);

	return [delta, downscroll];
}
