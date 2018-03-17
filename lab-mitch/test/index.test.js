'use strict';

const request = require('superagent');
const myServer = require('../index.js');
const SERVER_URL = 'http://localhost:3000';

describe('Server tests', () => {
      test('Throws 404 if route is not found', (done) => {
        request.get(SERVER_URL + '/incorrect')
          .end((err, res) => {
            if (err) {
             // //console.log('ERROR:', err);
            }
            expect(res.status).toBe(404);
            done();
          });
      });

      test('Throws 404 if invalid IDs are entered', (done) => {
        request.get(SERVER_URL + '/api/cars' + 'invalid ID')
          .end((err, res) => {
            if (err) {
              //console.log('ERROR:', err);
            }
            expect(res.status).toBe(404);
            done();
          });
      });

      test('throws 400 for get requests with no ID', (done) => {
        request.post(SERVER_URL + '/api/cars')
          .end((err, res) => {
            if (err) {
              //console.log('ERROR:', err);
            }
            expect(res.status).toBe(400);
            done();
          });
      });
      test('returns 200 for good get requests/contain response body', (done) => {
        let expected;
        request.get(SERVER_URL + '/api/cars')
        .end((err, res) => {
          expected = res.body[0];
          //console.log('RES.BODY', res.body);
          let id = res.body[0].id
          request.get(`${SERVER_URL}/api/cars?id=${id}`)
          .end((err, res) => {
            expect(res.body).toEqual(expected);
            done();
          })
        })
      })
      test('returns 200 for POST requests. Post request with valid body should respond with the body.', (done) => {
        let newCar = {name: "made up", make: "BestCar", model: "BestModel", year: "2022", color: "BestColor"};
        request.post(SERVER_URL + '/api/cars')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(newCar))
        .end((err, res) => {
          console.log('New Car in Index.test', newCar);
          expect(res.body.name).toEqual(newCar.name);
          expect(res.body.make).toEqual(newCar.make);
          expect(res.body.model).toEqual(newCar.model);
          expect(res.body.year).toEqual(newCar.year);
          expect(res.body.color).toEqual(newCar.color);
          expect(res.status).toBe(200);
          done();
        })
      })
    });