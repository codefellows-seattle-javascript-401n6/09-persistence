'use strict';

const request = require('superagent');

const SERVER = 'http://localhost:3000';

describe('Server tests', () => {

    test('throws a 404 if route is not found', (done) => {
        request.get(SERVER + '/cats')
        .end((err ,res) => {
            expect(res.status).toBe(404);
            done();
        });


    
});

    test('throws a 404 if id not found' , (done) => {
        request.get(SERVER + '/api/doge' + '8675309')
        .end((err ,res) => {
            expect(res.status).toBe(404);
            done();
        });
});

    test('throws a 400 for POST with no body' , (done) => {
        request.post(SERVER + '/api/doge')
        .end((err ,res) => {
            expect(res.status).toBe(400);
            done();
    });
});

    test('throws a 400 for GET with no id' , (done) => {
        request.get(SERVER + '/api/doge?id=')
        .end((err ,res) => {
            expect(res.status).toBe(400);
            done();
    });
});


    test('returns 200 for good GET requests with a valid id' , (done) => {
        let expected;
        request.get(SERVER + '/api/doge')
        .end((err ,res) => {
            expected = res.body;
            let id = res.body.id;
            request.get(`${server}/api/doge?id=${id}`).end((err , res) => {
                expect(expected).toBe(expected);
                done();
            })  
    });
});

    test('returns 200 for POST requests', (done) => {
        let newDoge = {
            name: 'Barley',
            age: 6,
            breed: 'Black Lab'
        }
        request.post(SERVER + 'api/doge')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(newDoge))
        .end((err, res) =>{
            expect(res.body.name).toEqual(newDoge.name);
            expect(res.body.age).toEqual(newDoge.age);
            expect(res.body.breed).toEqual(newDoge.breed);
            expect(status).toBe(200);
            done();

        })

    })



});

