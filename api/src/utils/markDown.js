'use strict';

// read a file and converts the markdown to HTML
var marked = require('marked'),
    fs = require('fs');

module.exports = {
    readHTML: function (path, callback) {
        fs.readFile(path, 'utf8', function (err, data) {
            if (!err) {
                marked.setOptions({
                    renderer: new marked.Renderer(),
                    gfm: true,
                    tables: true,
                    breaks: false,
                    pedantic: false,
                    sanitize: true,
                    smartLists: true,
                    smartypants: false,
                    langPrefix: 'language-',
                    highlight: function (code, lang) {
                        return code;
                    }
                });
                data = marked(data);
            }
            callback(err, data);
        });
    }
};