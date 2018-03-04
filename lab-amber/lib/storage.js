'use strict';

const Project = require('../model/project.js');
const fs = require('fs');

let PROJECTS = {};

function seed() {
  PROJECTS = {};

  save(new Project('Node Ecosystem', 'The Arithmetic.add method expects two integers as parameters and returns either null if the entered arguments are invalid or an integer as the sum of both numbers.', 'https://github.com/amgranad/01-node-ecosystem/tree/master/lab-amber'));

  save(new Project('Tools and Context', 'Jest Testing and Map, Reduce, Filter, ForEach in vanilla JavaScript practice', 'https://github.com/amgranad/02-tools-and-context/tree/master/lab-amber'));

  save(new Project('Data modeling and Binary', 'ABitmap CLI Bitmap Transformer App', 'https://github.com/amgranad/04-data-modeling-and-binary/tree/master/lab-amber'));

  save(new Project('TCP Servers', 'Codefellows lab 06: TCP Chatbot Application', 'https://github.com/amgranad/06-tcp-servers/tree/master/lab-amber'));

  save(new Project('Http Server', 'Vanilla JavaScript Http Server, Restful API & Cowsay', 'https://github.com/amgranad/07-http-server/tree/master/lab-amber'));
}

function save(project) {
  PROJECTS[project.id] = project;
}

function get(id) {
  return PROJECTS[id];
}

function size() {
  let projects = getAll();
  return projects.length;
}

function getAll() {
  return Object.values(PROJECTS);
}

function update(id, name, description, url) {
  let project = get(id);
  project.name = name;
  project.description = description;
  project.url = url;
  return project;
}

function remove(id) {
  let project = get(id);
  delete PROJECTS[id];
  return true;
}

module.exports = {
  seed, 
  save, 
  get, 
  size,
  getAll, 
  update,
  remove
};