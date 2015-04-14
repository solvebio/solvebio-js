'use strict';

var console = require('../utils/console');

/**
 * SolveBio Resource Manager Object
 * @constructor
 */

var solveBioResourceManager = function(solveBio, path, id) {
  this._solveBio = solveBio;
  this._path = path;
  this._id = id;
};

/** @type {function(...[*])} */
solveBioResourceManager.prototype.retrieve = function() {
  if(this._id) {
    return this._solveBio._get(this._path + '/' + this._id, {});
  }
  else {
    console.error('You need to specify an id.');
  }
};

/** @type {function(...[*])} */
solveBioResourceManager.prototype.all = function() {
  var self = this;

  return this._solveBio._get(this._path, {})
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