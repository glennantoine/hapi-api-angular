"use strict";
var env = process.env.NODE_ENV || "development";

var Hapi = require('hapi'),
    Mongoose = require('mongoose'),
    configs = require('./src/config/' + env + '.json'),
    routes = require('./src/routes');

    //Set the default view engine
    configs.options.views.engines = {html: require('swig')};

var host = configs.server.host,
    port = configs.server.port,
    dbHost = configs.mongoose.host,
    dbPort = configs.mongoose.port,
    dbName = configs.mongoose.db,
    options = configs.options,
    server = Hapi.createServer(host, port, options);

    //****************************
    //register plugins with server
    require('./src/plugins/config')(server);

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
                });
            }
        });
    });

    //Setup Database connection
    Mongoose.connect('mongodb://' + dbHost + ':' + dbPort + '/' + dbName);

    //************************
    //setup routes for server
    for(var route in routes){
        server.route(routes[route]);
    }

    module.exports = server;

    if(process.env.NODE_ENV !== 'test'){
        server.start();
        console.log('Server is running on port # ' + port );
    }
