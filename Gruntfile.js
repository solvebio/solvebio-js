'use strict';

var minifyify = require('minifyify'),
  collapse = require('bundle-collapser/plugin');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-bump');

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
      standalone: {
        src: 'src/solvebio.js',
        dest: 'dist/solvebio.js',
        options: {
          browserifyOptions: {
            debug: false,
            fullPaths: false
          },
          ignore: ['bluebird'],
          plugin: [
            [collapse],
            ['minifyify', {
              map: false
            }]
          ]
        }
      },
      promises: {
        src: 'src/solvebio.js',
        dest: 'dist/solvebio-promises.js',
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
      target: ['src/**/*.js', 'tests/**/*.spec.js']
    },
    bump: {
      options: {
        files: ['package.json', 'src/config.js'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Released version: %VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
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
      if(grunt.option('standalone')) {
        tasks.push('browserify:standalone');
      }
      else if(grunt.option('promises')) {
        tasks.push('browserify:promises');
      }
      else {
        tasks = tasks.concat(['browserify:standalone', 'browserify:promises']);
      }
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask('bump-version', function(env) {
    var tasks = ['browserify:standalone', 'browserify:promises', 'bump:patch'];

    grunt.task.run(tasks);
  });
};