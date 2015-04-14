'use strict';

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
solveBioResource.prototype._retrieve = function() {
  return this._solveBio._get(this._path, {});
};

module.exports = solveBioResource;