'use strict';
const Dog = require('../model/dog.js');

let pound = {};

function abandonDog() {

    pound = {};

    const michael = new Dog('Michael', 3, 'Great Dane');
    const jb = new Dog('JB',6,'lab' );
    const steve = new Dog('Steve',5,'irish wolf hound');

    pound[michael.id] = michael;
    pound[jb.id] = jb;
    pound[steve.id] = steve;


};

function getAll() {
    return Object.values(pound);
    console.log('this is the pound',pound)

};

// function getAll() {
//     return new Promise((resolve, reject) => {
//       resolve(Object.values(pound));
//       console.log(pound)
//     });
//   }
  


module.exports = {abandonDog, getAll};
