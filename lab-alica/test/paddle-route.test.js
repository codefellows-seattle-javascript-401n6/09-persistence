'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const server = require('../server.js');

describe('Paddle Routes', function () {
    let paddle = null;

    describe('GET: /api/paddle', function () {
        it('should return a paddle', function (done) {
            request.get(`localhost:3000/api/paddle?id=${paddle.id}`)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).toEqual(200);
                    expect(res.body.name).toEqual('test name');
                    expect(res.body.bladeSurfaceArea).toEqual('test blade surface area');
                    expect(res.body.length).toEqual('test length');
                    done();
                });
        });
    });

    describe('POST: /api/paddle', function () {
        it('should return a paddle', function (done) {
            request.post('localhost:3000/api/paddle')
                .send({
                    name: 'test name',
                    paddle: 'test paddle'
                })
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).toEqual(200);
                    expect(res.body.name).toEqual('test name');
                    expect(res.body.bladeSurfaceArea).toEqual('test blade surface area');
                    expect(res.body.length).toEqual('test length');
                    paddle = res.body;
                    done();
                });
        });
    });
});