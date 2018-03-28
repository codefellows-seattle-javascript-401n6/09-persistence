'use strict';

const Project = require('../model/project.js');
const fs = require('fs');

let STORAGE_DIRECTORY = __dirname + '/project-files/';

function idFileName(id) {
  return `${STORAGE_DIRECTORY}${id}.json`;
}

function seed() {
  save(new Project('Node Ecosystem', 'The Arithmetic.add method expects two integers as parameters and returns either null if the entered arguments are invalid or an integer as the sum of both numbers.', 'https://github.com/amgranad/01-node-ecosystem/tree/master/lab-amber'));

  save(new Project('Tools and Context', 'Jest Testing and Map, Reduce, Filter, ForEach in vanilla JavaScript practice', 'https://github.com/amgranad/02-tools-and-context/tree/master/lab-amber'));

  save(new Project('Data modeling and Binary', 'ABitmap CLI Bitmap Transformer App', 'https://github.com/amgranad/04-data-modeling-and-binary/tree/master/lab-amber'));

  save(new Project('TCP Servers', 'Codefellows lab 06: TCP Chatbot Application', 'https://github.com/amgranad/06-tcp-servers/tree/master/lab-amber'));

  save(new Project('Http Server', 'Vanilla JavaScript Http Server, Restful API & Cowsay', 'https://github.com/amgranad/07-http-server/tree/master/lab-amber'));
}

function save(project) {
  return new Promise((resolve, reject) => {
    let filename = idFileName(project.id);
    let data = JSON.stringify(project);
    fs.writeFile(filename, data, (err) => {
      resolve(project);
    });
  });
}

function get(id) {
  return new Promise((resolve, reject) => {
    let filename = idFileName(id);
    fs.readFile(filename, (err, data) => {
      let project = JSON.parse(data);
      resolve(project);
    });
  });
}

function size() {
  let projects = getAll();
  return projects.length;
}

function getAll() {
  return new Promise((resolve, reject) => {
    fs.readdir(STORAGE_DIRECTORY, (err, files) => {
      resolve(files);
    });
  });
}

function update(id, name, description, url) {
  return new Promise((resolve, reject) => {
    get(id).then(
      project => {
        let filename = idFileName(id);
        let data = JSON.stringify(project);
        fs.writeFile(filename, data, (err) => {
          resolve(project);
        });
      }
    );
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    get(id)
    .then(project => {
      let filename = idFileName(id);
      fs.unlink(filename, (err) => {
        resolve(project);
      });
    });
  });
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