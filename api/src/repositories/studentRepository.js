"use strict";

  var Q = require('q'),
      _ = require('lodash');

function StudentRepository(mongoose, connection, options) {
    this.options = options;
    this.Schema = mongoose.Schema;
    this.ObjectId = this.Schema.ObjectId;

    this.StudentSchema = new this.Schema({
        studentId: { type: Number, required: false},
        firstName: String,
        lastName: String,
        grade: String,
        email: String,
        phone: String,
        active: Boolean,
        createDate: String
    });

    this.findById = findById;
    this.find = findAll;
    this.createStudent = createStudent;
    this.updateStudent = updateStudent;
    this.removeStudent = removeStudent;

    this.model = connection.model('student', this.StudentSchema);
}

function findById(options) {
    var deferred = Q.defer(),
        model = this.model;

    if(options){
        model
            .findOne({'studentId': options})
            .lean()
            .exec(
            function(err, student) {
                if (err) {
                    return deferred.reject(err);
                }

                if (student === null) {
                    return deferred.reject({ message: 'Student not found' });
                }
                deferred.resolve(student);
            }
        );

    }else{
        return deferred.reject({ message: 'Invalid Parameters' });
    }
    return deferred.promise;
}

//Todo: need to add options for page, pagesize, sorting, etc
function findAll(query) {
    var deferred = Q.defer(),
        query = query || {},
        model = this.model;

    model
        .find(query)
        .skip()
        .limit()
        .sort()
        .exec(
        function(err, students){
            if (err) {
                return deferred.reject(err);
            }

            if (students === null) {
                return deferred.reject({ message: 'Students not found' });
            }

            deferred.resolve(students);
        }
    );
    return deferred.promise;
}

function createStudent(data) {
    var deferred = Q.defer();
//    var student = new Student(_.extend({}, data));
    var student = data;
    var Model = this.model;

    new Model(student)
        .save(function(err, student) {
            if (err) {
                return deferred.reject(err);
            }
            deferred.resolve(student.toJSON());
        });

    return deferred.promise;
}

function updateStudent(data) {
    var deferred = Q.defer(),
        model = this.model,
        id;

    if(data && data._id){
        id = data._id;

        delete data._id;

        model.findOne({_id: id}, function(err, student) {

            if (err) { return deferred.reject(err); }

            if (student === null) {
                return deferred.reject({ message: 'Student not found' });
            }

            _.forEach(data, function(value, key) {
                student[key] = value;
            });

            student.save(
                function(err, student) {
                    deferred.resolve(student);
                }
            );
        });

    }else{
        return deferred.reject({ message: 'Invalid Parameter' });
    }

    return deferred.promise;
}

function removeStudent(studentId) {
    var deferred = Q.defer(),
//        student = new Student(_.extend({}, data)),
        model = this.model;

    model.findOne({studentId: studentId},
            function(err, student) {
                if (err) {
                    return deferred.reject(err);
                }

                if (student === null) {
                    return deferred.reject({ message: 'Student not found' });
                }

                student.active = false;

                student.save(
                    function(err, student) {
                        if (err) {
                            return deferred.reject(err);
                        }

                        deferred.resolve(student);
                    }
                );
            });

    return deferred.promise;
}

module.exports = StudentRepository;
