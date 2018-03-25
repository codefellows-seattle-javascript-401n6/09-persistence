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

const getAll = (cb) => {
  let fileDataList = [];
  let filesCounted = 0;
  fs.readdir('./saved-files/', (error, filename) => {
    if (error) {
      throw error;
    };

    filename.forEach(file => {
      fs.readFile(`./saved-files/${file}`, (error, data) => {
        console.log(`Is error null:${error}`);
        if (error) {
          cb(error);
        };

        fileDataList.push(JSON.parse(data.toString()));
        filesCounted++;
        console.log(`Number of Files Counted: ${filesCounted}`);

        if (filesCounted === filename.length) {
          console.log(fileDataList);
          cb(null, fileDataList);
        };

      });

    });
  });

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