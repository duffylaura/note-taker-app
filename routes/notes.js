const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require("uuid");
const api = require('express').Router();
const database = require('../db/db.json');

//GET request to show saved notes
// GET /api/notes should read the db.json file and return all saved notes as JSON.
// use fs read file
api.get("/notes", (req, res) => {
    // util.promisify(fs.readFile("../db/db.json")
    //   .then((data) => JSON.parse(data))
    //   .then((json) => {
    //     res.json(json);
    //   }));
    const readFile = util.promisify(fs.readFile);
    async function doFile() {
        try {
            const data = await readFile('../db/db.json', 'utf8');
            console.log(data);
        } catch (err) {
            console.log('Error', err);
        }
    }
    doFile();
  });

// POST /api/notes should receive a new note to save on the request body, 
//add it to the db.json file, and then return the new note to the client. 
//Use an npm package for giving notes unique IDs (required above)

api.post('/notes', (req, res) => {
    const { title, text } = req.body;
    const newNote  = {title, text, id: uuidv4()};
    //read file of the data base, to check what is currently in there
    //Parse information (parse out of string into object)
    //THEN push 
    database.push(newNote);
    //
    util.promisify(fs.writeFile('../db/db.json', JSON.stringify(database,null,4)));
    const response = {status: 'success', body: JSON.stringify(database)};
    res.json(response);
});

module.exports = api; 