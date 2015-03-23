"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env : {
            dev : {
                NODE_PATH : '.'
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'node-inspector', 'watch', 'mochaTest'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 8081,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': false,
                    'no-preload': false,
                    'stack-trace-limit': 50
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    //DEFAULT DEBUG PORT: 5858
                    nodeArgs: ['--debug']
                }
            }
        },
        watch: {
            server: {
                files: ['**/*.js', '!node_modules/**/*.js', '!coverage.html'],
                tasks: ['jshint:with_overrides'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: { //docs: http://www.jshint.com/docs/options/
            src: ['**/*.js', '!node_modules/**/*.js', '!coverage.html'],
            options: {
                node: true,
                newcap: true,
                strict: true,
                laxcomma: true,
                noarg: true,
                noempty: true,
                undef: true,
                maxdepth: 2,
                maxlen: 100,
                sub: true
            },
            with_overrides: {
                options: {
                    expr: true,
                    globals: {
                        /* LAB */
                        Api   : false
                    }
                },
                files: {
                    src: ['test/**/*.js']
                }
            }
        },
        lab: {
            color       : true,
            coverage    : true,
            minCoverage : 70,
            verbose     : true,
            leakDetection: true
        }
    });

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-node-inspector');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-lab');

    grunt.registerTask('default', ['env:dev', 'concurrent:dev']);
    grunt.registerTask('test', ['lab']);

};
