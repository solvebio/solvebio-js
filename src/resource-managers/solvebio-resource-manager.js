'use strict';

//var Q = require('../utils/promise');

/**
 * SolveBio Resource Manager Object
 * @constructor
 */

var solveBioResourceManager = function(solveBio, path) {
  this._solveBio = solveBio;
  this._path = path;
};

/** @type {function(...[*])} */
solveBioResourceManager.prototype.all = function(success, error) {
  var self = this;
  return self._solveBio._get(self._path, {}, function(data) {
    self._nextURL = data.links.next;
    self._prevURL = data.links.prev;
    success(data);
  }, error);
};

/** @type {function(...[*])} */
solveBioResourceManager.prototype.next = function(success, error) {
  if(this.hasNext()) {
    return this._solveBio._get(this._nextURL, {}, function(data) {
      this._nextURL = data.links.next;
      this._prevURL = data.links.prev;
      success(data);
    }, error);
  }
};

/** @type {function(...[*])} */
solveBioResourceManager.prototype.prev = function(success, error) {
  if(this.hasPrev()) {
    return this._solveBio._get(this._prevURL, {}, function(data) {
      this._nextURL = data.links.next;
      this._prevURL = data.links.prev;
      success(data);
    }, error);
  }
};

/** @type {function(...[*])} */
solveBioResourceManager.prototype.hasNext = function () {
  return !!this._nextURL;
};

/** @type {function(...[*])} */
solveBioResourceManager.prototype.hasPrev = function () {
  return !!this._prevURL;
};

module.exports = solveBioResourceManager;