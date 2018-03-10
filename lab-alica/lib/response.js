'use strict';

const url = require('url');

const responses = {};

responses.sendText200 = (req, res, msg) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write(msg);
  res.end();
}

responses.sendText204 = (req, res, msg) => {
  res.writeHead(204, { 'Content-Type': 'text/plain' });
  res.write(msg);
  res.end();
}

responses.sendText400 = (req, res, msg) => {
  res.writeHead(400, { 'Content-Type': 'text/plain' });
  res.write(msg);
  res.end();
}

responses.sendText404 = (req, res, msg) => {
  res.writeHead(400, { 'Content-Type': 'text/plain' });
  res.write(msg);
  res.end();
}

responses.sendJSON200 = (req, res, data) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(data);
  res.end();
}

responses.sendJSON400 = (req, res, data) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(data));
  res.end();
};

module.exports = responses;