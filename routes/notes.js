const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const api = require('express').Router();

//GET request to show saved notes
// GET /api/notes should read the db.json file and return all saved notes as JSON.
// use fs read file
api.get('/notes', (req, res)=>{
    fs.readFile('../db/db.json',(err,data)=>{
        if (err) {
            console.error(err);
        } else { 
            util.promisify(fs.readFile('../db/db.json'))
            .then(data => JSON.parse(data))
            .then((data) => res.json(data))
        }
    })
});

// POST /api/notes should receive a new note to save on the request body, 
//add it to the db.json file, and then return the new note to the client. 

//Use an npm package for giving notes unique IDs 
// Using https://www.npmjs.com/package/uuid (required above)

api.post('/', (req, res) => {
    const { title, text } = req.body;
    const note  = {
        title,
        text,
        id: uuid(),
    };

    util.promisify(fs.readFile("./db/db.json"))
    .then(data => JSON.parse(data))
    .then((data) => {
        data.push(note)
        util.promisify(fs.writeFile(data),JSON.stringify(data)) 
        });
    }
)
