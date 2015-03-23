"use strict";

var joi = require('joi');

var studentModel = joi.object({
    _id: joi.string(),
    studentId: joi.number().required(),
    firstName: joi.string().trim().required(),
    lastName: joi.string().trim().required(),
    grade: joi.string().trim(),
    email: joi.string().trim(),
    phone: joi.string().trim(),
    active: joi.boolean().default(true),
    createDate: joi.string().isoDate()
});

module.exports = studentModel;
