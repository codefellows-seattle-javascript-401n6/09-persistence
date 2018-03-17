'use strict';

const parseURL = require('url').parse;
const parseQuer = require('querystring').parse;

module.exports = function(req) {
    Req.url = parseUrl(req.url);
    Req.url.query = parseQuery(req.url.query);

return new Promis((resolve, reject) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        let body = '';
        req.on('data', (data) => {
            body += data.toString();
        });

        req.on('end', () => {
            req.body = body;
            try {
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