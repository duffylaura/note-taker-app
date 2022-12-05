//requirements
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');

//define port
const PORT = process.env.PORT || 3001

//define app
const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET expressions to link html pages 
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) =>res.sendFile(path.join(__dirname, '/public/notes.html')));

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>res.sendFile(path.join(__dirname, 'public/pages/404.html')));

//Click on link when server starts  
app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
