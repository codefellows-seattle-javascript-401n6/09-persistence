'use strict';

const http = require('http');
const url = require('url');


function manualBodyParser(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (buf) => {
            body += buf.toString();
        });

        req.on('end', () => {
            resolve(body);
        });

        req.on('error', (error) => {
            reject (error);
        });
    })
}

module.exports = manualBodyParser;