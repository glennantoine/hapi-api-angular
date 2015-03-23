/**
* Static routes
*/
'use strict';
var BaseController = require('../controllers/baseController'),
    baseController = new BaseController();

module.exports = function() {

    return [
        {
            path: "/json/{path*}",
            method: "GET",
            handler: {
                directory: {
                    path: __dirname + '/../../json',
                    listing: false,
                    index: false
                }
            }
        },
        {
            path: "/{path*}",
            method: "GET",
            handler: {
                directory: {
                    path: __dirname + '/../../public',
                    listing: false,
                    index: true
                }
            }
        },
        {
            path: "/apiDocs",
            method: "GET",
            config: {
                handler: baseController.apiDocs
            }
        }
    ];

}();