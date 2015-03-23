process.env.NODE_ENV = 'test';

Api             = {};
Api.hapi        = require('hapi');
Api.path        = require('path'),
Api.Lab         = require('lab'),
Api.describe    = Api.Lab.experiment,
Api.it          = Api.Lab.test,
Api.expect      = Api.Lab.expect,
Api.before      = Api.Lab.before,
Api.beforeEach  = Api.Lab.beforeEach,
Api.after       = Api.Lab.after,
Api.afterEach   = Api.Lab.after;


Api.serverSetup = function(options){
    var server = new Api.hapi.Server(),
        options = options || {};


    server.pack.register(require('hapi-auth-cookie'), function (err) {
        var cache = server.cache('sessions', { expiresIn: 3 * 24 * 60 * 60 * 1000 });
        server.app.cache = cache;

        server.auth.strategy('session', 'cookie', {
            password: '458rw9T3B77582Q',
            cookie: 'basic',
            redirectTo: '/login',
            appendNext: true,
            isSecure: false,
            validateFunc: function (session, callback) {
                cache.get(session.sid, function (err, cached) {

                    if (err) {
                        return callback(err, false);
                    }

                    if (!cached) {
                        return callback(null, false);
                    }

                    return callback(null, true, cached.item.account);
                })
            }
        });
    });

    return server;
};


