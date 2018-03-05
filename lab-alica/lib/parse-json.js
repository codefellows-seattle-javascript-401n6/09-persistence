'use strict';

const url = require('url');
const querystring = require('querystring');

module.exports = function(req) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  return new Promise((resolve, reject) => {
      if (req.method === 'POST' || req.method === 'PUT') {
        let body = '';
  
        req.body.on('data', (data) => {
          body += data.toString();
        });
  
        req.body.on('end', () => {
          req.body = body;
          try {
            req.body = JSON.parse(body);
            resolve(req);
          } catch (err) {
            console.error(err);
            reject(err);
          };
        });
  
        req.body.on('error', (err) => {
          console.error(err);
          reject(err);
        });
        return;
      }
      resolve();
    });
  };