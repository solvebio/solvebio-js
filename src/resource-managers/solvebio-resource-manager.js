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
solveBioResourceManager.prototype.all = function() {
  var self = this;

  return this._solveBio._get(self._path, {})
    .then(function(data) {
      self._nextURL = data.links.next;
      self._prevURL = data.links.prev;
      return data;
    });
};

/** @type {function(...[*])} */
solveBioResourceManager.prototype.next = function() {
  if(this.hasNext()) {
    return this._solveBio._get(this._nextURL, {})
      .then(function(data) {
        self._nextURL = data.links.next;
        self._prevURL = data.links.prev;
        return data;
      });
  }
};

/** @type {function(...[*])} */
solveBioResourceManager.prototype.prev = function() {
  if(this.hasPrev()) {
    return this._solveBio._get(this._prevURL, {})
      .then(function(data) {
        self._nextURL = data.links.next;
        self._prevURL = data.links.prev;
        return data;
      });
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