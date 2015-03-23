"use strict";

var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var mixins = require('../utils/mixins');

fs.readdirSync(__dirname).forEach(function (file) {
    /* If its the current file ignore it */
    if (file === 'index.js'){
        return;
    }

    /* Prepare empty object to store module */
    var mod = {};

    var capitalized = mixins.capitalize(file);

    /* Store module with its name (from filename) */
    mod[path.basename(capitalized, '.js')] = require(path.join(__dirname, file));

    /* Extend module.exports */
    _.extend(module.exports, mod);
});