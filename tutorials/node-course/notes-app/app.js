const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

// add, remove, read, list

// create add command

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body', 
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body);
    }
});

//create remove command

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
});

// create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler(argv){
        console.log('Reading the note..');
    }
});

// create list command
yargs.command({
    command: 'list',
    describe: 'List the notes',
    handler(){
        notes.listNotes();
    }
})


yargs.parse()