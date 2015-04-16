'use strict';

var console = require('../utils/console');

/**
 * SolveBio Resource Manager Object
 *
 * Class representing an API resource manager.
 *
 * @constructor
 */

var solveBioResourceManager = function(solveBio, path, id) {
  /** @private */
  this._solveBio = solveBio;

  /** @private */
  this._path = path;

  /** @private */
  this._id = id;
};

/**
 * Retrieves a specific resource if a valid ID or full name is provided.
 *
 * @returns {Promise} API response.
 */
solveBioResourceManager.prototype.retrieve = function() {
  if(this._id) {
    return this._solveBio.get(this._path + '/' + this._id, {});
  }
  else {
    console.error('You need to specify an id.');
  }
};

/**
 * List all resources.
 *
 * @returns {Promise} API response.
 */
solveBioResourceManager.prototype.all = function() {
  return this._solveBio.get(this._path, {});
};

module.exports = solveBioResourceManager;