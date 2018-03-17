'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const storage = require(.lib/storage.js)
const api = require('./api/car-api.js')
const Router = require('./lib/routerCar.js');

const router = new Router();
router.get('/api/cars', api.getCars);
router.post('/api/cars', api.createCar);
router.remove('/api/cars', api.removeCar);
router.put('/api/cars', api.updateCar);


const server = http.createServer((req, res) => {
    //console.log('something');
   return router.tryRoute(req, res);
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    //console.log('http://localhost:', PORT);
})