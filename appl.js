 const fs = require('fs');
 const _ = require('lodash');
 const yargs = require('yargs');

 const notes  = require('./notes.js');

 const titleTags ={
 		describe :'title of note',
 		demand : true,
 		alias :'t'
 	};

 const bodyTags ={
 		describe: 'Body of note',
 		demand: true,
 		alias : 'b'
 	};

 const argv  = yargs
 .command('add','Add a new note',{
 	title:titleTags,
 	body :bodyTags
 }
 	)
 .command('list','list all notes')
 .command('read','read a note',{
 	title :titleTags
 })
 .command('remove','Removes a note',{
 	title :titleTags
 })
 .help()
 .argv;
 var command = process.argv[2];
 
 console.log('The command is :',command);
 //console.log('process',process.argv);
 //console.log('yargs',argv);

 if(command === 'add'){
 	 var note = notes.addNote(argv.title,argv.body);
 	 if(note){
 	 	console.log('note created');
 	 	notes.logNote(note);
 	 }
 	 else{
 	 	console.log('note title already used');
 	 }
 }
 else if (command === 'list'){
 	var allnotes = notes.Getall();
 	console.log(`printing ${allnotes.length} note(s).`);
 	allnotes.forEach((note)=> {
 		notes.logNote(note);
 	})

 }

 else if(command === 'remove'){
     
 	var noteremoved=notes.removeNote(argv.title);
 	var mes =  noteremoved ? 'note successfully removed' : 'note does not exist';
 	console.log(mes);

 }

 else if (command === 'read'){
 	var note = notes.Getnote(argv.title);
 	if(note){
      console.log('note found');
      notes.logNote(note);
 	} 
 	else{
 		console.log('note not found');
 	}
 }
 else {
 	console.log ('command not found');
 }