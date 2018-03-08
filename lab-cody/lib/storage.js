'use strict';
const Dog = require('../model/dog.js');
const fs = require('fs');

let INVENTORY = __dirname + '/dog-files/';

function dogFile(id) {
    return `${INVENTORY}${id}.json`;
}



function abandonDog() {
   
    save(new Dog('Michael', 3, 'Great Dane')),
    save(new Dog('JB',6,'lab' )),
    save(new Dog('Steve',5,'irish wolf hound')),
    save(new Dog('Cody',2.5,'St. Bernard')),
    save(new Dog('Aaron',3,'Pug'))
   

};



function getAll() {
    return new Promise((resolve, reject) => {
        fs.readdir(INVENTORY, (err, dogs) => {
            resolve(dogs);
        });
    });

}

function get(id) {
    return new Promise((resolve, reject) => {
        let fileName = dogFile(id);
        fs.readFile(fileName, (err, data) => {
            let dog = JSON.parse(data);
            resolve(dog);
        });
    });
}

function save(puppy) {
    return new Promise((resolve, reject) => {
        let fileName = dogFile(puppy.id);
        let data = JSON.stringify(puppy);
        fs.writeFile(fileName, data, (err) => {
            resolve(puppy);
        });
    });
}


function update(id, name, age, breed) {
    return new Promise((resolve, reject) => {
        get(id).then(
            dog => {
                let fileName = dogFile(id);
                let data = JSON.stringify(dog);
                fs.writeFile(fileName, data, (err) => {
                    resolve(dog);
                });
            }
        );
    });
  }
  
  function remove(id) {
    return new Promise((resolve, reject) => {
        get(id)
        .then(dog => {
            let fileName = dogFile(id);
            fs.unlink(fileName, (err) => {
                resolve(dog);
            });
        });
    });
  }
  


module.exports = {abandonDog, getAll, update, remove, save, get};
