const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if(!address){
    console.log("Please provide an address!");
}else{
    geocode.fetch(address, (error, data) => {
        if(error){ return console.log('Error', error); }
        forecast.fetch(data, (error, data) => {
            if(error){ return console.log('Error', error); }    
            console.log(data);
        });
    });
}

