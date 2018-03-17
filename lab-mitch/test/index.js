'use strict';

const http = require('http');
const router = require('./lib/routerCar.js');
const carAPI = require('./api/car-api.js');

router.get('/api/cars', carAPI.getCars);
router.post('/api/cars');
router.put('/api/cars');
router.del('/api/cars');

const server = http.createServer((req, res) => {

})

let PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
})