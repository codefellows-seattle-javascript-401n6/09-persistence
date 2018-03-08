'use strict';
const http = require('http');
const url = require('url');
const queryString = require('querystring');
const storage = require('../lib/storage');
const bodyParser = require('../lib/body-parser');
const Doge = require('../model/dog');



//this is my seed

storage.abandonDog();

// get all and get one by id GET
function getDogs(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  if (req.url.pathname === '/api/doge') {
    req.on('error', err => {
      console.error(err);
    });
    if (req.url.query.id === '') {
      let message = `Please provide a valid id`;
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.write(message);
        res.end();
    }
    else if (req.url.query.id) {
      let id = req.url.query.id;
      let dogs;
       storage.get(id).then(
         (json) => {
           dogs = json;
           if (dogs === undefined) {
           let message = `Dog at ${id} Not Found`;
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write(message);
          res.end();
           
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(json));
        res.end();
      }
      }
    );
    } else {
      let dogs = storage.getAll()
      .then(files => {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(files));
        res.end();
      })
    }
  } else {
    let message = 'error. invalid request\ntry localhost:3000/api/doge with a proper text query';
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.write(message);
    res.end();
  }
}



//create a new dog POST

function adoptDogs(req, res) {
  bodyParser(req).then(
    (body) => {
      try{
        body =JSON.parse(body);
        let puppy = new Doge(body.name, body.age, body.breed);
        let puppyId = puppy.id;
        storage.save(puppy);
        let savedPuppy = storage.get(puppyId);
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

// update a dog PUT

      function groomDogs(req, res) {
        req.url = url.parse(req.url);
        bodyParser(req).then(
          (body) => {
            try {
              body = JSON.parse(body);
              let name = body.name;
              let age = body.age;
              let breed = body.breed;
              if (body.id !== undefined) {
                let id = body.id;
                let doggy = storage.update(id, name, age, breed);
                res.writeHead(200, {
                  'Content-Type': 'text/plain'
                });
                res.write(`groomed a dog id ${doggy.id}`);
                res.end();
              }
            } catch (err) {
              let oops = JSON.stringify({
                error: 'invalid request: body required',
              });
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.write(oops);
              res.end();
            }
          }
        );
      }

// DELETE DOG

      function giveUpDogs(req, res) {
        req.url = url.parse(req.url);
        req.url.query = queryString.parse(req.url.query);
      
        if (req.url.pathname === '/api/doge') {
          req.on('error', err => {
            console.error(err);
          });
          if (req.url.query.id) {
            let id = req.url.query.id;
            storage.remove(id);
            res.writeHead(204, { 'Content-Type': 'text/plain' });
            res.write(`Gave up dog: ${id}`);
            res.end();
          } else {
            let impound = storage.getAll();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(impound));
            res.end();
          }
        } else {
          let message = 'error. invalid request\ntry localhost:3000/api/doge with a proper text query';
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.write(message);
          res.end();
        }
      }
   



module.exports = {getDogs, adoptDogs, groomDogs, giveUpDogs};