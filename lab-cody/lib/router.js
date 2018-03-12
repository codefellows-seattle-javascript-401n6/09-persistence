'use strict';
const url = require('url');
const queryString = require('querystring');

const parseUrl = require('./urlParser');

class Router {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
      PUT: {},
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
    parseUrl(req).then(url => {
      let thisRoute = this.routes[method][url.pathname];
      if(!thisRoute) {
        let warning = 'no no no try localhost:3000//api/doge';
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write(warning);
        res.end;
      }
      thisRoute(req, res);
    }).catch(err => console.error(err));
    }
  

  tryRoute(req, res) {
    try {
      return this.route(req, res);
    } catch (error) {
      console.log('ERROR:', error)
      
      let code = 500;
      if (error && error.substr) {
        let status = error.substr(0,3)
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

module.exports = Router;