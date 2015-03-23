"use strict";

var socketIO = require('socket.io'),
    io,
    version = '0.1';

// setup swagger options
var swaggerOptions = {
    basePath: 'http://localhost:8800',
    apiVersion: version,
    pathPrefixSize: 2
};

var goodOptions = {
    opsInterval: 60000,
    maxLogSize: 10000000,
    subscribers: {
        './logs/api_error':     ['error'],
        './logs/api_request':   ['request'],
        './logs/api_log':       ['ops', 'log'],
        'console':                  ['ops', 'request', 'log', 'error']
    }
};

module.exports = function(server) {

    server.pack.register([
/*        {
            plugin: require('poop'),
            options: {logPath: './logs/api_unhandled'}
        },*/
        {
            plugin: require('good'),
            options: goodOptions
        },
        {
            plugin: require('hapi-swagger'),
            options: swaggerOptions
        },
        {
            name: 'socketIoPlugin',
            version: '0.0.1',
            register: function (plugin, options, next) {
                // this is the hapi specific binding
                io = socketIO.listen(plugin.servers[0].listener);
                io.sockets.on('connection', function(socket) {
                    socket.emit({msg: 'welcome'});
                });
                next();
            }
        },
        {
            name: 'example-plugin-with-options',
            version: '0.0.1',
            register: function (plugin, options, next) {

                plugin.route({
                    method: 'GET',
                    path: '/pluginRoute',
                    handler: function (request, reply) {
                    reply(options.message);
                }
                });
                next();
            },
            options: {
                message: 'hello from our example plugin'
            }
        }
    ], function(err) {
        if (err) throw err;
    });
};
