'use strict';

const http = require('http');
// const url = require('url');
// const querystring = require('querystring');

const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3001;

const simpleAPI = require('./api/simple.js');
const computersAPI = require('./api/computers.js');

const router = new Router();
router.get('/text', simpleAPI.text);
router.get('/json', simpleAPI.json);

router.get('/api/computers', computersAPI.getServers);
router.post('/api/computers', computersAPI.createServer);
router.put('/api/computers', computersAPI.updateServer);
router.del('/api/computers', computersAPI.deleteServer);

const server = http.createServer((req, res) => {
    return router.tryRoute(req, res); //Passes all req and res through ./li/router.js

    // //Basic server response test
    // res.writeHead(200, {
    //     'content-Type' : 'text/plain'
    // });
    // res.write('hello world');
    // res.end();
});

server.listen(PORT, () => {
    storage.prePopulate();
    console.log(`localhost:`, PORT);
});