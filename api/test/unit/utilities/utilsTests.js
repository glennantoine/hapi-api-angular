"use strict";
var markdown    = require('../../../src/utils/markDown'),
    mdFile      = Api.path.join(__dirname, '/../public/ApiDocs.md'),
    mdFileBad   = Api.path.join(__dirname, '/../public/ApiDoc.md');

Api.describe('Markdown utility: ', function () {
    Api.it("read in a markdown file and convert", { timeout: 3000 }, function(done) {
        markdown.readHTML(mdFile, function(err, data){
            if(!err){
                Api.expect(data).is.html(data);
            }
        });
        done();
    });

    Api.it("failed read of markdown file", { timeout: 3000 }, function(done) {
        markdown.readHTML(mdFileBad, function(err, data){
            Api.expect(err).to.be.instanceOf(Object);
        });
        done();
    });
});
