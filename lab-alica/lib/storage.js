'use strict';

const Paddle = require('../model/paddle.js')

let PADDLES = {};

function seed() {
    PADDLES = {};

    const shogun = new Paddle("Sho-Gun", 711, 197);
    const stikine = new Paddle("Stikine", 656, 194);
    const powerhouse = new Paddle("Powerhouse", 720, 200);

    PADDLES[shogun.id] = shogun;
    PADDLES[stikine.id] = stikine;
    PADDLES[powerhouse.id] = powerhouse;
    console.log("PADDLES:", PADDLES);
}

function size() {
    let paddles = readAll();
    return paddles.length;
}

function create(name, bladeSurfaceArea, length) {
    bladeSurfaceArea = parseInt(bladeSurfaceArea, 10);
    length = parseInt(length, 10);

    const paddle = new Paddle(name, bladeSurfaceArea, length);
    PADDLES[paddle.id] = paddle;
    return paddle;
}

function readAll() {
    return Object.values(PADDLES);
}

function read(id) {
    if (!id in PADDLES) {
        throw "Paddle doesn't exist. ID: " + id;
    }
    return PADDLES[id];
}

function update(id, bladeSurfaceArea, length) {
    let paddle = read(id);
    paddle.name = name;
    paddle.bladeSurfaceArea = bladeSurfaceArea;
    paddle.length = length;
    return paddle;
}

function del(id) {
    let paddle = read(id);
    delete PADDLES[id];
    return paddle;
}

module.exports = {
    seed, size, create, readAll, read, update, del,
};