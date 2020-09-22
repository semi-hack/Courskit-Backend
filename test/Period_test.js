process.env.NODE_ENV = 'test';

const { it, describe } = require('mocha');
const mocha = require('mocha');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index');

describe('Testing features of rooms', () => {
    const details = {
        startTime: "9:00",
        endTime: "10:00am",
        course: "5f629225975aff0017636da7"
    }

    const _id = "5f629225975aff0017636da7"

    it('should create a Period', (done) => {
        request(app)
        .post('/Admin/period')
        .send(details)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
        })
        done();
    });

    it('should return all periods', (done) => {
        request(app)
        .get('/Admin/getPeriod')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
        })
        done();
    });

    it('should update a period', (done) => {
        request(app)
        .patch('/Admin/period/update')
        .set("id", _id)
        .send(details)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
        })
        done();
    });

    it('should delete a Period', (done) => {
        request(app)
        .delete('/Admin/period/delete')
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