'use strict';

const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req) {
  return new Promise((resolve, reject) => {
      if (req.method === 'POST' || req.method === 'PUT') {
        let body = '';
  
        req.on('data', (data) => {
          body += data.toString();
        });
  
        req.on('end', () => {
          req.body = body;
          try {
            console.log("JSON END", body)
            req.body = JSON.parse(body);
            resolve(req);
          } catch (err) {
            console.error(err);
            reject(err);
          };
        });
  
        req.on('error', (err) => {
          console.error(err);
          reject(err);
        });
        return;
      }
      resolve();
    });
  };