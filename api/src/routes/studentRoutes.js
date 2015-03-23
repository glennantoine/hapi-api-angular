"use strict";

var StudentController = require('../controllers/studentController'),
    studentController = new StudentController(),
    studentModel = require('../models/studentModel'),
    joi = require('joi');

module.exports = function(){
    return [
        {
            method: 'GET',
            path: '/api/students',
            config: {
                handler: studentController.getStudents,
                description: 'getStudents for returns all students for display.',
                notes: 'getStudents has some base setup to allow for additional '+
                       'parameters to be passed in thereby giving the clientside '+
                       'application the ability to limit the amount of data returned '+
                       'and/or limit results based on other query parameters.',
                tags: ['api', 'student', 'get']
            }
        },
        {
            method: 'GET',
            path: '/api/students/{studentId}',
            config: {
                handler: studentController.getStudentById,
                validate: {params: {
                                studentId: joi.number()
                                            .description('The Student Id')
                    }
                },
                description: 'getStudentById accepts the studentId as a '+
                             'parameter for returning a specific student by its id.',
                notes: 'At the moment there are no additional notes but as '+
                       'this endpoint matures additional details should be '+
                       'added in the form of notes.',
                tags: ['api', 'student', 'get']
            }
        },
        {
            method: 'POST',
            path: '/api/students',
            config: {
                handler: studentController.createStudent,
                validate: {payload: studentModel},
                //auth: {
                //    mode: 'try',
                //    strategy: 'session'
                //},
                //plugins: {
                //    'hapi-auth-cookie': {
                //        redirectTo: "/login"
                //    }
                //},
                description: 'createStudent accepts a student object as part of' +
                             ' a post method to create a new student',
                notes: 'At the moment there are no additional notes but as this ' +
                       'endpoint matures additional details should be added in the form of notes.',
                tags: ['api', 'student', 'post']
            }
        },
        {
            method: 'PUT',
            path: '/api/students',
            config: {
                handler: studentController.updateStudent,
                validate: {
                    payload: {
                        _id: joi.string()
                            .alphanum()
                            .required()
                            .description('The id of the student is required for update'),
                        firstName: joi.string().required(),
                        lastName: joi.string().required(),
                        studentId: joi.number().default(Math.floor((Math.random() * 10000) + 1)),
                        grade: joi.string().required(),
                        email: joi.string().required(),
                        phone: joi.string().required(),
                        active: joi.boolean().required()
                    }
                },
                //auth: {
                //    mode: 'try',
                //    strategy: 'session'
                //},
                //plugins: {
                //    'hapi-auth-cookie': {
                //        redirectTo: "/login"
                //    }
                //},
                description: 'updateStudent accepts student object and updates' +
                             ' the existing student document if found.',
                notes: 'At the moment there are no additional notes but as this ' +
                       'endpoint matures additional details should be added in the form of notes.',
                tags: ['api', 'student', 'put']
            }
        },
        {
            method: 'DELETE',
            path: '/api/students/{studentId}',
            config: {
                handler: studentController.deleteStudent,
                validate: {params: {
                    studentId: joi.number()
                        .description('The Student Id')
                }
                },
                //auth: {
                //    mode: 'try',
                //    strategy: 'session'
                //},
                //plugins: {
                //    'hapi-auth-cookie': {
                //        redirectTo: "/login"
                //    }
                //},
                description: 'deleteStudent deletes the matching document based on '+
                             'the studentId that is passed in.',
                notes: 'This endpoint is designed to perform a hard delete of the '+
                        'matching document and should therefore be restricted access ' +
                        'and/or disabled in favor of a soft delete action.',
                tags: ['api', 'student', 'delete']
            }
        }
    ];
}();
