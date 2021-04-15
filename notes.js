const { default: chalk } = require('chalk');
const fs = require('fs');

const addNote = function(title, body) {
    const notes = loadNotes();
    const duplicate  = notes.filter(function(note) { 
        return note.title === title;
    })
    //console.log(notes);
    if(duplicate.length === 0 ){
        notes.push({
            title: title,
            body:body
        })
        saveNotes(notes);
        console.log(chalk.bgGreen('New note added ..'));
    }
    else{
        console.log(chalk.bgRed('Note title taken ..'));    
    }
    
}

const loadNotes = function() {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e){
        return [];
    }
}

const saveNotes = function(data) {
    const dataJson = JSON.stringify(data);
    fs.writeFileSync('notes.json', dataJson);
}

const removeNote = function(title) {
    const notes = loadNotes();
    const notesToKeep = notes.filter(function(note){
        return note.title !== title;
    })
    // console.log(notes.length + '\n');
    // console.log(notesToKeep.length)
    if(notes.length>notesToKeep.length){
        saveNotes(notesToKeep);
        console.log(chalk.bgGreen('Note removed!'))
    } else {
        console.log(chalk.bgRed('No note found!'))
    }
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
}