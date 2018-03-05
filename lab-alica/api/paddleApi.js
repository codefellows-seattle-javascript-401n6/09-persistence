'use strict';

const http = require('http');
const querystring = require('querystring');
const url = require('url');
const storage = require('./storage.js')
const parseJSON = require('../lib/parse-json');
const parseUrl = require('./parse-url.js');

storage.seed();

function getKayakPaddles(req, res) {
    let kayakPaddles = storage.readAll();
    let response = kayakPaddles;
    if ('id' in req.url.query) {
        let id = req.url.query.id;
        if (kayakPaddles[id] === undefined) {
            throw "404 paddle id not found: " + id;
        }
        response = kayakPaddles[id];
    }
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    res.write(JSON.stringify(response));
    res.end();
}

function createKayakPaddles(req, res) {
    let name = req.url.query.name;
    let bladeSurfaceArea = req.url.query.bladeSurfaceArea;
    let length = req.url.query.length;

    let kayakPaddles = storage.createKayakPaddles(name, bladeSurfaceArea, length);
    return kayakPaddles;
}

// function updateKayakPaddles {

// }

// function deleteKayakPaddles {

// }

module.exports = {getKayakPaddles, createKayakPaddles}; 
    // updateKayakPaddles, deleteKayakPaddles};