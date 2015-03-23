"use strict";

var path = require('path'),
    fs = require('fs'),
    _ = require('underscore');


fs.readdirSync(__dirname).forEach(function(file){

    //Ignore the index.js file
    if(file === 'index.js') return;

    //Create an empty obj to store our modules
    var mod = {};

    //Store modules by name based on the filename
    mod[path.basename(file, '.js')] = require(path.join(__dirname, file));

    //Extend the module.exports
    _.extend(module.exports, mod);
});