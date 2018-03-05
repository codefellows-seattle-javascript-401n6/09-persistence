'use strict';

const Paddle = require('../model/paddle.js');
const expect = require('chai').expect;
    
describe("Testing the Paddle Model", () => {
    test("It should create a new Paddle object", () => {
        let stikine = new Paddle("Stikine", 656, 194);
        expect(stikine.id.length).toEqual(36);
        
        expect(stikine.name).toEqual("Stikine");
        expect(stikine.bladeSurfaceArea).toEqual(656);
        expect(stikine.length).toEqual(194);
    })
});