/*
 * Promise Helper
 * ===========================
 * Provides a uniform Promise API using various Promise libs (if available).
 *
 * */
'use strict';

var console = require('./console');
var _ = require('./underscore');
var Promise = require('bluebird');

if(_.keys(Promise).length === 0) {
  // Using the stand-alone library
  if(window) {
    // Determine the correct Promise factory.
    // Try to use libraries before native Promises since most Promise users
    // are already using a library.
    //
    // Try in the following order:
    // - Q Promise
    // - Angular Promise
    // - jQuery Promise
    // - native Promise or a polyfill (ex: es6-promise)
    if(window.Q) {
      Promise = window.Q.Promise;
    }
    else if(window.angular) {
      var injector = window.angular.injector(['ng']);
      injector.invoke(['$q', function($q) {
        Promise = function(fn) {
          var deferred, reject, resolve;
          deferred = $q.defer();
          resolve = function(val) {
            return deferred.resolve(val);
          };
          reject = function(err) {
            return deferred.reject(err);
          };
          fn(resolve, reject);
          return deferred.promise;
        };
      }]);
    }
    else if(window.jQuery) {
      Promise = function(fn) {
        var promise, reject, resolve;
        promise = window.jQuery.Deferred();
        resolve = function(val) {
          return promise.resolve(val);
        };
        reject = function(val) {
          return promise.reject(val);
        };
        fn(resolve, reject);
        return promise.promise();
      };
    }
    else if(window.Promise) {
      Promise = window.Promise;
    }
    else {
      // Otherwise, raise an error.
      console.error('A Promise API was not found. You need to either use solvebio-promises package or load a third-party library that includes Promises (jQuery, AngularJS, Q or BlueBird).');
    }
  }
  else {
    // Running in NodeJS
    if(this.Promise) {
      Promise = this.Promise;
    }
    else {
      // Otherwise, raise an error.
      console.error('A Promise API was not found. You need to either use solvebio-promises package or load a third-party library that includes Promises (es6-promise or BlueBird).');
    }
  }
}

module.exports = Promise;