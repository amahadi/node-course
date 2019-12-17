const request = require('request');

const fetch = ({latitude, longitude, location}, callback) => {
    const url = `https://api.darksky.net/forecast/b1a99414d5bdd653f37d2a67bb261ca1/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;
    debugger;
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services!', undefined);
        }
        else if(body.error)
        {
            callback('Unable to find location!', undefined);
        }else{
            callback(undefined, {
                summary: body.daily.data[0].summary,
                location
            }); 
        }  
    });
};

module.exports = {
    fetch: fetch
}