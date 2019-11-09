const fs = require('fs');

let dataJson = JSON.parse(fs.readFileSync('1-json.json').toString());
dataJson.name = 'Alvi Mahadi';
dataJson.age = 26;
fs.writeFileSync('1-json.json', JSON.stringify(dataJson));