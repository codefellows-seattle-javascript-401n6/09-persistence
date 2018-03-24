'use strict';

const fs = require('fs');
const uuid = require('uuid/v4');

function save(filename, data, cb) {
  data = JSON.stringify(data);
  fs.writeFile(filename, data, cb);
}

function read(filename, cb) {
  fs.readFile(filename, (err, data) => {
    if (err) {
      throw err;
    };
    data = JSON.parse(data.toString());
    cb(data);
  });
};

const remove = (filename, cb) => {
  fs.unlink(`saved-files/${filename}`, (err) => {
    if (err) {
      throw err;
    };
    console.log(`saved-files/${filename} was deleted`);
    cb(filename);
  });
};

const filename = './saved-files/' + uuid() + '.json';
//creates a file with a filename .json and stores it into saved-files directory
//and gives each file a unique id
const data1 =  {name: 'Aaron'};
const data2 =  {name: 'Aaron'};
const data3 =  {name: 'Aaron'};
save(filename, data1, (err) => {
  if (err) {
    throw err;
  }
  console.log('saved:', filename);
});

save(filename, data2, (err) => {
  if (err) {
    throw err;
  }
  console.log('saved:', filename);
});

save(filename, data3, (err) => {
  if (err) {
    throw err;
  }
  console.log('saved:', filename);
});
read(filename, (data) => {
  console.log('Got back:', data);
  console.log('data.name:', data.name);
});
remove(filename, () => {
  console.log(`${filename} was deleted`);
});
// });
