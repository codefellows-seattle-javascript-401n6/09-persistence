'use strict';

const storage = require('../lib/storage.js');
const bodyParser = require('../lib/bodyparser.js');

// router.get('/computers', computersAPI.getComputer);
function getServers(req, res) {

    let servers = storage.readAll();
    // console.log('I made it to this point at least before breaking!')
    // for testing
    servers[1].id = '02835e2f-91b9-43a4-b447-fc681a76ad77';
    let response = servers;

    if ('id' in req.url.query) {
        let id = req.url.query.id;
        if (id.length === 0) {
            console.log('400 bad request. Please provide a valid id');
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            throw '400 bad request';
        }

        servers.forEach(computer => {
            if (computer.id === id) {
                console.log('Server found: ', computer.id);
                response = computer;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(response));
                res.end();
                return;
            }
        });

        console.log(`404 Server not found id: ${id}`);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write(`404 Not found with id: ${id}`);
        res.end();
        return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(response));
    // console.log('Resutls: ', JSON.stringify(response));
    res.end();
};


function createServer(req, res) {
    console.log('create server api hit!');
    bodyParser(req, res)
        .then(body => {
            if (!body.cpu || !body.ram || !body.hdd) {
                throw '400 bad request';
            }
            let cpu = body.cpu;
            let ram = body.ram;
            let hdd = body.hdd;

            storage.create(cpu, ram, hdd);
            res.end();
        }).catch(err => {
            console.log('Error from post', err);
            res.end();
            return;
        });
};

// router.put('/computers', computersAPI.updateComputer);
function updateServer(req, res) {
 console.log('update function hit!')
};

function deleteServer(req, res) {
    let computers = storage.readAll();
    if ('id' in req.url.query) {
        let id = req.url.query.id;
        console.log('server id', computers[id]);
        computers.forEach((server, index) => {
            if (server.id === id) {
                storage.splice(index, 1);
                console.log(computers);
                res.writeHead(204, { 'Content-Type': 'application/json' });
                res.end();
            }
        });
    }
};

module.exports = { 
    getServers, 
    createServer, 
    updateServer, 
    deleteServer 
};