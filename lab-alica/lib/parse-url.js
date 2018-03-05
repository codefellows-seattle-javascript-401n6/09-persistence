'use strict';

const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req) {
  console.log(typeof(req.url));
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);
  return Promise.resolve(req);
};