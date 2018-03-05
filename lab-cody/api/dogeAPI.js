'use strict';
const http = require('http');
const url = require('url');
const parseQuery = require('querystring');
const bodyParser = require('../lib/body-parser.js');
const storage = require('../lib/storage');
const Doge = require('../model/dog.js');

storage.abandonDog();

function getDogs(req, res) {
  let dogs = storage.getAll();
  let response = dogs;
  if ('id' in req.url.query) {
    let id = req.url.query.id;
    if (dogs[id] === undefined) {
      throw "404 dog id not found: " + id;
    }
    response = dogs[id];
  }

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })
  res.write(JSON.stringify(response));
  res.end();
}


function adoptDogs(req, res) {
  bodyParser(req).then(
    (body) => {
      try{
        body =JSON.parse(body);
        let puppy = new Doge(body.name, body.age, body.breed);
        let puppyId = puppy.id;
        storage.save(puppy);
        let savedPuppy = storage.getAll(puppyId);
        res.writeHead(200, {'Content-type': 'application/json'});
        res.write(JSON.stringify(savedPuppy));
        res.end();
      }catch (err) {
        let oops = JSON.stringify({error: err});
        res.writeHead(400, {'Content-Type' : 'application/json'});
        res.write(JSON.stringify(oops));
        res.end();
      }
    }).catch((err) => console.error(err));

      }
   



module.exports = {getDogs, adoptDogs};