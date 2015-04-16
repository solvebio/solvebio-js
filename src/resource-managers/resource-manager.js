/**
 * Resource Manager module.
 * @module resource-managers/resource-manager
 */
'use strict';

var console = require('../utils/console');

/**
 * Resource Manager Object
 *
 * Class representing an API resource manager.
 *
 * @constructor
 */

var ResourceManager = function(solveBio, path, id) {
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
ResourceManager.prototype.retrieve = function() {
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
ResourceManager.prototype.all = function() {
  return this._solveBio.get(this._path, {});
};

module.exports = ResourceManager;