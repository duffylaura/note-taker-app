const express = require('express');
const api = require('express').Router();
const fs = require('fs');

//GET request to show saved notes
// GET /api/notes should read the db.json file and return all saved notes as JSON.
// use fs read file
api.get('/notes', (req, res)=>{
    fs.readFile('../db/db.json',(err,data)=>{
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data));  
        }
    })
})