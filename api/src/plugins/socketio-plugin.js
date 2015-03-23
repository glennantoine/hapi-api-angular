"use strict";

var socketIO = require('socket.io'),
    io;

var socketIoPlugin = {
    register: function (plugin, options, next) {

        // this is the hapi specific binding
        io = socketIO.listen(plugin.servers[0].listener);

        io.sockets.on('connection', function(socket) {
            socket.emit({msg: 'welcome'});
        });

        next();
    }
};

socketIoPlugin.register.attributes = {
    name: 'socketIoPlugin',
    version: '0.0.1'
};