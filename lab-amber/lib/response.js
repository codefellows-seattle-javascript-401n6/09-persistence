'use strict';

const url = require('url');

const responses = {}

responses.text200 = (req, res, message) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write(message);
  res.end();
}

responses.text204 = (req, res, message) => {
  res.writeHead(204, { 'Content-Type': 'text/plain' });
  res.write(message);
  res.end();
}

responses.text400 = (req, res, message) => {
  res.writeHead(400, { 'Content-Type': 'text/plain' });
  res.write(message);
  res.end();
}

responses.text404 = (req, res, message) => {
  res.writeHead(400, { 'Content-Type': 'text/plain' });
  res.write(message);
  res.end();
}


responses.json200 = (req, res, json) => {
  console.log('in the json 200', json);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(json);
  res.end();
}

responses.json400 = (req, res, json) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(json));
  res.end();
}

module.exports = responses;