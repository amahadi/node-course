/*
* Modules and require()
* */

let count = function(arr){
    return arr.length;
};


module.exports = {
    sum: function(a, b){
      return a + b;
    },

    sub: function(a, b){
        return a - b;
    },

    mul: function(a, b){
        return a * b;
    },

    div: function(a, b){
        return a / b;
    }
};
