'use strict';

var _ = require('../utils/underscore');

/**
 * SolveBio Resource Object
 * @constructor
 */

/** @type {function(...[*])} */
var solveBioResource = function(solveBio, path) {
  this._solveBio = solveBio;
  this._path = path;
};

/** @type {function(...[*])} */
solveBioResource.prototype._retrieve = function(success, error) {
  var self = this;
  var _success = function(data) {
    _.assign(self, data);
    success(data);
  };

  return this._solveBio._get(this._path, {}, _success, error);
};

module.exports = solveBioResource;