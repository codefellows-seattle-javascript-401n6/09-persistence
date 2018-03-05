'use strict';

const Car = require("../models/car.js");

let CARS = {};

function seed() {
    CARS = {};
    save(new Car("Ford", "Mustang GT", "2006", "Grey"));
    save(new Car("Ford", "Mustang", "1994", "Teal"));
    save(new Car("Saturn", "Unknown Coup", "Unknown year", "Silver"));
    save(new Car("Ford", "Ranger", "1997", "Red"));
}

function save(car) {
    CARS[car.id] = car;
}

function get(id) {
    return CARS[id];
}

function getAll () {
    return Object.values(CARS);
}

function remove (id) {
    let deletedCar = get[id];
    delete CARS[id]
    return deletedCar;
}

module.exports = {seed, save, get, remove, getAll};