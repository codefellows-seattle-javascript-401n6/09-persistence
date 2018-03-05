'use strict';

const http = require('http');

const server = http.createServer((req, res) => {

})

let PORT = process.env.PORT || 3000;
server.listen (PORT, () => {
    console.log('http://localhost:' + PORT);
})