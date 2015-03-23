"use strict";

var markDown = require('../utils/markDown');

var BaseController = function() {
    this.apiDocs = apiDocs;
};

function apiDocs(req, reply) {
    markDown.readHTML(__dirname + '/../../README.md', function(err, data){
        reply.view('swagger.html', {
            title: 'Prototype API',
            markdown: data
        });
    });
}

module.exports = BaseController;