const express = require('express');
const server = express();

server.get('/ping', (req,res) => {
    return res.send('pong');
});

server.listen(process.env.PORT || 3001);