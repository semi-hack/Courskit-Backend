process.env.NODE_ENV = 'test';

const { it } = require('mocha');
const mocha = require('mocha');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index');



describe("testing features of user", () => {
    const details = {
        firstname: "test",
        lastname: "test",
        email: "test",
        dob: "test",
        level: "test",
        matric: "test",
        password: "test",
        role: "test"
    }

    var token = ''

    const _id = "5f64b4da621dae0017fa1aaf"
    

    it('should create a user', (done) => {
        request(app)
        .post('/signup')
        .send(details)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
        })
        done();
    });

    it('should return a user', (done) => {
        request(app)
        .get('/user')
        .set('Authorization', 'Bearer' + token)
        .expect(200)
        done();
    })

    it('should change password with correct input', (done) => {
        request(app)
        .post('/profile/resetPassword')
        .set('_id', _id)
        .send({
            oldPassword: "oldpass",
            newPassword: "newPass"
        })
        .expect(200)
        done();
    })

    // it('should update user data', (done) => {
    //     request(app)
    //     .update('/user')
    //     .send()
    // });


})