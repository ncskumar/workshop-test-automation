// test/app.test.js
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';  // Import your app file using ES Modules

describe('CRUD Operations for Users', function () {
    let createdUserId;

    // Test Create User
    it('should create a new user', function (done) {
        supertest(app)
            .post('/api/users')
            .send({ name: 'John Doe', email: 'john@example.com' })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('id');
                expect(res.body.name).to.equal('John Doe');
                expect(res.body.email).to.equal('john@example.com');
                createdUserId = res.body.id;  // Store user ID for later tests
                done();
            });
    });

    // Test Get All Users
    it('should return all users', function (done) {
        supertest(app)
            .get('/api/users')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('array').that.is.not.empty;
                done();
            });
    });

    // Test Get User by ID
    it('should get a user by ID', function (done) {
        supertest(app)
            .get(`/api/users/${createdUserId}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('id').that.equals(createdUserId);
                expect(res.body.name).to.equal('John Doe');
                expect(res.body.email).to.equal('john@example.com');
                done();
            });
    });

    // Test Update User
    it('should update an existing user', function (done) {
        supertest(app)
            .put(`/api/users/${createdUserId}`)
            .send({ name: 'John Updated', email: 'johnupdated@example.com' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.name).to.equal('John Updated');
                expect(res.body.email).to.equal('johnupdated@example.com');
                done();
            });
    });

    // Test Delete User
    it('should delete an existing user', function (done) {
        supertest(app)
            .delete(`/api/users/${createdUserId}`)
            .expect(204)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    // Test Get User after Deletion
    it('should return 404 for deleted user', function (done) {
        supertest(app)
            .get(`/api/users/${createdUserId}`)
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    // Cleanup after all tests
    after(function () {
        // Add cleanup logic if needed, e.g., closing database connections or server
        process.exit(0);  // Explicitly tell Node.js to exit after tests are done
    });
});
