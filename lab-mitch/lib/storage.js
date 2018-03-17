'use strict';

const fs = require('fs');
const parseJSON = require('../lib/parse-json.js')

const Car = require("../models/car.js");

let STORAGE_DIR = __dirname + '/carfiles';

let idFilename = (id) => {
    return `${STORAGE_DIR}/${id}.JSON`
}



function seed() {
    save(new Car("Alice", "Ford", "Mustang GT", "2006", "Grey"));
    save(new Car("Leena", "Ford", "Mustang LX", "1994", "Teal"));
    save(new Car("Unnamed", "Saturn", "Unknown Coup", "Unknown year", "Silver"));
    save(new Car("Camile", "Ford", "Ranger XL", "1997", "Red"));
}

function save(car) {
    return new Promise((resolve, reject) => {
        let filename = idFilename(car.id);
        let data = JSON.stringify(car);
        fs.writeFile(filename, data, (err) => {
            resolve(car);
        })
    })

}

function size() {
    let cars = readAll();
    return cars.length;
}

function create(name, make, model, year, color) {

}

function get(id) {
    return new Promise((resolve, reject) => {
        let filename = idFilename(car.id);
        fs.readFile(filename, (err, data) => {
            let retrievedCar = JSON.parse(data);
            resolve(retrievedCar);

        })
    });
}



function getAll() {
    return new Promise((resolve, reject) => {
        fs.readdir(STORAGE_DIRECTORY, (err, files) => {
            resolve(files);
        });
    });

}

function remove(id) {
    return new Promise((resolve, reject) => {
        get(id)
            .then(car => {
                let filename = idFilename(car.id);
                fs.unlink(filename, (err) => {
                    resolve(car);
                })
            })
    })
}

function removeAll() {
    return getAll()
        .then(files => {
            let promises = files.map(file => {
                let id = file.split(".json")[0];
                return remove(id);
            })
            return Promise.all(promises);
        });
}

module.exports = { seed, save, get, getAll, remove, removeAll };