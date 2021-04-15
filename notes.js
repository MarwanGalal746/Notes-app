const { default: chalk } = require('chalk');
const fs = require('fs');

const addNote = function(title, body) {
    const notes = loadNotes();
    const duplicate  = notes.filter( (note) => note.title === title)
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

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e){
        return [];
    }
}

const saveNotes = (data) => {
    const dataJson = JSON.stringify(data);
    fs.writeFileSync('notes.json', dataJson);
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title)
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