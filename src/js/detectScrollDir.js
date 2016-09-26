module.exports = function(myScroll, lastScroll, scrollDir){
    if(myScroll > lastScroll){
        scrollDir = -1;
    }else if(myScroll < lastScroll){
        scrollDir = 1;
    }else{
        scrollDir = 0;
    }

    return scrollDir;
}
