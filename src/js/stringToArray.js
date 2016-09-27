module.exports = function(string){
    var array = string.split(',').map(function(n){ return n; });
    return array;
}
