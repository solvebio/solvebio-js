/**
 * Resource Manager module.
 * @module resource-managers/resource-manager
 */
'use strict';

var console = require('../utils/console');
var BaseManager = require('./base-manager');

/**
 * Resource Manager Object
 *
 * Class representing an API resource manager.
 *
 * @constructor
 * @augments BaseManager
 */

var ResourceManager = function(solveBio, path, id) {
  /** @private */
  this._id = id;

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  BaseManager.call(this, solveBio, path);
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