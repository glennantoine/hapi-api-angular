"use strict";

var StudentRepository = require('../repositories/studentRepository'),
    Mongoose = require('mongoose'),
    dbConn = Mongoose.connection,
    studentRepo = new StudentRepository(Mongoose, dbConn, {});

var StudentController = function() {
    this.getStudents = getStudents;
    this.getStudentById = getStudentById;
    this.createStudent = createStudent;
    this.updateStudent = updateStudent;
    this.deleteStudent = deleteStudent;
};

function getStudentById(req, reply) {
    var studentId = req.params.studentId || null,
        studentRepository = studentRepo;

    if (studentId) {
        studentRepository
            .findById(studentId)
            .then(function(student){
                if (student) {
                    //Do some other stuff and then return the student
                    reply(student);
                }
                else {
                    reply({ error: "Student non existent"}).code(404);
                }
            })
            .fail(function(err) {
                reply({error: err.message}).code(500);
            });
    }
    else {
        reply().code(400);
    }
}
function getStudents(req, reply) {
    var studentRepository = studentRepo;
    var criteria = req.params.criteria || {};

    studentRepository.find(criteria)
        .then(function(students) {
            if (students && students.length > 0) {
                reply(students);
            }
            else {
                reply(null).code(200);
            }
        })
        .fail(function(err) {
            reply({error: err.message}).code(500);
        })
        .done();
}


function createStudent(req, reply) {
    var studentRepository = studentRepo;
    if (req.payload) {
        studentRepository.createStudent(req.payload)
            .then(
            function(student) {
                if (student) {
                    //Do some other stuff and then return the student
                    reply(student);
                }
                else {
                    reply({error: "Student Create Error"}).code(404);
                }
            })
            .fail(function (err) {
                reply({error: err.message}).code(400);
            })
            .done();
    }
    else {
        reply({error: 'Missing student data'}).code(400);
    }
}

function updateStudent(req, reply) {
    var studentRepository = studentRepo;

    if (req.payload) {
        studentRepository.updateStudent(req.payload)
            .then(
            function(student) {
                if (student) {
                    //Do some other stuff and then return the student
                    reply(student);
                }
                else {
                    reply({error: "Student Update Error"}).code(404);
                }
            })
            .fail(function (err) {
                reply({error: err.message}).code(400);
            })
            .done();
    }
    else {
        reply({error: 'Missing student data'}).code(400);
    }
}


function deleteStudent(req, reply) {
    var studentRepository = studentRepo;

    if (req.params.studentId) {
        studentRepository.removeStudent(req.params.studentId)
            .then(
            function(student) {
                if (student) {
                    reply(student);
                }
                else {
                    reply({error: "Student Delete Error"}).code(404);
                }
            })
            .fail(function (err) {
                reply({error: err.message}).code(400);
            })
            .done();
    }
    else {
        reply({error: 'Missing student data'}).code(400);
    }
}

module.exports = StudentController;