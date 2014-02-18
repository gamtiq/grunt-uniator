/*
 * grunt-uniator
 * https://github.com/gamtiq/grunt-uniator
 *
 * Copyright (c) 2014 Denis Sikuler
 * Licensed under the MIT license.
 */

"use strict";

var uniator = require("uniator");

module.exports = function(grunt) {

    grunt.registerMultiTask("uniator", 
                            "Combine style-tags and CSS-files linked by HTML-file into one or several files or style-tags", 
                            function() {
        
        var task = this;

        // Iterate over all specified file groups
        this.files.forEach(function(file) {
            // Iterate over all source files
            file.src.forEach(function(filepath) {
                
                var log = grunt.log,
                    options, result;
                
                if (grunt.file.exists(filepath)) {
                    options = task.options();
                    if (file.dest) {
                        options.destFile = file.dest;
                    }
                    log.writeln("Processing '" + filepath + "'...");
                    result = uniator.collectCssInFile(filepath, options);
                    if (result.error) {
                        log.error("Error when processing '" + filepath + "': " + result.error[0]);
                    }
                    else {
                        if (result.warning) {
                            result.warning.forEach(function(warning) {
                                log.warn("Warning when processing '" + filepath + "': " + warning);
                            });
                        }
                        // Print a success message
                        log.writeln("File '" + result.file + (options.destFile ? "' created." : "' updated."));
                    }
                }
                else {
                    log.error("Source file '" + filepath + "' is not found.");
                }
                
            });
        });
    });

};
