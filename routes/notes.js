const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { 
    readFromFile,
    readAndAppend, 
    } = require('../helpers/fsUtils');


//GET request to show saved notes
// GET /api/notes should read the db.json file and return all saved notes as JSON.
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => 
    res.json(JSON.parse(data)));
  });

// POST /api/notes should receive a new note to save on the request body, 
//add it to the db.json file, and then return the new note to the client. 
//Use an npm package for giving notes unique IDs (required above)

notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    //read file of the data base, to check what is currently in there
    //Parse information (parse out of string into object)
    //THEN push 
    if (title && text) {
        const newNote = {
            title, text, note_id: uuidv4(), 
        };
        readAndAppend(newNote, './db/db.json');
        const response = {
            status: 'success', 
            body: newNote, 
        };
        res.json(response);
    } else {
        res.json('Error in adding note'); 
    }

});

module.exports = notes; 