'use strict';

const urlParser = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req) {
  const urlObj = urlParser(req.url);
  // req.url.query = parseQuery(req.url.query);

  return urlObj;
};