const express = require('express');
const server = express();
const index = require('./routes/index');
// const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require("./db/queries.js");

server.use(express.static(path.join(__dirname, 'build')));
// server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));


server.listen(process.env.PORT || 3001);


server.use('/', index)


server.get('/ping', (req,res) => {
    return res.send('pong');
});




module.exports = server;