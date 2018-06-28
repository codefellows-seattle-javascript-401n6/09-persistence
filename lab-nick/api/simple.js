'use strict';

function text(req, res) {
    res.writeHead(200, {
        'content-Type': 'text/plain'
    });
    res.write('hello world');
    res.end();
}

function json(req, res) {
    res.writeHead(200, {
        'content-Type': 'application/json'
    });
    res.write(JSON.stringify({data: [1,2,3]}));
    res.end();
}

module.exports = { text, json };