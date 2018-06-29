'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');

function urlParser(req) {
  return new Promise((resolve, reject) => {
    let parsedURL = {};
    parsedURL.pathname = url.parse(req.url).pathname;
    parsedURL.queries = queryString.parse(req.url.query);
    resolve(parsedURL);
  });
}

module.exports = urlParser;