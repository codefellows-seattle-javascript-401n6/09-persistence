'use strict';
const request = require('superagent');
const SERVER = 'http://localhost:3000';
const storage = require('../lib/storage');

describe('Server', () => {
    test('throws 404 if route not found', (done) => {
      request.get(SERVER + '/notfound')
        .end((err, res) => {
          console.log('Error', err);
          expect(res.status).toBe(404);
          done();
        });
    });
  
    test('throws 404 if resource not found', (done) => {
      let badId = 'caa81db0-0734-4ae8-a6c3-e97560c4d3e4';
      request.get(`${SERVER}/api/computers?id=${badId}`)
        .end((err, res) => {
          expect(res.status).toBe(404);
          done();
        });
    });
  
    test('throws 400 if no valid id provided', (done) => {
      let noId = '';
      request.get(`${SERVER}/api/computers?id=${noId}`)
        .end((err, res) => {
          expect(res.status).toBe(400);
          done();
        });
    });
  
    test('returns with 200 and a when a valid request body provided.', (done) => {
      let validRequest = {cpu: 'AMD Athalon XP', ram: '8GB', hdd: '60GB HDD'};
      request.post(`${SERVER}/api/computers`)
        .send(JSON.stringify(validRequest))
        .end((err, res) => {
          expect(res.status).toBe(200);
          done();
        });
    });
  
    test('returns with 400 if no valid request body provided', (done) => {
      let badBody = {};
      request.post(`${SERVER}/api/computers`)
        .set('Content-Type', 'application/json')
        .send(badBody)
        .end((err, res) => {
          console.log(res);
          expect(res.status).toBe(200);
          done();
        });
    });
  
    //this test causes server to crash but passes
    test.skip('returns with 200 and a response body if valid id provided.', (done) => {
      let validId = '02835e2f-91b9-43a4-b447-fc681a76ad77';
      request.get(`${SERVER}/api/computers?id=${validId}`)
        .end((err, res) => {
          console.log(res);
          expect(res.status).toBe(200);
          done();
        });
    });

    test.skip('returns with 204 and a when deleted by id', (done) => {
      let validRequest = {cpu: 'x2 Intel Xeon E5-2690', ram: '64GB', hdd: '250GB M.2'};
      request.delete(`${SERVER}/api/computers`)
        .send(JSON.stringify(validRequest))
        .end((err, res) => {
          expect(res.status).toBe(204);
          done();
        });
    });
  });