'use strict';

const url = require('url');
const queryString = require('querystring');
const urlParser = require('./urlParser.js')


class Router {
    constructor() {
        this.routes = {
            GET: {},
            PUT: {},
            POST: {},
            DELETE: {}
        }
    }

    get(path, cb) {
        this.routes.GET[path] = cb;
    }

    post(path, cb) {
        this.routes.POST[path] = cb;
    }

    put(path, cb) {
        this.routes.PUT[path] = cb;
    }

    remove(path, cb) {
        this.routes.DELETE[path] = cb;
    }

    route(req, res) {
        const method = req.method;
        //console.log('upper method prove it', method);
        urlParser(req).then(url => {
            //console.log('method', method)
            //console.log('url.pathname', url.pathname);
            //console.log('this.routes', this.routes);
            let currentRoute = this.routes[method][url.pathname];
            //console.log('this.routes-method',this.routes[method]);
            //console.log('Current Route' , currentRoute);
            if (!currentRoute) {
                let message = 'Error: Invalid request\n Try localhost:3000/api/cars';
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write(message);
                res.end();
            }
            //console.log('calling current route');
            currentRoute(req, res);
        }).catch(err => console.error(err));
    }

    tryRoute(req, res) {
        //console.log('Im in tryRoute')
        
        try {
            //console.log('in try');
            return this.route(req, res);
        } catch (error) {
            //console.log('ERROR: ', error)
            let code = 500;
            if (error && error.substr) {
                let status = error.substr(0, 3);
                code = parseInt(status, 10);
                if (isNaN(code) || code < 300 || code >= 499) {
                    code = 500;
                }
            }
            res.writeHead(code);
            res.write(error)
            res.end();
            return;
        }
    }
}



module.exports = Router;