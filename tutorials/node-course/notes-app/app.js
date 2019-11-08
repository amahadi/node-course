const notes = require('./notes');
const chalk = require('chalk');

// console.log(utils.sum(3, 5));

console.log(notes.getNotes());

console.log(chalk.red.inverse.bold('This is an error!!'));
console.log(chalk.yellow.inverse.bold('This is a warning!!'));
console.log(chalk.green.inverse.bold('Everything\'s ok!!'));
