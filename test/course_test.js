process.env.NODE_ENV = 'test';

const { it, describe } = require('mocha');
const mocha = require('mocha');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index');


describe('Testing features of courses', () => {
    const details = {
        name: "ts",
        code: "ts",
        unit: 2,
        day: "ts",
        time: "ts",
        venue: "5f629225975aff0017636da7",
        description: "ts",
        level: 100,
        lecturer: "5f629225975aff0017636da7",
        colorCode: "#fcba03"
    }

    const _id = "5f629225975aff0017636da7"

    it('should create a course', (done) => {
        request(app)
        .post('/Admin/course')
        .send(details)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
        })
        done();
    });

    it('should return all courses', (done) => {
        request(app)
        .get('/Admin/getCourse')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
        })
        done();
    });

    it('should update a course', (done) => {
        request(app)
        .patch('/Admin/course/update')
        .set("_id", _id)
        .send(details)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
        })
        done();
    });

    it('should delete a course', (done) => {
        request(app)
        .delete('/Admin/course/delete')
        .set("_id", _id)
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