'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const storage = require('../lib/storage.js');
const parseJSON = require('../lib/parse-json.js');
const Paddle = require('../model/paddle.js');
const responses = require('../lib/response.js');

storage.seed();

// GET -> get all the paddles
function getAllPaddles(req, res) {
    storage.readAll().then(files => {
        responses.sendJSON200(req, res, (JSON.stringify(files)));
    })
    if ('id' in req.url.query) {
        let id = req.url.query.id;
        if (id.length === 0) {
            let msg = ('Bad request. Please provide a valid id');
            responses.sendText400(req, res, msg);
        } else {
            responses.sendJSON200(req, res, JSON.stringify(id));
        }
    }
};

// GET 
function getPaddles(req, res) {
    if (req.url.pathname === '/api/paddle') {
        req.on('error', err => {
            console.error(err);
        });
    }
    if (req.url.query.id === '') {
        let msg = (`Please provide a vaild ${id}`);
        response.sendText400(req, res, msg);
    }
    if (req.url.query.id) {
        let id = req.url.query.id;
        let storeObj = storage.read(id);
        if (storeObj === undefined) {
            let msg = (`Paddle at ${id} not found`);
            response.sendText404(req, res, msg);
        } else {
            responses.sendJSON200(req, res, (JSON.stringify(storeObj)));
        }
    } else {
        let paddles = storage.readAll();
        responses.sendJSON200(req, res, (JSON.stringify(paddles)));
    }
};

// POST
function createPaddles(req, res) {
    parseJSON(req, res)
        .then(req => {
            if (!req.name || !req.bladeSurfaceArea || !req.length) {
                let msg = ('bad request');
                responses.sendText404(req, res, msg);
            }
            let name = req.body.name;
            let bladeSurfaceArea = req.body.bladeSurfaceArea;
            let length = req.body.length;

            let paddle = storage.create(name, bladeSurfaceArea, length);
            responses.sendJSON200(req, res, (JSON.stringify(paddle)));
        })
        .catch(err => {
            let msg = (`Error on post request ${err}`);
            responses.sendJSON400(req, res, msg);
            return;
        })
};

// PUT
function updatePaddles(req, res) {
    console.log("update paddles")
    parseJSON(req)
        .then(req => {
            let name = req.body.name;
            let bladeSurfaceArea = req.body.bladeSurfaceArea;
            let length = req.body.length;

            if (req.body.id !== undefined) {
                let id = req.url.query.id;
                let paddle = storage.update(id, name, bladeSurfaceArea, length);
                paddle => {
                    responses.sendJSON200(req, res, `paddle update successful at id: ${paddle.id}`);
                }
            }
        })
        .catch(err => {
            let msg = (`invalid request: requires a body ${err}`);
            responses.sendJSON400(req, res, msg);
            return;
        })
};

// DELETE
function removePaddles(req, res) {

    if (req.url.query.id) {
        let paddle = storage.remove(req.url.query.id)
        let id = req.url.query.id;
        responses.sendJSON200(req, res, 'Paddle was successfuly removed!');
    } else {
        let msg = ('Error. Query was not provided.');
        responses.sendText204(req, res, msg);
        return;
    }
};

module.exports = {
    getAllPaddles,
    getPaddles,
    createPaddles,
    updatePaddles,
    removePaddles
};