'use strict';

const Car = require("../models/car.js");
const storage = require("../lib/storage.js")
 
describe("Storage", () => {
    test("Seed create 4 cars", () => {
        storage.seed();
        let cars = storage.getAll();
        expect(cars.length).toEqual(4)
    })
    test("Create new car", () => {
        let car = new Car("Chevy", "Blazer", "1996", "Blue")
        storage.save(car);
        let cars = storage.getAll();
        expect(cars.length).toEqual(5)
    })
})