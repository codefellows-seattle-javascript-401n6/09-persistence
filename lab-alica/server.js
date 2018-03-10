'use strict';

const http = require('http');
const Paddle = require('./model/paddle.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const parseUrl = require('./lib/parse-url.js');
const parseJSON = require('./lib/parse-json.js');

const PORT = process.env.PORT || 3000;

const router = new Router();

storage.seed();

router.get('/api/paddle', function(req, res) {
    console.log(req.url);
    if (req.url.query.id) {
        console.log(req.url.query);
        storage.fetchItem('paddle', req.url.query.id)
        .then(paddle => {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            console.log('paddle', paddle);
            res.write(JSON.stringify(paddle));
            res.end();
        })
        .catch(err => {
            console.error(err);
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.write('not found');
            res.end();
        });
        return;
    };
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        });
        res.write('bad request');
        res.end();
});

router.post('/api/paddle', function(req, res) {
    try {
        var paddle = new Paddle(req.body.name, req.body.bladeSurfaceArea, req.body.length);
        storage.createItem('paddle', paddle);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(paddle));
        res.end();
    } catch (err) {
        console.error(err);
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        });
        res.write('bad request');
        res.end();
    };
});

const server = http.createServer((req, res) => {
    return router.route(req, res);
});

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});