'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const storage = require('../lib/storage.js');
const bodyParser = require('../lib/bodyparser.js');
const Project = require('../model/project.js');
const responses = require('../lib/response.js');



storage.seed();

function getProjects(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  if (req.url.pathname === '/api/projects') {
    req.on('error', err => {
      console.error(err);
    });
    if (req.url.query.id === '') {
      let message = `Please provide a valid id`;
      responses.text400(req, res, message);
    } else if (req.url.query.id) {
      let id = req.url.query.id;
      let project;
      storage.get(id).then(
        (json) => {
          project = json;
          if (project === undefined) {
            let message = `Project at ${id} Not Found`;
            responses.text404(req, res, message);
          } else {
            responses.json200(req, res, JSON.stringify(project));
          }
        }
      );
    } else {
      let projects = storage.getAll()
      .then(files => {
        responses.json200(req, res, JSON.stringify(files));
      });
    }
  } else {
    let message = 'error. invalid request\ntry localhost:3000/api/projects with a proper text query';
    responses.text400(req, res, message);
  }
}

function createProject(req, res) {
  bodyParser(req).then(
    (body) => {
      try {
        body = JSON.parse(body);
        let project = new Project(body.name, body.description, body.link);
        let projectID = project.id;
        storage.save(project);
        let savedProject = storage.get(projectID);
        responses.json200(req, res, JSON.stringify(savedProject));
      } catch (err) {
        let message = JSON.stringify({
          error: err,
        });
        responses.json400(req, res, JSON.stringify(message));
      }
    }).catch((err) => console.error(err));
}

function updateProject(req, res) {
  req.url = url.parse(req.url);
  bodyParser(req).then(
    (body) => {
      try {
        body = JSON.parse(body);
        let name = body.name;
        let description = body.description;
        let url = body.url;
        if (body.id !== undefined) {

          let id = body.id;
          let project = storage.update(id, name, description, url).then(
            project => {
              responses.text200(req, res, `project update successful at id ${project.id}`);
            }
          );
        }
      } catch (err) {
        let json = JSON.stringify({
          error: 'invalid request: body required',
        });
        responses.json400(req, res, json);
      }
    }
  );
}

function removeProject(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  if (req.url.pathname === '/api/projects') {
    req.on('error', err => {
      console.error(err);
    });
    if (req.url.query.id) {
      let id = req.url.query.id;
      let removed = storage.remove(id)
      .then(
        (json) => {
          console.log('removeproject json', json);
          responses.text204(req, res, `Successfully removed at: ${id}`);
      });
    } else {
      let projects = storage.getAll();
      responses.json200(req, res, JSON.stringify(projects));
    }
  } else {
    let message = 'error. invalid request\ntry localhost:3000/api/projects with a proper text query';
    responses.text400(req, res, message);
  }
}

module.exports = {
  getProjects,
  createProject,
  removeProject,
  updateProject,
};