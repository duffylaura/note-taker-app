const fs = require('fs');
const util = require('util');

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
})