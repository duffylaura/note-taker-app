const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const api = require('express').Router();

//GET request to show saved notes
// GET /api/notes should read the db.json file and return all saved notes as JSON.
// use fs read file
api.get("/notes", (req, res) => {

    fs.readFile('../db/db.json', "utf8", function(err, data){
        if(err) throw err;
        var resultArray = JSON.parse(data);//do operation on data that generates say resultArray;
        res.send(resultArray);
    });
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

    fs.readFile('../db/db.json', "utf8", function(err, data){
        if(err) throw err;
    
        var resultArray = JSON.parse(data);//do operation on data that generates say resultArray;

        resultArray = resultArray.push(newNote); 

        fs.writeFile('../db/db.json', resultArray, 
            (err) => {if (err) console.log('POST error: '+err)
                        else {console.log("File written successfully")}}
        ) 
    });
});

module.exports = api; 