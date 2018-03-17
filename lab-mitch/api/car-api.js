'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const bodyParser = require('../lib/parse-body.js');
const storage = require('../lib/storage.js');
const parseJSON = require('../lib/parse-json.js')
const Car = require('../models/car.js')
storage.seed();

function getCars(req, res) {
    //console.log('Inside get cars');
    //console.log('Request', req);
    //console.log('Response', res);
    req.url = url.parse(req.url);
    //console.log('Req.URL', req.url);
    req.url.query = queryString.parse(req.url.query);
    //console.log('req.url.query', req.url.query);

    if (req.url.pathname === '/api/cars') {
        req.on('error', err => {
            console.error('console error', err);
        });
        if (req.url.query.id === '') {
            let message = `Please provide a valid id`;
            res.writeHead(400, {
                'Content-type': 'text/plain'
            })
            res.write(message);
            res.end();
        }
        if (req.url.query.id) {
            let id = req.url.query.id;
            let car = storage.get(id);
            if (car === 'undefined') {
                let message = `Car at ${id}: Not Found. Please search again.`
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write(message);
                res.end();
            } else {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify(car));
                res.end();
            }
        } else {
            //console.log('Inside Else')
            let cars = storage.getAll();
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            //console.log('CARS', cars);
            res.write(JSON.stringify(cars));
            res.end();
        }
    } else {
        let message = `Error. Invalid request. \nTry localhost:${port}/api/cars with a proper text query.`;
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })
        res.write(message);
        res.end();
    }
}

function createCar(req, res) {
        //console.log('car-api - creatCar req', req);
    bodyParser(req).then(
        (body) => {
            try {
                body = JSON.parse(body);
                //console.log('car-api - creatCar - try - body', body.name);
                let car = new Car(body.name, body.make, body.model, body.year, body.color);
                //console.log('car-api - creatCar - try - car');
                let carID = car.id;
                //console.log('car-api - creatCar - try - carID', car.id);
                storage.save(car);
                let savedCar = storage.get(carID);
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                //console.log('Car.api - create car - savedCar', savedCar);
                res.write(JSON.stringify(savedCar));
                res.end();
            } catch (err) {
                let message = JSON.stringify({
                    error: err,
                });
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify(message));
                res.end();
            }
        }).catch((err) => console.error(err));
}

function updateCar(req, res) {
    req.url = url.parse(req.url);
    bodyParser(req).then(
        (body) => {
            try {
                body = JSON.parse(body);
                let name = body.name;
                let make = body.make;
                let model = body.model;
                let year = body.year;
                let color = body.color;
                if (body.id !== undefined); {
                    let id = body.id;
                    let car = storage.update(id, name, make, model, year, color);
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.write(`Car updated successfully at id ${car.id}`);
                    res.end();
                }
            } catch (err) {
                let message = JSON.stringify({
                    error: 'Invalid request: body required',
                });
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });
                res.write(message);
                res.end();
            }
        }
    );
}

function removeCar(req, res) {
     //console.log('car-api - removeCar');
    req.url = url.parse(req.url);
    
    req.url.query = queryString.parse(req.url.query);
    //console.log('reg.url.query', req.url.query);

    if (req.url.pathname === '/api/cars') {
        //console.log('Inside If');
        req.on('error', err => {
            console.error(err);
        });
        if (req.url.query.id) {
            //console.log('Inside second if');
            let id = req.url.query.id;
            storage.remove(id);
            //console.log("id", id);
           res.writeHead(200, {'Content-Type': 'text/plain'});
           res.write(`${id} Successfully deleted.`);
           res.end();
           //console.log('After res.write-end');
        }
    } else {
        let cars = storage.getAll();
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(cars));
        res.end();
    }
}

module.exports = { getCars, createCar, removeCar, updateCar };