/*
* Modules and require()
* */

let count = function(arr){
    return arr.length;
};


module.exports = {
    printCounter: function(arr){
        return 'this array has ' + count(arr) + ' elements';
    }
};
