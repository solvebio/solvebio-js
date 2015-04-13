'use strict';

var minifyify = require('minifyify'),
  collapse = require('bundle-collapser/plugin');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-eslint');

  var taskConfig = {
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dev: {
        src: 'src/solvebio.js',
        dest: 'dev_dist/solvebio.js',
        options: {
          browserifyOptions: {
            debug: true
          },
          watch: true,
          keepAlive: true
        }
      },
      prod: {
        src: 'src/solvebio.js',
        dest: 'dist/solvebio.js',
        options: {
          browserifyOptions: {
            debug: false,
            fullPaths: false
          },
          plugin: [
            [collapse],
            ['minifyify', {
              map: false
            }]
          ]
        }
      }
    },

    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      target: ['src/**/*.js']
    }
  };

  grunt.initConfig(grunt.util._.extend(taskConfig));

  grunt.registerTask('build', function(env) {
    var tasks = [];

    if(env === 'dev') {
      tasks.push('browserify:dev');
    }
    else {
      tasks.push('eslint');
      tasks.push('browserify:prod');
    }

    grunt.task.run(tasks);
  });
};