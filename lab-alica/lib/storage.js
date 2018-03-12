'use strict';

const Paddle = require('../model/paddle.js')
const fs = require('fs');
const parseJSON = require('../lib/parse-json.js');

let STORAGE_DIR = __dirname + '/paddlefiles';

let idFilename = (id) => {
    return `${STORAGE_DIR}/${id}.json`;
};

function seed() {
    save(new Paddle("test", 10, 100));
    save(new Paddle("Sho-Gun", 711, 197));
    save(new Paddle("Stikine", 656, 194));
    save(new Paddle("Powerhouse", 720, 200));
}

function save(paddle) {
    return new Promise((resolve, rej) => {
        let filename = idFilename(paddle.id);
        let data = JSON.stringify(paddle);
        fs.writeFile(filename, data, (err) => {
            resolve(paddle);
        })
    })
};

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
    return new Promise((resolve, rej) => {
        fs.readdir(STORAGE_DIR, (err, files) => {
            resolve(files);
        })
    })
};

function read(id) {
    return new Promise((resolve, rej) => {
        let filename = idFilename(id);
        fs.readFile(filename, (err, data) => {
            let paddle = parseJSON(data);
            resolve(paddle);
        })
    })
};

function update(id, name, bladeSurfaceArea, length) {
    return new Promise((resolve, rej) => {
        get(id).then(
            req => {
                let filename = idFilename(id);
                let data = JSON.stringify(paddles);
                fs.writeFile(filename, data, (err) => {
                    resolve(paddles);
                })
            }
        )
    })
};

function remove(id) {
    return new Promise((resolve, rej) => {
        get(id)
            .then(paddle => {
                let filename = idFilename(id);
                fs.unlink(filename, (err) => {
                    resolve(paddle);
                })
            })
    })
};

module.exports = {
    seed,
    size,
    create,
    readAll,
    read,
    update,
    remove,
};