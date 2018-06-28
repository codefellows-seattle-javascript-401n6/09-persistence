'use strict';

const Computer = require('../model/computer.js');
const fs = require('fs');

let computers = {};
let filename = `${__dirname}/stor.json`;

function prePopulate() {
    // console.log('pre populate hit');
    // computers = {};
    // console.log('stor status: ', computers);
    fs.readFile(filename, (err, data) => {
        if (err) {
            throw err;
        }
        computers = JSON.parse(data);
        // console.log('stor status: ', computers);
    });
    //CUP, RAM, HDD
    // const server1 = new Computer('x1 Intel Xeon E5-2690', '32GB', '512GB SSD');
    // const server2 = new Computer('x2 Intel Xeon E5-2690', '64GB', '250GB M.2');
    // const server3 = new Computer('x2 Intel Xeon X5660', '74GB', '120GB SSD');

    // computers[server1.id] = server1;
    // computers[server2.id] = server2;
    // computers[server3.id] = server3;
}

function size() {
    let servers = readAll();
    return servers.length;
}

//shuld pull urrent state of Computer, add the new information and save Computer to stor.json file.
function create(cpu, ram, hdd) {
    console.log('create server hit!');
    const server = new Computer(cpu, ram, hdd);
    computers[server.id] = server;
    console.log('to be saved: ', server);
    fs.appendFile(filename, server, function (err) {
        if (err) throw err;
        console.log('Saved!', server);
      });
    return server;
}

function readAll() {
    return Object.values(computers);
}

function read(id) {
    if (!computers[id]) {
        return 'That server does not exist';
    }
    return computers[id];
}

function update(id, cpu, ram, hdd) {
    let server = read(id);
    computer.cpu = cpu;
    computer.ram = ram;
    computer.hdd = hdd;
    return server;
}

function del(id) {
    let server = read(id);
    delete computers[id];
    return server;
}

module.exports = {
    prePopulate, size,
    create, readAll, read, update, del,
};