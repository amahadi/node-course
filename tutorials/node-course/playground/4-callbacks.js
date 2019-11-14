const doWrokCallback = (callback) => {
    setTimeout(() => {
        // callback('This is my error!', undefined);
        callback(undefined, [1, 2, 7]);
    }, 2000);
}

doWrokCallback((error, result) => {
    if(error){ return console.log(error); }
    console.log(result);
});