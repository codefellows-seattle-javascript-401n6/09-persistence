'use strict';

const fs = require('fs');
const uuid = require('uuid/v4');
const Dog = require('../model/dog.js');

const filename = './saved-files/' + uuid() + '.json';
// let thePound = {};
let counter = 0;

const save = (filename, data, cb) => {
  data = JSON.stringify(data);
  fs.writeFile(filename, data, cb);
};

const read = (filename, cb) => {
  fs.readFile(`./saved-files/${filename}`, (error, data) => {
    console.log(`Is error null:${error}`);
    if (error) {
      cb(error);
    };
    data = JSON.parse(data.toString());
    // return data;
    cb(null, data);//null represents (no error)
  });
};

const remove = (filename, cb) => {
  fs.unlink(`${__dirname}/../saved-files/${filename}.json`, (error) => {
    if (error) {
      cb(error);
    };
    console.log(`saved-files/${filename} was deleted`);
    cb(null, filename);
  });
};

const seed = () => {
  
  const michael = new Dog('michael', 3, 'St-Bernard');
  const jb = new Dog('jb', 6, 'beagle');
  const steve = new Dog('steve', 5, 'poodle');
  
  const dogArray = [];

  dogArray.push(michael, jb, steve);
  console.log(`dogArray: ${JSON.stringify(dogArray)}`);

  for(let i = 0; i < dogArray.length; i++) {
    // const filename = './saved-files/' + uuid() + '.json';
    const filename = './saved-files/' + counter++ + '.json';//changed to counter++ in order to prevent having to delete a bunch of excess files
    save(filename, dogArray[i], (error) => {
      if (error) {
        throw error;
      };
      console.log(`SAVED: ${filename}`);
    });
  };
  // read(filename, (data) => {
  //   console.log('Got back:', data);
  //   console.log('data.name:', data.name);
  // });
};

const getAll = () => {
  let filesCounted = 0;
  fs.readdir('./saved-files/', (error, filename) => {
    if (error) {
      throw error;
    };
    filename.forEach(file => {
      read(filename + '.json', (error, allData) => {
        if (error) {
          console.log('ERROR read');
          console.error(error);
        };
        console.log('all data',allData);
      });
      if(filesCounted === filename.length - 1) {console.log(file)};
    });
    console.log(`array of file names: ${filename}`);
    // console.log(`List of Files: ${fileList}`);
    console.log('files counted',filesCounted);
  });
// let data = ;
  // read(filename, (data) => {
  //   console.log('Got back:', data);
  //   console.log('data.name:', data.name);
  // });
  // return data;
};

const getDog = (filename, cb) => {
  if (!filename) {
    console.log(`Dog not found in thePound with ID of: ${filename}`);
  };
  // let data2;
  read(filename + '.json', (error, fileData) => {
    if (error) {
      console.log('ERROR read');
      console.error(error);
    };
    console.log(`storage.js:83, FILEDATA${JSON.stringify(fileData)}`);
    // data2 = JSON.stringify(fileData);
    cb(fileData);
  });
  // console.log(`storage.js:77, returned: ${filename}`);
  // console.log('data2',data2);
};

const createDog = (name, age, breed) => {
  console.log('Started creating dog, storage.js:79');
  const someDog = new Dog(name, age, breed);
  console.log(`new dog created: ${JSON.stringify(someDog)}`);
  const filename = './saved-files/' + uuid() + '.json'; 
  save(filename, someDog, (error) => {
    if (error) {
      throw error;
    };
    console.log('saved:', filename);
  });
  return filename;
};

const removeDog = (filename) => {
  remove(filename, (error, filename) => {
    if (error) {
      throw error;
    };
    console.log(`dog REMOVED: ${filename}`);
    //delete file;
  });
};

module.exports = {seed, getDog, getAll, createDog, removeDog};