const Car = require('../models/car.js');

describe("Car", () => {
    test("It should have an id", () => {
        let car = new Car("Ford", "Munstang GT", "2006", "Grey")
        expect(car.id.length).toEqual(36);
//        expect(true).toEqual(false);  (test for false positive)
    })
})