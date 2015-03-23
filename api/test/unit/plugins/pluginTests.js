'use strict';

//************************************************
//Example of how to test Hapi Plugins that have
//been chosen to extend the functionality of the
//framework
Api.describe("Hapi Swagger plugin", function() {

    var server;

    // setup server without starting - use inject instead
    Api.before(function (done) {
        server = Api.serverSetup();
        setTimeout(done, 10);
    });


    Api.after(function (done) {
        setTimeout(function () {
            server.stop();
            done();
        }, 10);
    });

    Api.it("successfully loads", function(done) {

        server.pack.register(require("hapi-swagger"), function(err) {
            Api.expect(err).to.equal(undefined);
            done();
        });
    });

    Api.it("registers plugin routes", function(done) {
        var table = server.table();
        Api.expect(table).to.have.length(3);
        Api.expect(table[0].path).to.equal("/docs");
        Api.expect(table[1].path).to.equal("/docs/swaggerui/index.html");
        Api.expect(table[2].path).to.equal("/docs/swaggerui/{path*}");
        done();
    });
});