'use strict';

var _ = require('./underscore');
var CONFIG = require('../config.js');

module.exports = {
  /** @type {function(...[*])} */
  log: function() {
    if (CONFIG.DEBUG && !_.isUndefined(console) && console) {
      var args = ['SolveBio[' + CONFIG.VERSION + '] log:'].concat(_.toArray(arguments));
      try {
        console.log.apply(console, args);
      } catch(err) {
        _.forEach(arguments, function(arg) {
          console.log(arg);
        });
      }
    }
  },
  /** @type {function(...[*])} */
  error: function() {
    if (CONFIG.DEBUG && !_.isUndefined(console) && console) {
      var args = ['SolveBio[' + CONFIG.VERSION + '] error:'].concat(_.toArray(arguments));
      try {
        console.error.apply(console, args);
      } catch(err) {
        _.forEach(args, function(arg) {
          console.error(arg);
        });
      }
    }
  },
  /** @type {function(...[*])} */
  warn: function() {
    if (!_.isUndefined(console) && console) {
      var args = ['SolveBio[' + CONFIG.VERSION + '] warning:'].concat(_.toArray(arguments));
      try {
        console.warn.apply(console, args);
      } catch(err) {
        _.forEach(args, function(arg) {
          console.error(arg);
        });
      }
    }
  }
};