const fs = require('fs');
const util = require('util');
const { v4: uuid} = require('uuid');
const api = require('express').Router();
const database = require('../db/db.json');

//GET request to show saved notes
// GET /api/notes should read the db.json file and return all saved notes as JSON.
// use fs read file
api.get('/notes', (req, res)=>{
    // fs.readFile( filename, encoding, callback_function )
    fs.readFile('../db/db.json', 'utf8', (err,data)=>{
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
    if (title && text) {
        const newNote  = {
            title,
            text,
            id: uuid(),
        };
        //fs.readFile( filename, encoding, callback_function )
        fs.readFile('../db/db.json', 'utf8',(err,data)=>{
            if (err) {console.error(err)}
            else {
                const newDatabase = JSON.parse(data);
                newDatabase.push(newNote);
                database = newDatabase;
                // fs.writeFile( file, data, options, callback )
                fs.writeFile('../db/db.json', JSON.stringify(newDatabase), 'utf8', (err) => {
                    if (err) {console.err(err)}
                    else {console.info('Successful writeFile operation!')}
                })
            }
        });

        const response = {status: 'success', body: newNote };
        
        res.json(response);
    }

    else {
        res.json('Error! Cannot make post request.')
    }
});


module.exports = api; 