"use strict";

var path = require("path"),
    grunt = require("grunt");

function normalizeLineEnd(text) {
    return text.replace(/\r\n/g, "\n");
}

function getFileContent(filepath) {
    return normalizeLineEnd( grunt.file.read(filepath) );
}

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.uniator = {
    setUp: function(done) {
        this.testDir = "test/tmp";
        this.expectedDir = "test/expected";
        
        done();
    },
    
    "default_options": function(test) {
        var file = grunt.file,
            expectedDir = this.expectedDir + "/default_options",
            resultFile = path.join(this.testDir, "index.html"),
            styleFile = path.join(this.testDir, "style.css");
        
        test.expect(4);

        test.equal(file.exists(resultFile), true, "Source file should exist");
        test.equal(getFileContent(resultFile), 
                   getFileContent( path.join(expectedDir, "index.html") ), 
                   "Contents of source file should be changed");
        
        test.equal(file.exists(styleFile), true, "Result CSS-file should be created");
        test.equal(getFileContent(styleFile), 
                   getFileContent( path.join(expectedDir, "style.css") ), 
                   "Contents of result CSS-file should contain collected styles");

        test.done();
    },
    
    "custom_options": function(test) {
        var file = grunt.file,
            expectedDir = this.expectedDir + "/custom_options",
            styleDir = this.testDir + "/style",
            resultFile = path.join(this.testDir, "out/processed.html"),
            styleFile = path.join(this.testDir, "out/css/combined.css");
        
        test.expect(8);

        test.equal(file.exists(resultFile), true, "Result HTML-file should exist");
        test.equal(getFileContent(resultFile), 
                   getFileContent( path.join(expectedDir, "index.html") ), 
                   "Contents of result HTML-file should be different from contents of source HTML-file");
        
        test.equal(file.exists(styleFile), true, "Result CSS-file should be created");
        test.equal(getFileContent(styleFile), 
                   getFileContent( path.join(expectedDir, "style.css") ), 
                   "Contents of result CSS-file should contain collected and minified styles");

        test.equal(file.exists( path.join(styleDir, "a.css") ), false, "Source CSS-file should be removed");
        test.equal(file.exists( path.join(styleDir, "b.css") ), false, "Source CSS-file should be removed");
        test.equal(file.exists( path.join(styleDir, "style/c.css") ), false, "Source CSS-file should be removed");
        test.equal(file.exists( path.join(styleDir, "d.css") ), false, "Source CSS-file should be removed");

        test.done();
    }
};
