const express = require('express');

//Import modular router 

const notesRouter = require('./notes');

const app = express();

app.use('/tips', notesRouter);

module.exports = app;