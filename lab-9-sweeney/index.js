'use strict';

//this is necessary because
const http = require('http');
const url = require('url');
const queryString = require('querystring');

const Router = require('./lig/router.js');
const api = require('./api/project.js');

const router = new Router();
//methods of router
router.get('/api/projects', api.getProjects);
router.post('/api/projects', api.createProject);
router.remove('/api/projects', api.removeProject);
router.put('/api/projects', api.updateProject);

const server = http.createServer((req,res)=>{
  return router.tryRoute(req,res);
});

let PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
  console.log('Listening at PORT', PORT);
});