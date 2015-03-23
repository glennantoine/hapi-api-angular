//********************************************************************************
//This is here as a placeholder if possible and it makes sense this file would
//allow for the validation of each model to be broken out thereby providing
//flexibility around updates, testing, etc
//
"use strict";

var _ = require('underscore');
var studentModel = require('../models/studentModel');

function StudentValidate(){}

StudentValidate.prototype = (function(){

    return {
        findByID: {
            path: (function path() {
                return {
                    studentId : studentModel.studentId
                                .required().rename('studentId')
                };
            })()
        },
        find : {
            query: (function query() {
                return {
                    firstName : studentModel.firstName
                };
            })()
        },
        insert: {
            payload: (function payload() {
                return {
                    firstName : studentModel.firstName.required()
                };
            })()
        },
        update: (function update() {
            return {
                path: {
                    student_id : studentModel.studentId.required().rename('studentId')
                },
                payload: {
                    firstName : studentModel.firstName.required()
                }
            };
        })(),
        delete: {
            path: (function path() {
                return {
                    studentId : studentModel.studentId.required().rename('studentId')
                };
            })()
        }
    };
})();

var studentValidate = new StudentValidate();
module.exports = studentValidate;