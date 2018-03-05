'use strict';

const querystring = require('querystring');
const parseUrl = require('./parse-url.js');
const parseJSON = require('./parse-json.js');

class Router {
     constructor() {
        this.routes = {
            GET: {}, 
            POST: {},
            PUT: {},
            DELETE: {}
        }
    }

    get(endpoint, cb) {
        this.routes.GET[endpoint] = cb;
    } 

    post(endpoint, cb) {
        this.routes.POST[endpoint] = cb;
    }

    put(endpoint, cb) {
        this.routes.PUT[endpoint] = cb;
    }

    delete(endpoint, cb) {
        this.routes.DELETE[endpoint] = cb;
    }

    route(req, res) {
        const method = req.method;
        req.url = parseUrl(req);
        // req.url.query = parseJSON(req.url.query);
        // console.log(req.url.query);

        let pathname =req.url.pathname;
        parseUrl(req).then(url => {
            let currentRoute = this.routes[method][pathname];
            if (!currentRoute) {
                throw `404 Not Found: ${method} ${url.pathname}`
            }
            currentRoute(req, res);
        }).catch(err => console.error(err));
    }

    tryRoute(req, res) {
        try {
            return this.route(req, res);
        } catch (error) {
            console.log('ERROR:', error);
            let code = 500; 
            if (error && error.substr) {
                code = parseInt(status, 10);
                if (isNaN(code) || code < 300 || code >= 499) {
                    code = 500;
                }
            }
            res.writeHead(code);
            res.write(error);
            res.end();
            return;
            }
        }
    }
// trying to incorporate Promises...
//     return (req, res) => {
//         Promise.all([
//           parseUrl(req),
//           parseJSON(req)
//         ])
//         .then( () => {
//           if (typeof this.routes[req.method][req.url.pathname] === 'function') {
//             this.routes[req.method][req.url.pathname](req, res);
//             return;
//           }
    
//           console.error('route not found');
    
//           res.writeHead(404, {
//             'Content-Type': 'text/plain'
//           });
    
//           res.write('route not found');
//           res.end();
//         })
//         .catch( err => {
//           console.error(err);
    
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           });
    
//           res.write('bad request');
//           res.end();
//         });
//       };
//     };
// };

module.exports = Router;

// did you have a route at this path for this function?
// looks up what function was hooked up to that url and sends that response

// router tries to look up a route with that req and res

// try and execute this route if anything goes wrong execute this (send back a response with status code and error)
// look up route, if it doesn't exist use throw keyword -> program will crash = 404. catch it over here and send back a response that something went wrong