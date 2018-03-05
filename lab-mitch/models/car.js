const uuid = require('uuid/v4');

class Car {
    constructor(make, model, year, color) {
        this.id = uuid();
        this.make = make;
        this.model = model;
        this.year = year;
        this.color = color;
    }
}

module.exports = Car;