const api = require('express').Router();

const notes = require("./notes");
api.use('/notes', notes);

module.exports = api;