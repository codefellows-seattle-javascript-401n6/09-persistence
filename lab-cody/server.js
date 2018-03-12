'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const Router = require('./lib/router.js');
const api = require('./api/dogeAPI.js');


// const simpleAPI = require('./api/simpleAPI.js');


 let router = new Router();
router.get('/api/doge', api.getDogs);
router.post('/api/doge', api.adoptDogs);
router.put('/api/doge', api.groomDogs);
router.remove('/api/doge', api.giveUpDogs);



const server = http.createServer((req, res) => {
  return router.tryRoute(req, res);
});

const PORT = 3000 || process.env;
server.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
})