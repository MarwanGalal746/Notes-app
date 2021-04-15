const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const fs  = require('fs');
const notes = require('./notes')
const { demandOption, argv } = require('yargs');


//customize yargs version
yargs.version('1.1.0');


//create add command
yargs.command({
    command : 'add', 
    describe: 'add a new note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }, 
        body : {
            describe: 'Note body',
            demandOption:true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body);
    }
})


//create remove command
yargs.command({
    command : 'remove',
    describe: 'remove a note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(){
       notes.removeNote(argv.title);
    }
})


//create list command
yargs.command({
    command : 'list',
    describe: 'list all notes',
    handler(){
        notes.listNotes();
    }
})


//create read command
yargs.command({
    command : 'read',
    describe: 'read a notes',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(){
        notes.readNote(argv.title)
    }
})

yargs.parse()

