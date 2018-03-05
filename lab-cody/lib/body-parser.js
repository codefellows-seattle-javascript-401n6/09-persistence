'use strict';
const http = require('http');
const url = require('url');
const parseQuery = require('querystring');

function bodyParser() {
    let body = '';
    req.body.on("data", (data) => {
      body += data.toString();
    });
  
    req.body.on("end", () => {
      body += data.toString();
      req.body = body;
    });
  
    req.body.on("error", (error) => {
      throw error
    });
  }

  module.exports = bodyParser;