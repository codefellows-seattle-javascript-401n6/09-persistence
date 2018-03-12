'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');

function urlParser(req) {
    return new Promise((resolve, reject) => {
        let parsedUrl = {};
        parsedUrl.pathname = url.parse(req.url).pathname;
        parsedUrl.queries = queryString.parse(req.url.query);
        resolve(parsedUrl);
    });
}

module.exports = urlParser;