'use strict';

const http = require('http');
const url = require('url');
const querystring = require('qeurystring');

const server = http.createServer((req, res) =>{

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    cosole.log('listening on port:' + PORT);
})