//**********************************************************
//These following tests comprise a set of integration tests
//for the API Student Endpoints since we have not mocked
//the Mongodb connection
'use strict';

var prodRoutes  = require('../../../src/routes/studentRoutes'),
    prodModel   = require('../../../src/models/studentModel'),
    Mongoose    = require('mongoose'),
    server;

// establish Mongodb Connection
Mongoose.connect('mongodb://localhost:27017/prototypeAPI');

Api.describe('Student Controller: ', function () {

    Api.before(function (done) {
        // setup server without starting - use inject instead
        server = Api.serverSetup();
        server.route(prodRoutes);

        done();
    });


    Api.after(function (done) {
        setTimeout(function () {
            server.stop();
            done();
        }, 10);
    });

    //Student: Method GET - Testing of all GET http methods
    Api.describe('GET HTTP Requests', function () {
        //Student: Find (List all students)
        Api.it("list endpoint for students lists all students", function(done) {
            var options = {
                method: "GET",
                url: "/api/students"
            };

            server.inject(options, function(response) {
                var result = response.result;

                Api.expect(response.statusCode).to.equal(200);
                Api.expect(response.result).to.be.instanceOf(Array);
                Api.expect(result.length).to.equal(4);

                done();
            });
        });

        //Student: FindById
        Api.it("findById endpoint to pull a specific student", function(done) {
            var studentId = '53c81c34a52d599025d950ad',
                options = {
                method: "GET",
                url: "/api/students/" + studentId
            };

            server.inject(options, function(response) {
                var result = response.result;

                Api.expect(response.statusCode).to.equal(200);
                Api.expect(response.result).to.be.instanceOf(Object);

                done();
            });
        });
    });


    //Student: Method POST - Testing of all GET http methods
    Api.describe('POST HTTP Requests', function () {

        var options = {
            method: "POST",
            url: "/api/students",
            payload: prodModel
        };

        prodModel = {
            _id: '53d14e809311d54e0a3b6fe1',
            description: "Test Student Description",
            name: "Integration Test Student",
            price: 1572,
            active: true,
            studentItems: {}
        };

        //Student: POST Method
        Api.it("endpoint for creating new students fails - redirect", function(done) {

            server.inject(options, function(response) {
                var result = response.result;
                Api.expect(response.statusCode).to.equal(302);
                Api.expect(response.headers.location)
                    .to.equal('http://0.0.0.0:80/login?next=%2Fapi%2Fstudents');

                done();
            });
        });

        //Student: POST Method
//        Api.it("endpoint for creating new students", function(done) {
//
//            server.inject(options, function(response) {
//                var result = response.result;
//
//                Api.expect(response.statusCode).to.equal(200);
//                Api.expect(response.result).to.be.instanceOf(Object);
//
//                done();
//            });
//        });

        //Clean up the Student document to remove the document
        //that was added as a result of the last test
        Api.after(function (done) {
            var model = Mongoose.connection.model('student');
            model.remove({price: 1572}, function(err, data){
                if(err){
                    server.log(err);
                }
            });

            done();
        });
    });
});

