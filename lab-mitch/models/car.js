'use strict';

const uuid = require('uuid/v4');

class Car {
    constructor(name, make, model, year, color) {
        this.id = uuid();
        this.name = name;
        this.make = make;
        this.model = model;
        this.year = year;
        this.color = color;
    }
}

module.exports = Car;