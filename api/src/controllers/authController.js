"use strict";
var template  = require('swig'),
    uuid = require('node-uuid'),
    fs = require('fs'),
    usersData = __dirname + '/../../data/users.json',
    users;


fs.readFile(usersData, 'utf8', function(err, data){
   if(!err){
       users = JSON.parse(data);
   }
});

var AuthController = function() {
    this.login = login;
    this.logout = logout;
};

function login(req, reply){
    var reqUrl = req.query.next || '/';
    var message = '',
        account = null;

    if (req.auth.isAuthenticated) {
        return reply.redirect(reqUrl);
    }


    if (req.method === 'post') {

        if (!req.payload.username ||
            !req.payload.password) {

            message = 'Missing username or password';
        }
        else {
            account = users[req.payload.username];
            if (!account ||
                account.password !== req.payload.password) {

                message = 'Invalid username or password';
            }
            reqUrl = req.payload.origination || reqUrl;
        }
    }

    if (req.method === 'get' || message) {
        var resp = template.renderFile(__dirname + '/../../public/login.html', {reqUrl: reqUrl});
        reply(resp);
    }

    var sid = uuid.v4();
    req.server.app.cache.set(sid, { account: account }, 0, function (err) {

        if (err) {
            reply(err);
        }

        req.auth.session.set({ sid: sid });
        return reply.redirect(reqUrl);
    });
}

function logout(req, reply){
    req.auth.session.clear();
    return reply.redirect('/');
}

module.exports = AuthController;