define(function(require,exports,module) {
    var isArrary=require('seaIsArry');
    var flag= isArrary.isArray([])
    console.log(flag)
    var math=function(x,y){
        return x+y
    }
    console.log(444)
    exports.add=math;
});