/**
* Auth routes
*/
'use strict';
var AuthController = require('../controllers/authController'),
    authController = new AuthController();

module.exports = function(server, config) {

    return [
        {
            path: "/login",
            method: ['GET', 'POST'],
            config: {
                handler: authController.login,
                auth: {
                    mode: 'try',
                    strategy: 'session'
                },
                plugins: {
                    'hapi-auth-cookie': {
                        redirectTo: false
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/logout',
            config: {
                handler: authController.logout,
                auth: 'session'
            }
        }
    ];

}();