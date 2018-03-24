'use strict';

const express = require('express');
const router = express.Router();
const storage = require('../lib/storage.js');

router.get('/dogs', (request, response) => {
  let filename = request.query.filename;
  console.log(`router.js:9, NAME: ${filename}`);
  if(filename) {
    //GET ONE DOG
    storage.getDog(filename, (oneDog) => {
      //tested in terminal as    http GET :3000/dogs?filename=0
      console.log(`router.js:13, Dog with name: ${oneDog}`);
      response.send(oneDog);
    });
  } else {
    //GET ALL DOGS
  //   storage.getAll((currentPound) => {
  //   console.log(`curentPound: ${currentPound}`);
  //   response.send(currentPound);
  // });
    let currentPound = storage.getAll();
    console.log(`curentPound: ${currentPound}`);
    response.send(currentPound);
  };
});

router.post('/dogs', (request, response) => {
  let body = request.body;
  console.log(`POST body ${JSON.stringify(body)}`);
  let dogObj = storage.createDog(body.name, body.age, body.breed);

  console.log(`dogObj: ${dogObj}`);
  // dogObj.describe();
  response.send(dogObj);
});

router.delete('/dogs', (request, response) => {
  let filename = request.query.filename;
  console.log(`deleting name ${filename}`);
  if(filename) {
    storage.removeDog(filename);
    console.log(`DELETE queryparams: ${request.query}`);
  };
  let currentPound = storage.getAll();
  response.send(currentPound);
});

module.exports = router;