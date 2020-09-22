process.env.NODE_ENV = 'test';

const { it, describe } = require('mocha');
const mocha = require('mocha');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index');

describe('Testing features of rooms', () => {
    const details = {
        name: "room",
        capacity: 100
    }

    const _id = "5f629225975aff0017636da7"

    it('should create a room', (done) => {
        request(app)
        .post('/Admin/room')
        .send(details)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
        })
        done();
    });

    it('should return all rooms', (done) => {
        request(app)
        .get('/Admin/room')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
        })
        done();
    });

    it('should update a room', (done) => {
        request(app)
        .patch(`/Admin/room/${_id}`)
        .send(details)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
        })
        done();
    });

    it('should delete a room', (done) => {
        request(app)
        .delete('/Admin/room/delete')
        .set("id", _id)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
        })
        done();
    });
} )