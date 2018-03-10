'use strict';

module.exports = exports = {};

exports.sendText200 = (res, status, msg) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write(msg);
  res.end();
}

exports.sendText204 = (res, status, msg) => {
  res.writeHead(204, { 'Content-Type': 'text/plain' });
  res.write(msg);
  res.end();
}

exports.sendText400 = (res, status, msg) => {
  res.writeHead(400, { 'Content-Type': 'text/plain' });
  res.write(msg);
  res.end();
}

exports.sendText404 = (res, status, msg) => {
  res.writeHead(400, { 'Content-Type': 'text/plain' });
  res.write(msg);
  res.end();
}

exports.sendJSON200 = (res, status, data) => {
  console.log('in the json 200', json);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(data);
  res.end();
}

exports.sendJSON400 = (res, status, data) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(data));
  res.end();
};