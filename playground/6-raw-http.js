const https = require('https');

const url = 'https://api.darksky.net/forecast/b1a99414d5bdd653f37d2a67bb261ca1/40,-75';

const request = https.request(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data = data + chunk.toString();
    });
    response.on('end', () => {
        const response = JSON.parse(data);
        console.log(response);
    });
});

request.on('error', (error) => {
    console.log('An error', error);
});

request.end();
