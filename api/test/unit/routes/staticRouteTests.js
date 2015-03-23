'use strict';

Api.describe('Static routes test:', function () {

    var server,
        staticRoutes  = require('../../../src/routes/staticRoutes');

    Api.before(function (done) {
        server = Api.serverSetup();
        server.route(staticRoutes);

        done();
    });

    Api.after(function (done) {
        setTimeout(function () {
            server.stop();
            done();
        }, 10);
    });

    Api.it("default route that returns index.html", function(done) {
        var options = {
            method: "GET",
            url: "/"
        };
        server.inject(options, function(response) {
            var result = response.result;

            Api.expect(response.statusCode).to.equal(200);
            Api.expect(response.payload).to.have.length(2887);

            done();
        });
    });

});
