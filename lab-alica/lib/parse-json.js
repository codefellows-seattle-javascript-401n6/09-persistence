'use strict';

const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

function parseJSON (req) {
  let promise = new Promise((resolve, reject) => {
    req.url = parseUrl(req.url);
    req.url.query = parseQuery(req.url.query);

      if (req.method !== 'PUT' && req.method !== 'POST') {
        resolve();
        return;
      }

        let body = "";
        req.on('data', (data) => {
          body += data.toString();
        });
        req.on('end', () => {
          req.body = body;
          resolve();
        });
        req.on('error', (err) => {
          reject(err);
        });
      });
      return promise;
  };

  module.exports = parseJSON;