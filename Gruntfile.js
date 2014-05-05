/*
 * grunt-uniator
 * https://github.com/gamtiq/grunt-uniator
 *
 * Copyright (c) 2014 Denis Sikuler
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        
        // Temporary directory to run tests
        testDir: "test/tmp",
        
        jshint: {
            all: [
                "Gruntfile.js",
                "tasks/*.js",
                "<%= nodeunit.tests %>",
            ],
            options: {
                jshintrc: ".jshintrc",
            }
        },

        // Remove directory that was created for tests.
        clean: {
            tests: ["<%= testDir %>"]
        },

        // Before running tests, copy fixtures files into temp directory.
        copy: {
            fixtures: {
                files: [
                    {
                        expand: true,
                        cwd: "test/fixtures",
                        src: "**",
                        dest: "<%= testDir %>"
                    },
                    {
                        src: "test/fixtures/index.html",
                        dest: "<%= testDir %>/source.html"
                    }
                ]
            }
        },
        
        // Configuration to be run (and then tested).
        uniator: {
            "default_options": {
                src: ["<%= testDir %>/index.html"]
            },
            
            "custom_options": {
                options: {
                    cssFile: "css/combined",
                    destDir: "<%= testDir %>/out",
                    minifyCss: true,
                    removeSourceFile: true,
                    updateUrl: true
                },
                src: ["<%= testDir %>/source.html"],
                dest: "<%= testDir %>/out/processed.html"
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ["test/*_test.js"],
        },
        
        push: {
            options: {
                commitMessage: "Release version %VERSION%",
                commitFiles: ["-a"],
                tagName: "%VERSION%",
                tagMessage: "Version %VERSION%"
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks("tasks");

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-nodeunit");
    grunt.loadNpmTasks("grunt-push-release");

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask("test", ["clean", "copy", "uniator", "nodeunit", "clean"]);

    // By default, lint and run all tests.
    grunt.registerTask("default", ["jshint", "test"]);
    
    // Release tasks
    grunt.registerTask("release", ["push"]);
    grunt.registerTask("release-minor", ["push:minor"]);
    grunt.registerTask("release-major", ["push:major"]);
    
    // For Travis CI service
    grunt.registerTask("travis", ["default"]);
};
