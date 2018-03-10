'use strict';

const parseUrl = require('./parse-url.js');
const parseJSON = require('./parse-json.js');

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

  put(path, cb) {
    this.routes.PUT[path] = cb;
  }

  post(path, cb) {
    this.routes.POST[path] = cb;
  }

  del(path, cb) {
    this.routes.DELETE[path] = cb;
  }

  route = () => {
    return (req, res) => {
      Promise.all([
          parseUrl(req),
          parseJSON(req)
        ])
        .then(() => {
          if (typeof this.routes[req.method][req.url.pathname] === 'function') {
            this.routes[req.method][req.url.pathname](req, res);
            return;
          }

          console.error('route not found');

          res.writeHead(404, {
            'Content-Type': 'text/plain'
          });

          res.write('route not found');
          res.end();
        })
        .catch(err => {
          console.error(err);

          res.writeHead(400, {
            'Content-Type': 'text/plain'
          });

          res.write('bad request');
          res.end();
        });
    };
  };
    //   sendError(req, res, error) {
    //     if (error.status && error.message) {
    //       res.writeHead(error.status);
    //       res.write(error.message);
    //     } else {
    //       res.writeHead(500);
    //       res.write("Internal Server Error: " + error);
    //     }
    //     res.end();
    //   }

    //   route(req, res) {
    //     parseJSON(req)
    //       .then(() => {
    //         let method = req.method;
    //         let path = req.url.pathname;
    //         const route = this.routes[method][path];
    //         if (!route) {
    //           throw {
    //             status: 404,
    //             message: `URL not found: ${method} ${path}`
    //           };
    //         }
    //         route(req, res);
    //       })
    //       .catch(error => {
    //         sendError(req, res, error);
    //       });
    //   }
  };

  module.exports = {
    get,
    put,
    post,
    del,
    route
  };