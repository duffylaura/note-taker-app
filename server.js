//requirements
const express = require('express');
const path = require('path');
const apiRoute = require('./routes');

//define app
const app = express();

//define port
const PORT = process.env.PORT || 3001

//.use expressions
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/api', apiRoute);

//.get expressions
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) =>res.sendFile(path.join(__dirname, '/public/notes.html')));

//Click on link when server starts  
app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
