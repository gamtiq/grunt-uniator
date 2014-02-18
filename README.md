# grunt-uniator

Combine style-tags and CSS-files linked by HTML-file into one or several files or style-tags.

Grunt plugin for [uniator](https://github.com/gamtiq/uniator)

[![NPM version](https://badge.fury.io/js/grunt-uniator.png)](http://badge.fury.io/js/grunt-uniator)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-uniator --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-uniator');
```

## The "uniator" task

### Overview
The `uniator` task is multi task.

In your project's Gruntfile, add a section named `uniator` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    uniator: {
        options: {
            // Task-specific options go here.
        },
        your_target: {
            // Target-specific file lists and/or options go here.
        }
    }
});
```

### Options

The supported options are equal to settings that can be passed into `uniator.collectCssInFile()`
(see [uniator API](https://github.com/gamtiq/uniator#api) for details).

The most important options are mentioned below.

#### options.cssFile
Type: `String`  
Default value: `style`

Base of name of file into which collected styles will be saved.
Should not contain an extension.
Can contain path, for example `path/to/collected`.

#### options.destDir
Type: `String`  
Default value: directory of source HTML-file

Path to directory relative to which files should be created.

#### options.encoding
Type: `String`  
Default value: `utf8`

Encoding of source files.

#### options.include
Type: `Boolean`  
Default value: `false`

Whether collected styles should be included into contents of HTML-file.

#### options.minifyCss
Type: `Boolean` | `Object`  
Default value: `false`

Whether collected styles should be minified.

Object as option value can be used to specify options for minification
(see [How to use clean-css programmatically?](https://github.com/GoalSmashers/clean-css#how-to-use-clean-css-programmatically)).

#### options.removeSourceFile
Type: `Boolean`  
Default value: `false`

Whether collected source CSS-files should be removed.

### Usage Examples

#### Combine all styles from HTML-file into one file `style.css`

```js
grunt.initConfig({
    uniator: {
        combine: {
            src: ["path/to/source/index.html"]
        }
    }
});
```

#### Combine and minify all styles from HTML-file, save styles into `path/to/out/css/combined.css`, create new HTML-file `path/to/out/processed.html`, remove source CSS-files

```js
grunt.initConfig({
    uniator: {
        combine_minify: {
            options: {
                cssFile: "css/combined",
                destDir: "path/to/out",
                minifyCss: true,
                removeSourceFile: true
            },
            src: ["source.html"],
            dest: "path/to/out/processed.html"
        }
    }
});
```

#### Combine and minify all styles from HTML-file, include styles into source HTML-file

```js
grunt.initConfig({
    uniator: {
        combine_minify_include: {
            options: {
                include: true,
                minifyCss: true
            },
            src: ["index.html"]
        }
    }
});
```

## Related projects

If you need more advanced control over files combining, try one of the following plugins/tools:

* [processhtml](https://github.com/dciccale/grunt-processhtml) - Grunt plugin
* [usemin](https://github.com/yeoman/grunt-usemin) - Grunt plugin
* [useref](https://github.com/pajtai/grunt-useref) - Grunt plugin
* [HTML Builder](https://github.com/spatools/grunt-html-build) - Grunt plugin
* [Solidify](https://github.com/Stylish-Fantasy/solidify) - CLI tool

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.
Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Denis Sikuler  
Licensed under the MIT license.
