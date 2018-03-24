'use strict';

const express = require('express');
const app = express();
const dog = require('./model/dog.js');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

require('./lib/storage.js').seed();//prepopulates thePound ONCE when the server starts up

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const routes = require('./routes/router.js');
app.use(routes);

app.use((request, response) => {
  //have the server send back something
  response.writeHead(200, {'Content-Type': 'text/plain'});//test response
  response.write('Testing basic response');//test response
  response.write(dog["name"]);
  response.end();//test response
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});