/*global module:false*/
/*module.exports = function(grunt) {
  require('./config/lineman').config.grunt.run(grunt);
};*/
module.exports = function( grunt ) {
    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    // Load the tasks we need
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-selenium-webdriver');
    grunt.loadNpmTasks('grunt-debug-task');
    grunt.loadNpmTasks('grunt-contrib-connect');

    var userConfig = require( './build.config.js' );

    taskConfig = {
        pkg: grunt.file.readJSON('package.json'),
        clean: [
          '<%= build_dir %>',
          '<%= compile_dir %>',
          'coverage'
        ],
        concat: {
            compile_js: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                    '<%= vendor_files.js %>',
                    'module.prefix',
                    '<%= app_files.js %>',
                    '<%=ngconstant.production.options.dest %>',
                    'module.suffix'
                ],
                dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        watch: {
            css: {
                files: 'src/css/*.css',
                options: {
                    livereload: true
                }
            },
            js: {
                files: 'src/js/*.js',
                options: {
                    livereload: true
                }
            },
            html: {
                files: 'src/*.html',
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            options: {
                port: 8000,
                hostname: 'localhost'
            },
            serve: {
                options: {
                    open: 'http://localhost:8000/',
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, './build')
                        ];
                    }
                }
            }
        },
        copy: {
            build_manifest: {
                files: [ 
                    {
                        src: '<%= app_files.manifest %>',
                        dest: '<%= build_dir %>/manifest.json',
                        cwd: '.'
                    }
                ]
            },
            build_app_assets: {
                files: [
                    {
                        src: '<%= app_files.assets %>',
                        dest: '<%= build_dir %>/assets/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendor_assets: {
                files: [
                    {
                        src: [ '<%= vendor_files.assets %>' ],
                        dest: '<%= build_dir %>/assets/',
                        cwd: '.',
                        expand: true,
                        flatten: true
                    }
                ]
            },
            build_appjs: {
                files: [
                    {
                        src: [ '<%= app_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendorjs: {
                files: [
                    {
                        src: [ '<%= vendor_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            }
        },
        delta: {
            gruntfile: {
                cwd: '.',
                files: [ 'Gruntfile.js', 'build.config.js' ],
                tasks: [ 'jshint:gruntfile' ]
            },

            jssrc: {
                files: '<%= app_files.js %>',
                tasks: [ 'jshint:app', 'copy:build_appjs', 'karma:unit:run' ]
            },

            manifest: {
                files: '<%= app_files.manifest %>',
                tasks: ['copy:build_manifest']
            },

            assets: {
                files: '<%= app_files.assets %>',
                tasks: [ 'copy:build_app_assets' ]
            },

            html: {
                files: [ '<%= app_files.html %>' ],
                tasks: [ 'index:build' ]
            },

            ngtemplates: {
                files: '<%= app_files.templates %>',
                tasks: [ 'ngtemplates', 'karma:unit:run' ]
            },

            less: {
                files: [ 'src/**/*.less' ],
                tasks: [ 'less:development', 'karma:unit:run' ]
            },

            spec: {
                files: [ '<%= test_files.spec %>' ],
                tasks: [ 'karma:unit:run' ]
            },

            karmaconfig: {
                files: [ 'karma.conf.js' ],
                tasks: [ 'karma:unit:run' ]
            }
        },
        index: {
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= copy.build_app_assets.files[0].dest %>/*.js',
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= build_dir %>/assets/vendor-<%= pkg.version %>.css',
                    '<%= build_dir %>/assets/app-<%= pkg.version %>.css',
                    '<%= ngtemplates.dev.dest %>'
                ]
            },
            compile: {
                dir: '<%= compile_dir %>',
                src: [
                    '<%= concat.compile_js.dest %>',
                    '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
                ]
            }
        },
        jshint: {
            app: [
                '<%= app_files.js %>'
            ],
            test: [
                '<%= app_files.jsunit %>'
            ],
            gruntfile: [
                'Gruntfile.js',
                'build.config.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                loopfunc: true
            }
        },
        less: {
            development: {
                options: {
                    sourceMap: true
                },
                files: [
                    {
                        dest: '<%= build_dir %>/assets/app-<%= pkg.version %>.css',
                        src: '<%=app_files.less %>'
                    },
                    {
                        dest: '<%= build_dir %>/assets/vendor-<%= pkg.version %>.css',
                        src: '<%=vendor_files.less %>'
                    }
                ]
            },
            production: {
                options: {
                    cleancss: true,
                    compress: true
                },
                files: [
                    {
                        dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css',
                        src: [
                            '<%=vendor_files.less %>',
                            '<%=app_files.less %>'
                        ]
                    }
                ]
            }
        },
        /**
        * The banner is the comment that is placed at the top of our compiled
        * source files. It is first processed as a Grunt template, where the `<%=`
        * pairs are evaluated based on this very configuration object.
        */
        meta: {
            banner:
                '/**\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' *\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
                ' */\n'
        },
        karma: {
            options: {
                configFile: 'karma.conf.js',
                files: [
                    userConfig.test_files.mocks,
                    userConfig.vendor_files.js,
                    userConfig.app_files.js,
                    '<%= ngconstant.production.options.dest %>',
                    '<%= ngtemplates.dev.dest %>',
                    userConfig.test_files.spec
                ]
            },
            unit: {
                browsers: [ 'Chrome' ],
                reporters: [ 'progress', 'coverage', 'osx' ],
                background: true
            },
            ci: {
                reporters: [ 'progress', 'coverage' ],
                autoWatch: false,
                browsers: [ 'Chrome' ],
                singleRun: true
            }
        },
        ngconstant: {
            options: {
                name: '<%= pkg.name %>',
                deps: false
            },
            dev: {
                options: {
                    dest: 'src/constants.js',
                },
                constants: {
                    'API_HOST': '127.0.0.1',
                    'ENV': 'development'
                }
            },
            production: {
                options: {
                    dest: 'src/constants.js',
                },
                constants: {
                    'API_HOST': 'X.X.X.X',
                    'ENV': 'production'
                }
            }
        },
        ngtemplates: {
            dev: {
                src: '<%= app_files.templates %>',
                dest: '<%= build_dir %>/src/templates.js',
                cwd: 'src/app',
                options: {
                    standalone: true,
                    module: 'templates',
                    htmlmin:{
                        removeComments:true,
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
                }
            },
            production: {
                src: '<%= app_files.templates %>',
                dest: 'src/templates.js',
                cwd: 'src/app',
                options: {
                    standalone: true,
                    module: 'templates',
                    htmlmin: {
                        removeComments:true,
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
                }
            }
        },
        protractor: {
            options: {
                configFile: 'node_modules/protractor/example/conf.js',
                keepAlive: true,
                chromeOnly: false,
                args: {
                }
            },
            development: {
                options: {
                    args: {
                        baseUrl: 'http://127.0.0.1:9000/',
                        seleniumAddress: 'http://localhost:4444/wd/hub',
                        specs: '<%= test_files.e2e %>',
                        browser: 'chrome',
                        verbose: true
                    }
                }
            },
            ci: {
                options: {
                    args: {
                        specs: '<%= test_files.e2e %>',
                        browser: 'chrome'
                    }
                }
            }
        },
        selenium_start: {
            options: {}
        },
        selenium_phantom_hub: {
            options: {}
        },
        selenium_stop: {
            options: {}
        },
        uglify: {
            compile: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
                }
            }
        }
    };

    grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

    grunt.renameTask( 'watch', 'delta' );
    grunt.registerTask( 'watch', [ 'build', 'karma:unit', 'delta' ] );
    grunt.registerTask( 'default', [ 'test' ] );
    grunt.registerTask( 'build', [
        'clean', 'ngtemplates:dev', 'jshint', 'less:development', 'copy:build_app_assets', 
        'copy:build_appjs', 'copy:build_vendor_assets', 'copy:build_vendorjs', 
        'index:build', 'ngconstant:dev' //, 'build-manifest'
    ]);

    // This is for Chrome Packaged Apps
    //grunt.registerTask( 'build-manifest', [ 'copy:build_manifest' ]);
    grunt.registerTask( 'compile', [
        'clean', 'jshint:app', 'ngconstant:production', 'ngtemplates:production',
        'less:production', 'concat:compile_js', /*'uglify',*/ 'index:compile'
    ]);

    grunt.registerTask( 'test', [ 'compile', 'karma:ci' ]);
    grunt.registerTask('serve', ['connect:serve', 'watch']);


    // Still a WIP
    //grunt.registerTask( 'test-e2e', [ 'selenium_phantom_hub', 'protractor:development']);
    /**
    * A utility function to get all app JavaScript sources.
    */
    function filterForJS ( files ) {
        return files.filter( function ( file ) {
            return file.match( /\.js$/ );
        });
    }

    /**
    * A utility function to get all app CSS sources.
    */
    function filterForCSS ( files ) {
        return files.filter( function ( file ) {
            return file.match( /\.css$/ );
        });
    }

    grunt.registerMultiTask( 'index', 'Process index.html template', function () {
        var dirRE = new RegExp( '^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g' ),
            jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
                return file.replace( dirRE, '' );
            }),
            cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
                return file.replace( dirRE, '' );
            });

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
            process: function ( contents, path ) {
                return grunt.template.process( contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config( 'pkg.version' )
                    }
                });
            }
        });
    });
};