/*
* Promise Helper
* ===========================
* Provides a uniform Promise API using various Promise libs (if available).
*
* */
'use strict';

var console = require('./console');
//var newPromise, allPromises;
var Promise;
//var __slice = Array.prototype.slice;

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
    //newPromise = function(fn) {
    //  var deferred, reject, resolve;
    //  deferred = window.Q.defer();
    //  resolve = function(val) {
    //    return deferred.resolve(val);
    //  };
    //  reject = function(err) {
    //    return deferred.reject(err);
    //  };
    //  fn(resolve, reject);
    //  return deferred.promise;
    //};
    //allPromises = window.Q.all;
  }
  //else if(window.angular) {
  //  newPromise = null;
  //  allPromises = null;
  //  var injector = window.angular.injector(['ng']);
  //  injector.invoke(['$q', function($q) {
  //    newPromise = function(fn) {
  //      var deferred, reject, resolve;
  //      deferred = $q.defer();
  //      resolve = function(val) {
  //        return deferred.resolve(val);
  //      };
  //      reject = function(err) {
  //        return deferred.reject(err);
  //      };
  //      fn(resolve, reject);
  //      return deferred.promise;
  //    };
  //    allPromises = $q.all;
  //    return allPromises;
  //  }]);
  //}
  //else if(window.jQuery) {
  //  newPromise = function(fn) {
  //    var promise, reject, resolve;
  //    promise = window.jQuery.Deferred();
  //    resolve = function(val) {
  //      return promise.resolve(val);
  //    };
  //    reject = function(val) {
  //      return promise.reject(val);
  //    };
  //    fn(resolve, reject);
  //    return promise.promise();
  //  };
  //  allPromises = function(promises) {
  //    var _ref1;
  //    return (_ref1 = window.jQuery).when.apply(_ref1, promises).then(function() {
  //      var _promises;
  //      _promises = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  //      return _promises;
  //    });
  //  };
  //}
  else if(window.Promise) {
    Promise = window.Promise;
    //newPromise = function(fn) {
    //  return new window.Promise(function(resolve, reject) {
    //    if (resolve.fulfill) {
    //      return fn(resolve.resolve.bind(resolve), resolve.reject.bind(resolve));
    //    }
    //    else {
    //      return fn.apply(null, arguments);
    //    }
    //  });
    //};
    //allPromises = window.Promise.all;
  }
  else {
    // Otherwise, show a warning (library can still be used with just callbacks)
    console.warn('A Promise API was not found. Supported libraries that have Promises are jQuery, AngularJS, and es6-promise');
  }
}
else {
  // Running in NodeJS
  var req = require;
  Promise = this.Promise || req('es6-promise').Promise;
  //var Promise = this.Promise || req('es6-promise').Promise;
  //newPromise = Promise;
  //allPromises = Promise.all;
}

//var toPromise = function(orig) {
//  return function() {
//    var args, last;
//    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
//    last = args[args.length - 1];
//    if (typeof last === 'function') {
//      args.pop();
//      return orig.apply(null, [last].concat(__slice.call(args)));
//    }
//    else if (newPromise) {
//      return newPromise(function(resolve, reject) {
//        var cb;
//        cb = function(err, val) {
//          if (err) {
//            return reject(err);
//          }
//          return resolve(val);
//        };
//        return orig.apply(null, [cb].concat(__slice.call(args)));
//      });
//    }
//    else {
//      throw new Error('You must specify a callback or have a promise library loaded');
//    }
//  };
//};
//
//module.exports = {
//  newPromise: newPromise,
//  allPromises: allPromises,
//  toPromise: toPromise
//};

module.exports = Promise;