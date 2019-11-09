const fs = require('fs');
const chalk = require('chalk')

const getNotes = () => {
    console.log(chalk.blue.inverse.bold('Your Notes:'));
    loadNotes().forEach(note => console.log(chalk.yellow(note.title)));
}

const listNotes = () => {
    console.log(chalk.blue.inverse.bold('Your Notes:'));
    loadNotes().forEach(note => console.log(chalk.yellow(note.title)));
}

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNotes = notes.filter((note) => note.title === title);

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log(chalk.green.inverse.bold('New note added!'));
    }
    else{
        console.log(chalk.red.inverse.bold('Note title taken!!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();

    const note = notes.filter((note) => note.title === title);

    if(note.length === 0){
        console.log(chalk.red.inverse.bold(`No note found titled as '${title}'`));
    }
    else{
        notes.pop(note[0]);
        saveNotes(notes);
        console.log(chalk.green.inverse.bold(`Note titled as '${title}' removed successfully`));
    }
}

const loadNotes = () => {
    try{
        return JSON.parse(fs.readFileSync('notes.json').toString());
    }catch(e){
        return [];
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json',JSON.stringify(notes));
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
};