const routings = require('express').Router();

routings.get('/', (req, res) => res.sendFile(__dirname + '/index.html') );
routings.get('/edit', (req, res) => res.sendFile(__dirname + '/edit.html') );

module.exports = routings;